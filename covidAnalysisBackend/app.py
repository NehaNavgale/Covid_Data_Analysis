from flask import Flask
from flask_cors import CORS, cross_origin
import pandas as pd

app = Flask(__name__)
CORS(app)

def load_USAData():
  csv_data = pd.read_csv("static/Input/byUSATotal.csv", sep=',')
  return csv_data

def load_positiveCaseData():
  csv_data = pd.read_csv("static/Input/byCases.csv", sep=',')
  return csv_data

def load_deathData():
  csv_data = pd.read_csv("static/Input/byDeath.csv", sep=',')
  return csv_data

def load_byHospitalizationTotal():
    csv_data = pd.read_csv("static/Input/byHospitalizationTotal.csv", sep=',')
    return csv_data

def load_byDateDeaths():
    csv_data = pd.read_csv("static/Input/byDateDeaths.csv", sep=',')
    return csv_data

def load_byLargestTestingIncrease():
    csv_data = pd.read_csv("static/Input/byLargestTestingIncrease.csv", sep=',')
    return csv_data


@app.route('/api/byDeath')
def byCountry():
    data = load_deathData()

def load_SingleDayRise():
  csv_data = pd.read_csv("static/Input/bySingleDayRise.csv", sep=',')
  return csv_data

def load_ByDateKS():
  csv_data = pd.read_csv("static/Input/byDateKS.csv", sep=',')
  return csv_data

def load_ByNovUSACases():
  csv_data = pd.read_csv("static/Input/byNovUSACases.csv", sep=',')
  return csv_data

def load_ByAge():
  csv_data = pd.read_csv("static/Input/byAge.csv", sep=',')
  return csv_data

@app.route('/api/byUSATotal')
def byUSATotal():
    data = load_USAData()
    return data.to_json(orient='records')

@app.route('/api/byCases')
def byCases():
    data = load_positiveCaseData()
    return data.to_json(orient='records')

@app.route('/api/byDeath')
def byDeath():
    data = load_deathData()
    return data.to_json(orient='records')

@app.route('/api/bySingleDayRise')
def bySingleDayRise():
    data = load_SingleDayRise()
    return data.to_json(orient='records')

@app.route('/api/byDateKS')
def byDateKS():
    data = load_ByDateKS()
    return data.to_json(orient='records')

@app.route('/api/byNovUSACases')
def byNovCases():
    data = load_ByNovUSACases()
    return data.to_json(orient='records')

@app.route('/api/byAge')
def byAge():
    data = load_ByAge()
    return data.to_json(orient='records')

@app.route('/api/byHospitalizationTotal')
def byHospitalizationTotal():
    data = load_byHospitalizationTotal()
    return data.to_json(orient='records')

@app.route('/api/byDateDeaths')
def byDateDeaths():
    data = load_byDateDeaths()
    return data.to_json(orient='records')

@app.route('/api/byLargestTestingIncrease')
def byLargestTestingIncrease():
    data = load_byLargestTestingIncrease()
    return data.to_json(orient='records')

@app.route('/')
def hello_world():
    return 'Covid Data Analysis!'

if __name__ == '__main__':
    app.run()
