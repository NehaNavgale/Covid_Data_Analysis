create table covidData (submission_date date, state string, tot_cases int, conf_cases int, prob_cases int, new_cases int, pnew_cases int, tot_death int,
                        conf_death int, prob_death int, new_death int, pnew_death int, created_at string, consent_cases string, consent_deaths string)
row format delimited fields terminated by '\t' stored as textfile;


load data local inpath 'home/cloudera/Downloads/United_States_COVID-19_Cases_and_Deaths_by_State_over_Time.csv' into table covidData; 
