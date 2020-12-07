select state, sum(new_death)/sum(new_cases) as death_rate from coviddata group by state order by death_rate desc;
