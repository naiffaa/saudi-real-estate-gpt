# Saudi Real Estate GPT From Scratch

## Project Overview
This project implements a **decoder-only GPT-style language model from scratch using PyTorch** for Arabic real-estate text.  
The model is trained on Saudi real-estate listing data and then fine-tuned to follow a property-information extraction task.

The final goal of the project is to demonstrate the full lifecycle of an LLM system:

1. **Data preparation**
2. **Tokenization**
3. **Transformer implementation**
4. **Pretraining**
5. **Supervised fine-tuning**
6. **Evaluation**
7. **Local deployment**

---

## Project Goal
The goal of this project is to build a small Arabic GPT-style model that can:

- learn the language of Saudi real-estate listings
- generate listing-style Arabic text after pretraining
- follow structured instructions after fine-tuning
- extract important property information in Arabic

---

## Dataset
The dataset used in this project is:

**Aqar.fm Saudi Real Estate Listings**  
Loaded using Hugging Face datasets:

```python
from datasets import load_dataset
ds = load_dataset("afaskar/Aqar.fm-Saudi-Real-Estate-Listings", "default")

Dataset Characteristics

The dataset contains structured real-estate listings with fields such as:

property type

city

district

price

area

bedrooms

bathrooms

description

Example fields

category_name

city

district

price

area_sqm

num_bedrooms

num_bathrooms

description

Phase 1: Pretraining
Objective

Teach the model the structure and style of Arabic real-estate text using next-token prediction.

Pretraining Data

The pretraining data was built by converting structured listing rows into Arabic text and saving them into:

data/pretrain/data.txt
Example pretraining text
دور للبيع في حي النرجس بمدينة الرياض. السعر 1500000 ريال. المساحه 116 متر مربع. عدد غرف النوم 4. عدد دورات المياه 3.
Phase 2: Supervised Fine-Tuning (SFT)
Objective

Teach the model to follow an instruction and produce a structured response.

Fine-Tuning Task

The final fine-tuning task used in the project is:

Instruction:
استخرج معلومات العقار

Input Example
شقه للبيع في حي الياسمين بمدينه الرياض. السعر 850000 ريال. المساحه 140 متر مربع. عدد غرف النوم 3. عدد دورات المياه 2.
Output Example
نوع العقار: شقه للبيع
المدينه: الرياض
الحي: حي الياسمين
السعر: 850000 ريال
المساحه: 140 متر مربع
غرف النوم: 3
دورات المياه: 2
Tokenization

A custom word-level tokenizer was implemented from scratch.

Tokenizer features

whitespace tokenization

custom vocabulary creation

<pad> and <unk> support

Arabic normalization before training

Arabic normalization

The project normalizes Arabic text by:

normalizing Alef forms (أ, إ, آ → ا)

normalizing ى → ي

normalizing ة → ه

removing diacritics

removing tatweel

reducing repeated spaces

This improved vocabulary consistency and reduced unknown tokens.

Model Architecture

The model is a decoder-only Transformer implemented from scratch in PyTorch.

Implemented components

token embeddings

positional embeddings

masked self-attention

multi-head attention

feed-forward network

residual connections

layer normalization

linear language modeling head

Final model configuration

block_size = 32

embed_dim = 192

num_heads = 4

num_layers = 3

Parameter count

Approximately:

9.84M parameters
Training
Pretraining

The model was first pretrained on Arabic real-estate text using next-token prediction.

Pretraining observations

Training and validation loss decreased significantly, showing that the model learned the style and structure of the domain text.

Example pretraining loss trend:

initial train loss ≈ 10

later train loss ≈ 2.6

validation loss decreased but remained higher than train loss

This indicates that the model learned the domain distribution, while also showing some generalization gap.

Fine-Tuning

The model was then fine-tuned on instruction-response pairs using masked loss.

Fine-tuning setup

The loss function ignored prompt tokens and only optimized on response tokens using:

ignore_index = -100

This helped the model focus on learning the answer format.

Fine-tuning observations

Fine-tuning loss improved strongly, which indicates that the model successfully learned the output schema and instruction-following format.

Example SFT loss trend:

initial SFT train loss ≈ 5.7

later SFT train loss < 1.0

validation loss also improved

Results
What worked well

The fine-tuned model learned:

Arabic prompt format

structured output format

real-estate schema fields

domain-specific vocabulary

Example model behavior

The model usually predicts the correct structure:

نوع العقار:
المدينه:
الحي:
السعر:
المساحه:
غرف النوم:
دورات المياه:
Limitations

Although the model learned the schema, it often failed to copy exact input values faithfully.
For example, it sometimes generated:

a wrong district

a common price from training

repeated values

memorized patterns from frequent listings

This is a known limitation of small decoder-only models trained from scratch on limited data.

Failure Analysis

Main failure modes observed:

Value memorization
The model sometimes predicts common prices or districts instead of copying the exact input.

Repetition
The model sometimes repeats the last field, especially with longer generation.

Unknown token issues
Earlier versions of the tokenizer produced <unk> for instruction words not included in tokenizer training.

Task confusion
When multiple fine-tuning tasks were mixed, the model sometimes blended output styles.

Evaluation
Qualitative Evaluation

The model was evaluated using:

sample generations after pretraining

sample structured outputs after fine-tuning

manual comparison between expected and generated responses

error analysis of repeated fields and wrong copied values

Suggested quantitative extension

To strengthen evaluation further, perplexity can be calculated from validation loss:

import math
perplexity = math.exp(val_loss)
Local Demo

A local Streamlit interface was created for testing the model.

Demo capabilities

user enters property text

model generates a structured response

local testing in browser

Run locally
python -m streamlit run app.py
Project Structure
project/
│
├── data/
│   ├── pretrain/
│   │   └── data.txt
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
How to Run
1. Install dependencies
pip install torch datasets pandas streamlit
2. Run notebook

Run the notebook step by step to:

prepare the data

train tokenizer

pretrain the model

fine-tune the model

3. Run the app
python -m streamlit run app.py
Conclusion

This project successfully demonstrates how to build a small Arabic GPT-style model from scratch using PyTorch.

The model learned:

Arabic real-estate language structure

Transformer-based next-token prediction

instruction-following output formatting

The project also highlights the practical limitations of small LLMs trained from scratch, especially in tasks requiring exact value copying.

Future Work

Possible improvements:

use a subword tokenizer such as BPE

train on a larger dataset

increase context length

add better evaluation metrics such as perplexity and exact-match scoring

fine-tune separate models for summarization and extraction

combine LLM generation with retrieval/filtering from the original dataframe for better accuracy