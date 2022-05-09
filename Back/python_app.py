import requests as r

# add review
review = "study interventions are Saracatinib . recurrent verrucous carcinoma of the larynx diagnosis and patients must agree to use adequate birth control for the duration of study participation and for at least eight weeks after discontinuation of study drug"


keys = {"review": review}

prediction = r.get("http://127.0.0.1:8000/predict-elegibility/", params=keys)

results = prediction.json()
print(results["prediction"])
# print(results["Probability"])
