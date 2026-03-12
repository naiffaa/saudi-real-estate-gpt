import json
import torch
import torch.nn as nn
import torch.nn.functional as F
import streamlit as st

class SimpleTokenizer:
    def __init__(self):
        self.word_to_id = {}
        self.id_to_word = {}

    def load(self, path):
        with open(path, "r", encoding="utf-8") as f:
            self.word_to_id = json.load(f)
        self.id_to_word = {i: w for w, i in self.word_to_id.items()}

    def encode(self, text):
        tokens = text.split()
        unk_id = self.word_to_id.get("<unk>", 1)
        return [self.word_to_id.get(token, unk_id) for token in tokens]

    def decode(self, ids):
        return " ".join([self.id_to_word.get(i, "<unk>") for i in ids])


class SelfAttentionHead(nn.Module):
    def __init__(self, embed_dim, head_dim, block_size):
        super().__init__()
        self.key = nn.Linear(embed_dim, head_dim, bias=False)
        self.query = nn.Linear(embed_dim, head_dim, bias=False)
        self.value = nn.Linear(embed_dim, head_dim, bias=False)
        self.register_buffer("tril", torch.tril(torch.ones(block_size, block_size)))

    def forward(self, x):
        B, T, C = x.shape
        k = self.key(x)
        q = self.query(x)

        wei = q @ k.transpose(-2, -1) / (k.size(-1) ** 0.5)
        wei = wei.masked_fill(self.tril[:T, :T] == 0, float("-inf"))
        wei = F.softmax(wei, dim=-1)

        v = self.value(x)
        out = wei @ v
        return out


class MultiHeadAttention(nn.Module):
    def __init__(self, num_heads, embed_dim, block_size):
        super().__init__()
        head_dim = embed_dim // num_heads
        self.heads = nn.ModuleList(
            [SelfAttentionHead(embed_dim, head_dim, block_size) for _ in range(num_heads)]
        )
        self.proj = nn.Linear(embed_dim, embed_dim)

    def forward(self, x):
        out = torch.cat([h(x) for h in self.heads], dim=-1)
        return self.proj(out)


class FeedForward(nn.Module):
    def __init__(self, embed_dim):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(embed_dim, 4 * embed_dim),
            nn.ReLU(),
            nn.Linear(4 * embed_dim, embed_dim),
        )

    def forward(self, x):
        return self.net(x)


class TransformerBlock(nn.Module):
    def __init__(self, embed_dim, num_heads, block_size):
        super().__init__()
        self.sa = MultiHeadAttention(num_heads, embed_dim, block_size)
        self.ffwd = FeedForward(embed_dim)
        self.ln1 = nn.LayerNorm(embed_dim)
        self.ln2 = nn.LayerNorm(embed_dim)

    def forward(self, x):
        x = x + self.sa(self.ln1(x))
        x = x + self.ffwd(self.ln2(x))
        return x


class TinyGPT(nn.Module):
    def __init__(self, vocab_size, block_size=32, embed_dim=192, num_heads=4, num_layers=3):
        super().__init__()
        self.block_size = block_size
        self.token_embedding = nn.Embedding(vocab_size, embed_dim)
        self.position_embedding = nn.Embedding(block_size, embed_dim)
        self.blocks = nn.Sequential(
            *[TransformerBlock(embed_dim, num_heads, block_size) for _ in range(num_layers)]
        )
        self.ln_f = nn.LayerNorm(embed_dim)
        self.lm_head = nn.Linear(embed_dim, vocab_size)

    def forward(self, idx, targets=None):
        B, T = idx.shape
        tok_emb = self.token_embedding(idx)
        pos_emb = self.position_embedding(torch.arange(T, device=idx.device))
        x = tok_emb + pos_emb
        x = self.blocks(x)
        x = self.ln_f(x)
        logits = self.lm_head(x)

        loss = None
        if targets is not None:
            B, T, C = logits.shape
            logits = logits.view(B * T, C)
            targets = targets.view(B * T)
            loss = F.cross_entropy(logits, targets, ignore_index=-100)

        return logits, loss


@st.cache_resource
def load_model_and_tokenizer():
    tokenizer = SimpleTokenizer()
    tokenizer.load("tokenizer_vocab.json")

    vocab_size = len(tokenizer.word_to_id)

    model = TinyGPT(
        vocab_size=vocab_size,
        block_size=32,
        embed_dim=192,
        num_heads=4,
        num_layers=3,
    )

    model.load_state_dict(torch.load("tinygpt_real_estate.pt", map_location="cpu"))
    model.eval()

    return model, tokenizer


def generate_sft(model, tokenizer, start_text, max_new_tokens=12):
    ids = tokenizer.encode(start_text)
    if len(ids) == 0:
        return "لا توجد كلمات معروفة في الإدخال."

    x = torch.tensor([ids], dtype=torch.long)

    for _ in range(max_new_tokens):
        x_cond = x[:, -32:]
        logits, _ = model(x_cond)
        logits = logits[:, -1, :]
        next_id = torch.argmax(logits, dim=-1, keepdim=True)
        x = torch.cat([x, next_id], dim=1)

    full_text = tokenizer.decode(x[0].tolist())
    prompt_text = tokenizer.decode(ids)

    if full_text.startswith(prompt_text):
        result = full_text[len(prompt_text):].strip()
    else:
        result = full_text.strip()

    return result

def format_output_for_display(text):
    if not text:
        return "لم ينتج النموذج استجابة واضحة."

    labels = [
        "نوع العقار:",
        "المدينه:",
        "الحي:",
        "السعر:",
        "المساحه:",
        "غرف النوم:",
        "دورات المياه:"
    ]

    for label in labels:
        text = text.replace(label, f"\n{label}")

    text = text.replace("  ", " ").strip()

    # remove extra empty lines
    lines = [line.strip() for line in text.split("\n") if line.strip()]
    return "\n".join(lines)


st.set_page_config(page_title="Saudi Real Estate GPT", layout="centered")

st.title("Saudi Real Estate GPT")
st.caption("نموذج عربي صغير مدرب من الصفر على بيانات عقارية سعودية")

st.markdown(
    """
هذا العرض يوضح نموذج **Decoder-Only Transformer** تم تدريبه على نصوص عقارية عربية، 
ثم تم **Fine-tuning** له على مهمة استخراج معلومات العقار بصيغة منظمة.
"""
)

with st.expander("ماذا يفعل هذا النموذج؟", expanded=False):
    st.write(
        """
- يستقبل وصفًا مختصرًا لعقار
- يحاول استخراج معلوماته بصيغة منظمة
- النموذج تجريبي، لذلك قد يخطئ في بعض القيم
"""
    )

# Example inputs
examples = {
    "مثال 1 — شقة في الرياض": """نوع العقار شقه للبيع
المدينه الرياض
الحي حي الياسمين
السعر 850000 ريال
المساحه 140 متر مربع
غرف النوم 3
دورات المياه 2""",
    "مثال 2 — فيلا في الرياض": """نوع العقار فيلا للبيع
المدينه الرياض
الحي حي الرمال
السعر 2200000 ريال
المساحه 300 متر مربع
غرف النوم 5
دورات المياه 4""",
    "مثال 3 — دور في الرياض": """نوع العقار دور للبيع
المدينه الرياض
الحي حي النرجس
السعر 1500000 ريال
المساحه 116 متر مربع
غرف النوم 4
دورات المياه 3""",
    "مثال 4 — شقة في أبها": """نوع العقار شقه للبيع
المدينه ابها
الحي حي دره المنسك
السعر 635000 ريال
المساحه 215 متر مربع
غرف النوم 6
دورات المياه 2""",
}

selected_example = st.selectbox("اختر مثالًا جاهزًا", list(examples.keys()))

if "user_input" not in st.session_state:
    st.session_state.user_input = examples[selected_example]

col1, col2 = st.columns([1, 1])

with col1:
    if st.button("تحميل المثال المختار"):
        st.session_state.user_input = examples[selected_example]

with col2:
    if st.button("مسح النص"):
        st.session_state.user_input = ""

user_input = st.text_area(
    "ادخل معلومات العقار",
    key="user_input",
    height=220
)

model, tokenizer = load_model_and_tokenizer()

if st.button("تحليل العقار"):
    prompt = f"""التعليمات
استخرج معلومات العقار

المدخل
{user_input}

الاستجابه
"""

    result = generate_sft(model, tokenizer, prompt, max_new_tokens=12)
    formatted_result = format_output_for_display(result)

    st.subheader("مخرجات النموذج")
    st.text(formatted_result)
    
st.markdown("---")
st.markdown(
    """
**ملاحظة:**  
هذا النموذج صغير ومدرب من الصفر، لذلك قد ينجح في تعلّم **شكل الإجابة** 
لكنه قد يخطئ في **نسخ القيم الدقيقة** مثل السعر أو الحي.
"""
)