import findspark
findspark.init()
from pyspark.sql import SparkSession
from pyspark.sql.functions import col
from pyspark.sql.types import *
import pandas as pd

spark = SparkSession.builder.appName("Covid Analysis").getOrCreate()

# Loading CSV file to dataframes
dfWorld = spark.read.option("header", True).option("inferSchema","true").csv("Dataset/owid-covid-data.csv")

# Obtaining Summary Statistics
#dfWorld.show()
dfWorld.printSchema()

# remove duplicates
dfWorld.dropDuplicates()

# Filter operation to take only USA data
dfUSA = dfWorld.filter(col("iso_code") == "USA")

# create view
dfUSA.createOrReplaceTempView("covidUSA")
# dfUSA.filter(col("total_cases") != "null").show()
#
schemaUSA = StructType([
   StructField("submission_date", StringType(), True),
   StructField("state", StringType(), True),
   StructField("tot_cases", IntegerType(), True),
   StructField("conf_cases", IntegerType(), True),
   StructField("prob_cases", IntegerType(), True),
   StructField("new_case", IntegerType(), True),
   StructField("pnew_case", IntegerType(), True),
   StructField("tot_death", IntegerType(), True),
   StructField("conf_death", IntegerType(), True),
   StructField("prob_death", IntegerType(), True),
   StructField("new_death", IntegerType(), True),
   StructField("pnew_death", IntegerType(), True),
   StructField("created_at", DateType(), True),
   StructField("consent_cases", StringType(), True),
   StructField("consent_deaths", StringType(), True)
])

# Loading CSV file to dataframes
df = spark.read.format("csv").schema(schemaUSA).option("header", True).option("inferSchema","true").load("Dataset/United_States_COVID-19.csv")

# Obtaining Summary Statistics
# df.show()
df.printSchema()

# remove duplicates
df.dropDuplicates()

# create view
df.createOrReplaceTempView("covid")

# Loading CSV file to dataframes
dfSD = spark.read.option("header", True).option("inferSchema","true").csv("Dataset/social_distancing.csv")

# # Obtaining Summary Statistics
dfSD.printSchema()

# remove duplicates
df.dropDuplicates()

# create view
dfSD.createOrReplaceTempView("covidSD")

# dfAge = spark.read.option("header", True).csv("Dataset/Provisional_COVID-19_Death_Counts_by_Sex__Age__and_State.csv")
# dfAge.dropDuplicates()
# dfAge.createOrReplaceTempView("AgeData")

# Query 1: USA Total records
query1 = spark.sql("select max(total_cases) as total_cases, max(total_deaths) as total_deaths, max(total_cases_per_million) "
                   " as total_cases_per_million, max(icu_patients) as icu_patients, max(hosp_patients) as hosp_patients "
                   " from covidUSA group by iso_code")
query1.show()
pd = query1.toPandas()
pd.to_csv('static/Input/byUSATotal.csv', index=False)

# Query 2: State with max positive cases
query2 = spark.sql("SELECT state, max(tot_cases) as tot_cases FROM covid group by "
                   " state order by tot_cases desc limit 10")
query2.show()
pd = query2.toPandas()
pd.to_csv('static/Input/byCasesTop10State.csv', index=False)

# Query 3: State with max single day death with date
query3 = spark.sql("Select c.state, c.new_death as death, c.submission_date as date from covid c join"
                   " (SELECT state, max(new_death) as death FROM covid group by state) m on "
                   " c.state = m.state and c.new_death = m.death and c.new_death > 0 order by c.new_death desc limit 10")
query3.show()
pd = query3.toPandas()
pd.to_csv('static/Input/byDeath.csv', index=False)

# Query 4: State and max single day increase with date
query4 = spark.sql("select c.state, c.new_case, c.submission_date as date from covid c join "
                   " (select state, max(new_case) as new_case from covid group by state) "
                   " m on c.state = m.state and c.new_case = m.new_case and c.new_case > 0 order by c.new_case desc limit 10")
query4.show()
pd = query4.toPandas()
pd.to_csv('static/Input/bySingleDayRise.csv', index=False)

# Query 5: Kansas Cases by Date
query5 = spark.sql("SELECT submission_date as date, tot_cases FROM covid where state = 'KS'")
query5.show()
pd = query5.toPandas()
pd.to_csv('static/Input/byDateKS.csv', index=False)

# Query 6: USA nov cases
query6 = spark.sql("select total_cases, total_deaths, date from covidUSA where date between '2020-11-01' and '2020-11-31'")
query6.show()
pd = query6.toPandas()
pd.to_csv('static/Input/byNovUSACases.csv', index=False)

#Query 7: State with positive cases and total death
query7 = spark.sql("SELECT state, max(tot_cases) tot_cases, max(tot_death) as tot_death FROM covid group by "
                   " state order by tot_cases desc")
query7.show()
pd = query7.toPandas()
pd.to_csv('static/Input/byCases.csv', index=False)

# Query 8: find social distancing
query8 = spark.sql("SELECT location, Status_of_Reopening, Stay_at_Home_Order FROM covidSD")
query8.show()
pd = query8.toPandas()
pd.to_csv('static/Input/byPolicy.csv', index=False)

# Query 9: quarantine lifted
query9 = spark.sql("SELECT location, case when Mandatory_Quarantine_for_Travelers = 'Lifted' then 'yes' else 'no' end as Mandatory_Quarantine FROM covidSD")
query9.show()
pd = query9.toPandas()
pd.to_csv('static/Input/byMandatoryQuarantine.csv', index=False)

# Query 10: policy
query10 = spark.sql("SELECT location, Large_Gatherings_Ban, Face_Covering_Requirement FROM covidSD where Bar_Closures = 'Reopened'")
query10.show()
pd = query10.toPandas()
pd.to_csv('static/Input/byPolicyOfBarReopen.csv', index=False)

# Query 7: By Age
# query7 = spark.sql("select Data_as_of, Age_group, COVID_Deaths from AgeData")
# query7.show()
# pd = query7.toPandas()
# pd.to_csv('static/Input/byAge.csv', index=False)

# df = spark.read.format("csv").option("header", True).option("inferSchema","true").load("Dataset/all-states-history.csv")
#
# # Obtaining Summary Statistics
# # df.show()
# df.printSchema()
#
# # remove duplicates
# df.dropDuplicates()
#
# # create view
# df.createOrReplaceTempView("covid")

# query7 = df.groupBy("state").agg({"hospitalized": "sum"}).withColumnRenamed("sum(hospitalized)", "totalHospitalizations").orderBy("totalHospitalizations", ascending=False)
# query7.show()
# pd = query7.toPandas()
# pd.to_csv('static/Input/byHospitalizationTotal.csv', index=False)

#Query 9: States with largest increase in testing
# query9 = df.groupBy("state").agg({"totalTestResultsIncrease": "max"}).withColumnRenamed("max(totalTestResultsIncrease)", "maxTestIncrease").orderBy("maxTestIncrease", ascending=False)
# query9.show()
# pd = query9.toPandas()
# pd.to_csv('static/Input/byLargestTestingIncrease.csv', index=False)

# schemaWorld = StructType([
#    StructField("iso_code", StringType(), True),
#    StructField("continent", StringType(), True),
#    StructField("location", StringType(), True),
#    StructField("date", DateType(), True),
#    StructField("total_cases", IntegerType(), True),
#    StructField("new_cases", IntegerType(), True),
#    StructField("new_cases_smoothed", IntegerType(), True),
#    StructField("total_deaths", IntegerType(), True),
#    StructField("new_deaths", IntegerType(), True),
#    StructField("new_deaths_smoothed", IntegerType(), True),
#    StructField("total_cases_per_million", IntegerType(), True),
#    StructField("new_cases_per_million", IntegerType(), True),
#    StructField("new_cases_smoothed_per_million", IntegerType(), True),
#    StructField("total_deaths_per_million", IntegerType(), True),
#    StructField("new_deaths_per_million", IntegerType(), True),
#     StructField("new_deaths_smoothed_per_million", IntegerType(), True),
#     StructField("reproduction_rate", IntegerType(), True),
#     StructField("icu_patients", IntegerType(), True),
#     StructField("icu_patients_per_million", IntegerType(), True),
#     StructField("hosp_patients", IntegerType(), True),
#     StructField("hosp_patients_per_million", IntegerType(), True),
#     StructField("weekly_icu_admissions", IntegerType(), True),
#     StructField("weekly_icu_admissions_per_million", IntegerType(), True),
#     StructField("weekly_hosp_admissions", IntegerType(), True),
#     StructField("weekly_hosp_admissions_per_million", IntegerType(), True),
#     StructField("total_tests", IntegerType(), True),
#     StructField("new_tests", IntegerType(), True),
#     StructField("total_tests_per_thousand", IntegerType(), True),
#     StructField("new_tests_per_thousand", IntegerType(), True),
#     StructField("new_tests_smoothed", IntegerType(), True),
#     StructField("new_tests_smoothed_per_thousand", IntegerType(), True),
#     StructField("positive_rate", IntegerType(), True),
#     StructField("tests_per_case", IntegerType(), True),
#     StructField("tests_units", IntegerType(), True),
#     StructField("stringency_index", IntegerType(), True),
#     StructField("population", IntegerType(), True),
#     StructField("population_density", DecimalType(), True),
#     StructField("median_age", DecimalType(), True),
#     StructField("aged_65_older", DecimalType(), True),
#     StructField("aged_70_older", DecimalType(), True),
#     StructField("gdp_per_capita", DecimalType(), True),
#     StructField("extreme_poverty", DecimalType(), True),
#     StructField("cardiovasc_death_rate", DecimalType(), True),
#     StructField("diabetes_prevalence", DecimalType(), True),
#     StructField("female_smokers", DecimalType(), True),
#     StructField("male_smokers", DecimalType(), True),
#     StructField("handwashing_facilities", DecimalType(), True),
#     StructField("hospital_beds_per_thousand", DecimalType(), True),
#     StructField("life_expectancy", DecimalType(), True),
#     StructField("human_development_index", DecimalType(), True)
# ])