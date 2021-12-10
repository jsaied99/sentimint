from flask import Flask, jsonify, escape, g,request
from flask_cors import CORS
import db_conn
from time import time
from twitter_api import get_tweets
app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})
app.config["CORS_HEADER"] = "Content-Type"

@app.before_request
def initialize_firebase():
    print("Initializing Firebase")
    g.db = db_conn.initialize_db()



@app.route('/all_queries', methods=['GET', 'POST'])
def uui_request():
    body = request.get_json()
    
    if 'uid' in body.keys():
        uid = body['uid']
        data = db_conn.get_all_searched_text(g.db, 'users', uid)
        return jsonify({
            "data": data,
            "status": 1
            })
    

@app.route('/sentiment_data/<uid>', methods=['GET'])
def get_sentiment_data(uid):
    if hasattr(g, 'db'):

        user_sentiment_data_list = db_conn.get_data_by_uid(g.db, 'sentiment_data', uid)

        if user_sentiment_data_list:
            return jsonify({"data": user_sentiment_data_list})

        return jsonify({"No Data": []})

    return jsonify({"error": "No database connection"})



@app.route('/sentiment_analysis', methods=['POST'])
def analyze_data():
    body = request.get_json()
    text = body['text']
    uid = body['uid']
    start = time()
    data = db_conn.analyze_text(g.db,u'users', uid, text)
    
    return jsonify({
        "data": data,
        "execution_time": time() - start,
        "success": 1})

@app.route('/twitter_api', methods=['GET','POST'])
def analyze_tweet_topic():
    body = request.get_json() if request.get_json() else request.form
    
    if 'uid' in body.keys() and 'topic' in body.keys() and 'limit' in body.keys():
        uid = body['uid']
        topic = body['topic']
        limit = body['limit']
        
        start = time()
        text_array = get_tweets(topic, limit)
        print(text_array)
        
        data = db_conn.analyze_text_twitter(g.db, u'users', uid, text_array)
        
        return jsonify({
            "data": data,
            "execution_time": time() - start,
            "success": 1})

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5001, debug=True)
