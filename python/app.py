from cgi import test
from flask import Flask, render_template, request, jsonify
import pickle
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
d1 = datetime.strptime('2022/9/19', "%Y/%m/%d")

# difference between dates in timedelta
days = datetime.today() - d1

@app.route('/index', methods=['GET'])
def index():
    try:
        today_clues = clues[days]
        today_answers = answers[days]
        return today_clues, today_answers
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
