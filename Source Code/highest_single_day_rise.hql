select c.state, c.new_cases as max_cases, c.created_at from coviddata c 
join
(select state, max(new_cases) as max_cases from coviddata group by state order by max_cases desc limit 10) m
on m.state = c.state and m.max_cases = c.new_cases;
