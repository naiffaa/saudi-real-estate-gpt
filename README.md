# Saudi Real Estate GPT From Scratch

## Project Overview

This project implements a **decoder-only GPT-style language model built from scratch using PyTorch** for Arabic real-estate text.

The model is trained on Saudi real-estate listings and then fine-tuned to perform a **property information extraction task**.

The project demonstrates the **complete lifecycle of building a small domain-specific language model**, including:

1. Data preparation  
2. Tokenization  
3. Transformer implementation  
4. Pretraining  
5. Supervised fine-tuning  
6. Evaluation  
7. Local deployment  

---

# Project Goal

The objective of this project is to build a **small Arabic GPT-style language model** capable of:

- Learning the language and structure of Saudi real-estate listings
- Generating listing-style Arabic text after pretraining
- Following structured instructions after fine-tuning
- Extracting important property information from Arabic descriptions

---

# Dataset

The dataset used in this project is:

**Aqar.fm Saudi Real Estate Listings**

Loaded using Hugging Face:

```python
from datasets import load_dataset

ds = load_dataset("afaskar/Aqar.fm-Saudi-Real-Estate-Listings", "default")
```

## Dataset Characteristics

The dataset contains structured real-estate listings including fields such as:

- property type  
- city  
- district  
- price  
- area  
- number of bedrooms  
- number of bathrooms  
- property description  

### Example fields

- `category_name`
- `city`
- `district`
- `price`
- `area_sqm`
- `num_bedrooms`
- `num_bathrooms`
- `description`

---

# Phase 1: Pretraining

## Objective

Teach the model the **structure and style of Arabic real-estate text** using a **next-token prediction task**.

## Pretraining Data

Structured listing rows were converted into Arabic sentences and stored in:

```
data/pretrain/data.txt
```

### Example Pretraining Text

```
دور للبيع في حي النرجس بمدينة الرياض. السعر 1500000 ريال. المساحه 116 متر مربع. عدد غرف النوم 4. عدد دورات المياه 3.
```

---

# Phase 2: Supervised Fine-Tuning (SFT)

## Objective

Train the model to **follow instructions and generate structured responses**.

### Instruction

```
استخرج معلومات العقار
```

### Input Example

```
شقه للبيع في حي الياسمين بمدينه الرياض. السعر 850000 ريال. المساحه 140 متر مربع. عدد غرف النوم 3. عدد دورات المياه 2.
```

### Expected Output

```
نوع العقار: شقه للبيع
المدينه: الرياض
الحي: حي الياسمين
السعر: 850000 ريال
المساحه: 140 متر مربع
غرف النوم: 3
دورات المياه: 2
```

---

# Tokenization

A **custom word-level tokenizer** was implemented from scratch.

## Tokenizer Features

- whitespace tokenization  
- custom vocabulary creation  
- `<pad>` token support  
- `<unk>` token support  
- Arabic normalization before vocabulary training  

---

# Arabic Text Normalization

To improve vocabulary consistency, Arabic text was normalized by:

- Normalizing Alef forms (`أ`, `إ`, `آ` → `ا`)
- Converting (`ى` → `ي`)
- Converting (`ة` → `ه`)
- Removing diacritics
- Removing tatweel (ـ)
- Reducing repeated spaces

This preprocessing step significantly reduced the number of **unknown tokens**.

---

# Model Architecture

The model is a **decoder-only Transformer language model** implemented entirely from scratch in **PyTorch**.

## Implemented Components

- Token embeddings  
- Positional embeddings  
- Masked self-attention  
- Multi-head attention  
- Feed-forward network  
- Residual connections  
- Layer normalization  
- Linear language modeling head  

---

## Final Model Configuration

```python
block_size = 32
embed_dim = 192
num_heads = 4
num_layers = 3
```

### Parameter Count

Approximately:

```
9.84M parameters
```

---

# Training

## Pretraining

The model was pretrained on Arabic real-estate text using **next-token prediction**.

### Observations

Training loss decreased significantly during pretraining:

| Stage | Train Loss |
|------|-----------|
| Initial | ~10 |
| Later | ~2.6 |

Validation loss also decreased but remained higher than training loss.

---

## Fine-Tuning

The model was fine-tuned using **instruction-response pairs**.

### Masked Loss

Prompt tokens were ignored using:

```python
ignore_index = -100
```

This ensures that the model learns **only the response generation**.

### SFT Loss Trend

| Stage | Loss |
|------|------|
| Initial | ~5.7 |
| Later | <1.0 |

---

# Results

## What Worked Well

After fine-tuning, the model learned:

- Arabic prompt structure  
- Structured output formatting  
- Real-estate schema fields  
- Domain-specific vocabulary  

### Example Output Structure

```
نوع العقار:
المدينه:
الحي:
السعر:
المساحه:
غرف النوم:
دورات المياه:
```

---

# Limitations

Due to the **small model size and limited dataset**, several limitations were observed:

### Value Memorization
The model sometimes predicts common prices or districts instead of copying the exact input values.

### Repetition
Some generations repeat the last field.

### Unknown Token Issues
Earlier tokenizer versions produced `<unk>` tokens for instruction words.

### Task Confusion
When multiple tasks were mixed during training, the model sometimes blended output styles.

---

# Failure Analysis

Main observed failure modes:

1. Value memorization  
2. Field repetition  
3. Incorrect copying of values  
4. Bias toward frequent patterns in the dataset  

These behaviors are common in **small decoder-only models trained from scratch**.

---

# Evaluation

## Qualitative Evaluation

Evaluation was conducted using:

- Sample generations after pretraining  
- Structured outputs after fine-tuning  
- Manual comparison between expected and generated responses  
- Error analysis of incorrect fields  

---

## Suggested Quantitative Extension

Perplexity can be computed using validation loss:

```python
import math

perplexity = math.exp(val_loss)
```

---

# Local Demo

A **Streamlit web interface** was built to interact with the model locally.

## Demo Capabilities

- User inputs property description
- Model generates structured property information
- Testing through a local browser

---

# Run the Demo

```bash
python -m streamlit run app.py
```

---

# Project Structure

```
project/
│
├── data/
│   ├── pretrain/
│   │   └── data.txt
│   │
│   └── finetune/
│       └── real_estate_sft.json
│
├── notebooks/
│   └── training_and_finetuning.ipynb
│
├── app.py
├── README.md
├── tinygpt_real_estate.pt
├── tokenizer_vocab.json
└── requirements.txt
```

---

# How to Run

## 1 Install Dependencies

```bash
pip install torch datasets pandas streamlit
```

## 2 Run Training Notebook

Run the notebook to:

- prepare the dataset  
- train tokenizer  
- pretrain the model  
- fine-tune the model  

## 3 Run the Demo

```bash
python -m streamlit run app.py
```

---

# Conclusion

This project demonstrates how to **build a small Arabic GPT-style language model from scratch using PyTorch**.

The model learned:

- the structure of Arabic real-estate listings  
- next-token prediction with Transformers  
- instruction-following structured output generation  

The project also highlights **limitations of small LLMs**, particularly in tasks requiring **exact copying of values**.

---

# Future Work

Possible improvements include:

- using **BPE or SentencePiece tokenization**
- training on a **larger dataset**
- increasing **context length**
- adding **perplexity and exact-match metrics**
- training **task-specific models**
- combining **LLM generation with retrieval from the original dataset**
