# text preprocessing modules
from cProfile import label
from string import punctuation
from tokenize import String

import json
import unicodedata
from DataModel import DataModel, DListar
from pandas import json_normalize
from fastapi.encoders import jsonable_encoder

# text preprocessing modules
from nltk.tokenize import word_tokenize

import nltk
nltk.download('omw-1.4')

from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer,LancasterStemmer
import re  # regular expression

import os
from os.path import dirname, join, realpath
import joblib
import uvicorn
import inflect
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

app = FastAPI(
    title="Elegible Cancer Model API",
    description="Aplicacion simple que predice si un paciente es elegible o no para ensayos clínicos de cáncer a partir de texto descriptivo",
    version="0.1",
)

origins = ["http://localhost:3000"]


# Manejo de las cors para habilitar los endpoints
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# load the model
with open(
    join(dirname(realpath(__file__)), "models/model_pipeline.joblib"), "rb"
) as f:
    model = joblib.load(f)



    def remove_non_ascii(words):
        new_words = []
        for word in words:
            new_word = unicodedata.normalize('NFKD', word).encode('ascii', 'ignore').decode('utf-8', 'ignore')
            new_words.append(new_word)
        return new_words
    
    def to_lowercase(words):
        new_words = []
        for word in words:
            new_word = word.lower()
            new_words.append(new_word)
        return new_words
    
    def remove_punctuation(words):
        new_words = []
        for word in words:
            new_word = re.sub(r'[^\w\s]', '', word)
            if new_word != '':
                new_words.append(new_word)
        return new_words
        
    def replace_numbers(words):
        p = inflect.engine()
        new_words = []
        for word in words:
            if word.isdigit():
                new_word = p.number_to_words(word)
                new_words.append(new_word)
            else:
                new_words.append(word)
        return new_words
    
    def remove_stopwords(words):
        new_words = []
        for word in words:
            if word not in stopwords.words('english'):
                new_words.append(word)
        return new_words
        
    def preprocessing(words):
        words = to_lowercase(words)
        words = replace_numbers(words)
        words = remove_punctuation(words)
        words = remove_non_ascii(words)
        words = remove_stopwords(words)
        return words

    def stem_words(words):
        stemmer = LancasterStemmer()
        stems = []
        for word in words:
            stem = stemmer.stem(word)
            stems.append(stem)
        return stems
            
    def lemmatize_verbs(words):
        lemmatizer = WordNetLemmatizer()
        lemmas = []
        for word in words:
            lemma = lemmatizer.lemmatize(word, pos='v')
            lemmas.append(lemma)
        return lemmas
        
    def stem_and_lemmatize(words):
        stems = stem_words(words)
        lemmas = lemmatize_verbs(words)
        return stems + lemmas

@app.get("/")
def read_root():
    return{
        "Proyecto 1 Inteligencia de negocios": "Parte 2",
        "Integrante 1": "Juan David Becerra - 201911588",
        "Integrante 2": "Nicolas Chalee Guerrero - 2019",    
        "Integrante 3": "Juan Andrés Santiago - 201821950"   
    }


@app.post("/predict-elegibility")
def postKNN(data: DListar):
    dict = jsonable_encoder(data)
    df = json_normalize(dict['texto'])
    cleaned_review = preprocessing(df)
    cleaned_review = stem_and_lemmatize(df) 
    df.columns = DataModel.columns()
    result = model.predict(cleaned_review)
    output = str(result[0])
    labels = {"__label__0": "Elegible", "__label__1": "No elegible"}
    resultado = {"prediction": labels[output]} 
    return resultado

