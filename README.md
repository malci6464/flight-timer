## backend

a node server with a mysql connection and endpoints for the frontend
add your own .env file with the following vals to run
PORT=....
DB_HOST=.....
DB_USER=....
DB_PASSWORD=....
DB_DATABASE=....

note the queries in the index file reference the table name - this must be updated also

## frontend

a global store holds the endpoint base of the backend

## todo

- add username and pw login
- add popup confirmation of successful submission of flight time
- cleanup table css in flight data
- option to show time remaining
