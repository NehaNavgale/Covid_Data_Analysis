from flask import Flask
from flask_cors import CORS, cross_origin
import pandas as pd

app = Flask(__name__)
CORS(app)

def load_deathData():
  csv_data = pd.read_csv("static/Input/byDeath.csv", sep=',')
  return csv_data

def load_positiveCaseData():
  csv_data = pd.read_csv("static/Input/byCases.csv", sep=',')
  return csv_data

def load_USAData():
  csv_data = pd.read_csv("static/Input/byUSATotal.csv", sep=',')
  return csv_data

@app.route('/api/byDeath')
def byCountry():
    data = load_deathData()
    return data.to_json(orient='records')

@app.route('/api/byCases')
def byMovie():
    data = load_positiveCaseData()
    return data.to_json(orient='records')

@app.route('/api/byUSATotal')
def byCharacter():
    data = load_USAData()
    return data.to_json(orient='records')

@app.route('/')
def hello_world():
    return 'Covid Data Analysis!'

if __name__ == '__main__':
    app.run()
