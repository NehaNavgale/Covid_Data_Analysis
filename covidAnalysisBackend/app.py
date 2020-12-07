from flask import Flask
from flask_cors import CORS, cross_origin
import pandas as pd

app = Flask(__name__)
CORS(app)

def load_USAData():
  csv_data = pd.read_csv("static/Input/byUSATotal.csv", sep=',')
  return csv_data

@app.route('/api/byUSATotal')
def byUSATotal():
    data = load_USAData()
    return data.to_json(orient='records')

def load_positiveCaseData():
  csv_data = pd.read_csv("static/Input/byCases.csv", sep=',')
  return csv_data

@app.route('/api/byCases')
def byCases():
    data = load_positiveCaseData()
    return data.to_json(orient='records')


def load_top10StateCaseData():
  csv_data = pd.read_csv("static/Input/byCasesTop10State.csv", sep=',')
  return csv_data

@app.route('/api/byCasesTop10State')
def byTop10StateCases():
    data = load_top10StateCaseData()
    return data.to_json(orient='records')

def load_deathData():
  csv_data = pd.read_csv("static/Input/byDeath.csv", sep=',')
  return csv_data

@app.route('/api/byDeath')
def byDeath():
    data = load_deathData()
    return data.to_json(orient='records')

def load_SingleDayRise():
  csv_data = pd.read_csv("static/Input/bySingleDayRise.csv", sep=',')
  return csv_data

@app.route('/api/bySingleDayRise')
def bySingleDayRise():
    data = load_SingleDayRise()
    return data.to_json(orient='records')

def load_ByDateKS():
  csv_data = pd.read_csv("static/Input/byDateKS.csv", sep=',')
  return csv_data

@app.route('/api/byDateKS')
def byDateKS():
    data = load_ByDateKS()
    return data.to_json(orient='records')

def load_ByNovUSACases():
  csv_data = pd.read_csv("static/Input/byNovUSACases.csv", sep=',')
  return csv_data

@app.route('/api/byNovUSACases')
def byNovCases():
    data = load_ByNovUSACases()
    return data.to_json(orient='records')

def load_ByAge():
  csv_data = pd.read_csv("static/Input/byAge.csv", sep=',')
  return csv_data

@app.route('/api/byAge')
def byAge():
    data = load_ByAge()
    return data.to_json(orient='records')

def load_ByPolicy():
  csv_data = pd.read_csv("static/Input/byPolicy.csv", sep=',')
  return csv_data

@app.route('/api/byPolicy')
def byPolicy():
    data = load_ByPolicy()
    return data.to_json(orient='records')

def load_ByQuarantine():
  csv_data = pd.read_csv("static/Input/byMandatoryQuarantine.csv", sep=',')
  return csv_data

@app.route('/api/byQuarantine')
def byQuarantine():
    data = load_ByQuarantine()
    return data.to_json(orient='records')

def load_ByBarReopen():
  csv_data = pd.read_csv("static/Input/byPolicyOfBarReopen.csv", sep=',')
  return csv_data

@app.route('/api/byPolicyOfBarReopen')
def byBarReopen():
    data = load_ByBarReopen()
    return data.to_json(orient='records')

def load_ByHospitalizationTotal():
  csv_data = pd.read_csv("static/Input/byHospitalizationTotal.csv", sep=',')
  return csv_data

@app.route('/api/byHospitalizationTotal')
def byHospitalizationTotal():
    data = load_ByHospitalizationTotal()
    return data.to_json(orient='records')

def load_ByLargestTestingIncrease():
  csv_data = pd.read_csv("static/Input/byLargestTestingIncrease.csv", sep=',')
  return csv_data

@app.route('/api/byLargestTestingIncrease')
def byLargestTestingIncrease():
    data = load_ByLargestTestingIncrease()
    return data.to_json(orient='records')


@app.route('/')
def hello_world():
    return 'Covid Data Analysis!'

if __name__ == '__main__':
    app.run()
