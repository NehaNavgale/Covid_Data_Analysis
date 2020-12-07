select state, max(new_cases) as max_cases from coviddata where
TO_DATE(from_unixtime(UNIX_TIMESTAMP(created_at, 'MM/dd/yy mm:ss'))) between '2020-10-01' and '2020-10-10' group by state order by max_cases desc;
