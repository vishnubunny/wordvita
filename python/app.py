from cgi import test
from flask import Flask, render_template, request, jsonify

import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from gensim.models import KeyedVectors
from flask_cors import CORS
from datetime import datetime

word = KeyedVectors.load_word2vec_format('./python/GoogleNews-vectors-negative300.bin', binary=True, limit = 100000)
# arrays


app = Flask(__name__)

CORS(app)
clues=[["round","kids","stick","eat","lick"],["circle","food","triangle","toppings","bake"],["hair","tone","touch","sweat","organ"]]
answers=[["lollipop","lollipops"],["pizza","pizzas"],["skin"]]
# @app.route('/')
# def main():
#     return render_template('index.html')



# date of deployment
# d1 = datetime.strptime('2022/9/22', "%Y/%m/%d")
# d2 = datetime.strptime('2022/9/20', "%Y/%m/%d")

# difference between dates in timedelta
# days = datetime.now() - d1 
# print(datetime.datetime.now()) 
# print(datetime.today)
# days = d2 - d1  
print(datetime.now())
# print(days.days)

@app.route('/index1', methods=['GET'])
def index1():
    d1 = datetime.strptime('2022/9/22', "%Y/%m/%d")
    days = datetime.now() - d1 
    print(datetime.now(), days)
    try:
        today_clues = clues[days.days]
        today_answers = answers[days.days]
        return {"clues":today_clues, "answers":today_answers}
    except:
        return "err"

@app.route('/index', methods=['POST'])
def index():
    try:
        received = request.json
        data1 = received['user_input']
        data2 = received['ans']
        
        x=word[data1]
        z=word[data2]
        pred = cosine_similarity([x],[z])
        arr = np.array(pred)
        k = str(int(round(arr[0,0],2)*100))
        return k
    except KeyError as e:
        return "err"
    

if __name__ == "__main__":
    app.run(debug=True)
