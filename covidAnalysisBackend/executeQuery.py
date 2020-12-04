import datetime, pytz
import time
import re
import json
import requests
import findspark
findspark.init()
from pyspark.sql import SparkSession
# from pyspark import SparkContext, SparkConf
# from pyspark.sql.functions import to_date
# from pyspark.sql.functions import col
# from pyspark.sql.functions import from_unixtime
# from pyspark.sql.functions import unix_timestamp
# from pyspark.sql.functions  import date_format
# from pyspark.sql.functions import regexp_replace
# from pyspark.sql.functions import regexp_extract
# from pyspark.sql.functions import split
# from pyspark.sql.functions import udf
# from pyspark.sql.types import *

spark = SparkSession.builder.appName("Covid Analysis").getOrCreate()
import pandas as pd

df = spark.read.option("header", True).csv("Dataset/all-states-history.csv")
df.createOrReplaceTempView("covid")
df.printSchema()
df.show()
print(df.count())

# query = spark.sql("SELECT * from covid")
# query.show()

# Query 1: Cases by Date
query1 = spark.sql("SELECT date, state, hospitalized, positive, recovered, totalTestResults  FROM covid")
query1.show()
pd = query1.toPandas()
pd.to_csv('static/Input/byDate.csv', index=False)

# Query 2: State with max death
query2 = spark.sql("SELECT state, max(death) as death FROM covid group by state order by state")
query2.show()
pd = query2.toPandas()
pd.to_csv('static/Input/byDeath.csv', index=False)

# Query 3: State with most positive cases
query3 = spark.sql("SELECT state, max(positive) as positive FROM covid group by state order by state")
query3.show()
pd = query3.toPandas()
pd.to_csv('static/Input/byCases.csv', index=False)

# Query 4: Total records
query4 = spark.sql("select sum(death) as totalDeath, sum(positive) as totalPositive, sum(hospitalized) as totalHospitalized, "
                   " sum(recovered) as recovered, sum(totalTestResults) as totalTestResults from (SELECT state, max(death) as death, "
                   " max(positive) as positive, max(hospitalized) as hospitalized, max(recovered) as recovered, max(totalTestResults) as "
                   " totalTestResults from covid group by state) as totals")
query4.show()
pd = query4.toPandas()
pd.to_csv('static/Input/byUSATotal.csv', index=False)

# Query 5: Total records
query5 = spark.sql("select state, max(positiveIncrease) as maxIncrease from covid group by state")
query5.show()
pd = query5.toPandas()
pd.to_csv('static/Input/byMaxIncrease.csv', index=False)

#Query 6: State with most hospitalizations
query6 = df.groupBy("state").agg({"hospitalized" : "sum"}).withColumnRenamed("sum(hospitalized)", "totalHospitalizations").orderBy("totalHospitalizations", ascending=False)
query6.show()
pd = query6.toPandas()
pd.to_csv('static/Input/byHospitalizationTotal.csv', index=False)

#Query 7: Date with most deaths
query7 = df.groupBy("date").agg({"death" : "sum"}).withColumnRenamed("sum(death)", "totalDeaths").orderBy("totalDeaths", ascending=False)
query7.show()
pd = query7.toPandas()
pd.to_csv('static/Input/byDateDeaths.csv', index=False)

#Query 8: States with largest increase in testing
query8 = df.groupBy("state").agg({"totalTestResultsIncrease": "max"}).withColumnRenamed("max(totalTestResultsIncrease)", "maxTestIncrease").orderBy("maxTestIncrease", ascending=False)
query8.show()
pd = query8.toPandas()
pd.to_csv('static/Input/byLargestTestingIncrease.csv', index=False)

