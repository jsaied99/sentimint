import requests 


bearer_token = "Bearer AAAAAAAAAAAAAAAAAAAAACqUWAEAAAAA81etU%2FOQ0Okmt5N9maHM0%2B62loE%3DnyIIjT6DVpYVhSOAYJqJ8lZNX1i4v8XSzqIa1HQWpRAthgjdKh"
print(bearer_token)


def get_tweets(topic: str, limit=10) -> list:
    lang = "lang:en"
    base_url = "https://api.twitter.com/2/tweets/search/recent?query={}{}&max_results={}".format(topic,lang,limit)
    print(base_url)
    response = requests.get(base_url, headers={"Authorization": bearer_token})
    
    
    data = response.json()
    text_array = []
    
    for tweet in data["data"]:
        text_array.append(tweet["text"])
    
    return text_array
    

    
