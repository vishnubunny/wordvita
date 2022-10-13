# from cgi import test
# from flask import Flask, render_template, request, jsonify, send_from_directory

# import numpy as np
# from sklearn.metrics.pairwise import cosine_similarity
# from gensim.models import KeyedVectors
# from flask_cors import CORS
# from datetime import datetime

# word = KeyedVectors.load_word2vec_format('./python/GoogleNews-vectors-negative300.bin', binary=True, limit = 100000)
# # arrays


# app = Flask(__name__, static_url_path='', static_folder='../build')

# CORS(app)
# clues=[["round","kids","stick","eat","lick"],["circle","food","triangle","toppings","bake"],["hair","tone","touch","sweat","organ"]]
# answers=[["lollipop","lollipops"],["pizza","pizzas"],["skin"]]
# @app.route("/", defaults={'path':''})
# def serve(path):
#     print(app.static_folder)
#     return send_from_directory(app.static_folder,'index.html')


# @app.route('/index1', methods=['GET'])
# def index1():
#     d1 = datetime.strptime('2022/10/08', "%Y/%m/%d")
#     days = datetime.now() - d1 
#     print(datetime.now(), days)
#     try:
#         today_clues = clues[days.days]
#         today_answers = answers[days.days]
#         return {"clues":today_clues, "answers":today_answers}
#     except:
#         return "err"

# @app.route('/index', methods=['POST'])
# def index():
#     try:
#         received = request.json
#         data1 = received['user_input']
#         data2 = received['ans']
        
#         x=word[data1]
#         z=word[data2]
#         pred = cosine_similarity([x],[z])
#         arr = np.array(pred)
#         k = str(int(round(arr[0,0],2)*100))
#         return k
#     except KeyError as e:
#         return "err"
    

# if __name__ == "__main__":
#     app.run(debug=True)







# # ------------Testing---------------#

from cgi import test
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS, cross_origin
import pickle
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from gensim.models import KeyedVectors
from datetime import datetime

word = KeyedVectors.load_word2vec_format('./python/GoogleNews-vectors-negative300.bin', binary=True, limit = 100000)
# arrays





clues=[["round","kids","stick","eat","lick"],["circle","food","triangle","toppings","bake"],["hair","tone","touch","sweat","organ"]]
answers=[["lollipop","lollipops"],["pizza","pizzas"],["skin"]]

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/')
@cross_origin()
def main():
    return render_template('App.js')

@app.route('/index1', methods=['GET'])
def index1():
    now = datetime.now()
    local_now = now.astimezone()
    local_tz = local_now.date()

    d1 = datetime.strptime("2022/10/11", "%Y/%m/%d")
    days = local_tz - d1.date()
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