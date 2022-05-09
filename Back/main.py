# text preprocessing modules
from cProfile import label
from string import punctuation
from tokenize import String

import json
from DataModel import DataModel, DListar
from pandas import json_normalize
from fastapi.encoders import jsonable_encoder

# text preprocessing modules
from nltk.tokenize import word_tokenize

import nltk
nltk.download('omw-1.4')

from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import re  # regular expression

import os
from os.path import dirname, join, realpath
import joblib
import uvicorn
from fastapi import FastAPI

app = FastAPI(
    title="Elegible Cancer Model API",
    description="Aplicacion simple que predice si un paciente es elegible o no para ensayos clínicos de cáncer a partir de texto descriptivo",
    version="0.1",
)

# load the model
with open(
    join(dirname(realpath(__file__)), "models/model_pipeline.joblib"), "rb"
) as f:
    model = joblib.load(f)


# cleaning the data
def text_cleaning(text, remove_stop_words=True, lemmatize_words=True):

    # Clean the text
    text = re.sub(r"[^A-Za-z0-9]", " ", str(text))
    text = re.sub(r"\'s", " ", str(text))
    text = re.sub(r"http\S+", " link ", str(text))
    text = re.sub(r"\b\d+(?:\.\d+)?\s+", "", str(text))  # remove numbers

    # Remove punctuation from text
    text = "".join([c for c in text if c not in punctuation])

    # Optionally, remove stop words
    if remove_stop_words:

        # load stopwords
        stop_words = stopwords.words("english")
        text = text.split()
        text = [w for w in text if not w in stop_words]
        text = " ".join(text)

    # Optionally, shorten words to their stems
    if lemmatize_words:
        text = text.split()
        lemmatizer = WordNetLemmatizer()
        lemmatized_words = [lemmatizer.lemmatize(word) for word in text]
        text = " ".join(lemmatized_words)

    # Return a list of words
    return text

@app.get("/")
def read_root():
    return{
        "Proyecto 1 Inteligencia de negocios": "Parte 2",
        "Integrante 1": "Juan David Becerra - 201911588",
        "Integrante 2": "Nicolas Chalee Guerrero - 2019",    
        "Integrante 3": "Juan Andrés Santiago - 201821950"   
    }

@app.get("/predict-elegibilit")
def predict_label(study: str):
    """
    A simple function that receive a review content and predict the sentiment of the content.
    :param review:
    :return: prediction, probabilities
    """
    # clean the review
    cleaned_review = text_cleaning(study)

    # perform prediction
    prediction = model.predict([cleaned_review])
    output = str(prediction[0])
    # probas = model.predict_proba([cleaned_review])
    # output_probability = "{:.2f}".format(int(probas[:, output]))

    # output dictionary
    labels = {"__label__0": "Elegible", "__label__1": "No elegible"}

    # show results
    result = {"prediction": labels[output]} #"Probability": output_probability}

    return result

@app.post("/predict-elegibility")
def postKNN(data: DListar):
    dict = jsonable_encoder(data)
    df = json_normalize(dict['texto'])
    cleaned_review = text_cleaning(df) 
    df.columns = DataModel.columns()
    result = model.predict([cleaned_review])
    output = str(result[0])
    labels = {"__label__0": "Elegible", "__label__1": "No elegible"}
    resultado = {"prediction": labels[output]} 
    return resultado


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000, debug=True)
