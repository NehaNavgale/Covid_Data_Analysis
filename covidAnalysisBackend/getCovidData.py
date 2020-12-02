import json
import requests

def load_date():
    response = requests.get("https://api.covidtracking.com/v1/us/daily.json")
    if response.status_code == 200:
        return json.loads(response.content.decode('utf-8'))
    else:
        return None
    # print(response.status_code)
    # print(response.json())

covid_info = load_date()

print(covid_info)

