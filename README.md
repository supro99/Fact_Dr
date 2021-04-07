# Fact_DR_assignment
REST APIs in nodejs

## PROJECT EXECUTION SETUP
1) git clone the project from the repository online 
(link - https://github.com/supro99/Fact_Dr)
2) Enter your MongoDB database connection string in config(folder) > config.js(file) > database_url(variable)
3) To get required module to run the project > npm install (if failed to execute, try -> sudo npm install)
4) To start the nodejs server > npm start

	

## DATABASE ARCHITECTURE
1) Mongodb is used to store, retrieve and manipulate the data.

2) Only one database is created, named as - 'fact-dr-db'

3) This DB has one collection called as 'users' collection.
    This collection has all the user related data and all the operations are performed on this data.

4) Before you use the APIs query the use the following command in mongo database by entering/login/accessing the database. i.e.
    => use fact-dr-db

## PROJECT ARCHITECTURE
Technology used for the project - Node.js, Express.js, MongoDB

1) This project uses ES6 syntax of javascript.

2) All the routes are in "routes" folder inside "user.js" file. You can navigate to each function from here.

3) All the business logic is written in "services" folder inside the "userServices.js" file.

4) Middleware to authenticated and verify JWT token is written in "auth" folder inside "verifyToken.js" file

5) All the constants/configuration strings are inside the config folder, such as database connection url, database name, some key secrets (not to be written in config file but to be placed in .env variable for security and privacy purpose)


## API DOCUMENTATION
This project has following API endpoints

A Middleware authentication mechanism is established before all APIs execution, except while registering new user and login existing user, to check if the user who is requesting the resources is valid user or not. 
This can be found in 'authentication' folder in verifyToken.js file.

Given below are some sample requests for each respective API

1)Sign-Up API 

		curl --location --request POST 'localhost:3000/user/signup' \
		--header 'Content-Type: application/json' \
		--data-raw '{"name" : "Kavya Pande", "mobile" : 7575755656, "email" :"kavya@gmail.com", "password" : "kavya@22"}'

2)Login API 

		curl --location --request POST 'localhost:3000/user/login' \
		--header 'Content-Type: application/json' \--data-raw '{ "email" :"kavya@gmail.com", "password" : "kavya@22" }'

3) a)Get All Users API

		curl --location --request GET 'localhost:3000/user/' \
		--header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmRiMGU3YjJhNjFkMTc4ZjgxMzA2OCIsImlhdCI6MTYxNzgwMjI5NywiZXhwIjoxNjE3ODg4Njk3fQ.Gkdg9PHt-_v202sOZmqh_mXWLTTZk4pU-2jW--S_BGg'

3) b)Get user By Id API

		curl --location --request GET 'localhost:3000/user?id=606db0e7b2a61d178f813068' \
		--header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmRiMGU3YjJhNjFkMTc4ZjgxMzA2OCIsImlhdCI6MTYxNzgwMTQ5NSwiZXhwIjoxNjE3ODg3ODk1fQ.KCYhHbfLMMrloBxkf_Lv8Lgovj_CPUpUxUjPMHpxmYc'

4) Update User Data API

		curl --location --request PATCH 'localhost:3000/user/' \
		--header 'x-access-token: 			eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmRiMGU3YjJhNjFkMTc4ZjgxMzA2OCIsImlhdCI6MTYxNzgwMjI5NywiZXhwIjoxNjE3ODg4Njk3fQ.Gkdg9PHt-_v202sOZmqh_mXWLTTZk4pU-2jW--S_BGg' \
		--header 'Content-Type: application/json' \
		--data-raw '{"userId" : "606acfbdbf35122a0bb5e809", "dob" : "2/2/1970", "mobile" : 8987098989,"address" : "Sandhi, Marol West, Mumbai, India"}'


5) Create User Data API

		curl --location --request POST 'localhost:3000/user/' \
		--header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmRiMGU3YjJhNjFkMTc4ZjgxMzA2OCIsImlhdCI6MTYxNzgwMjI5NywiZXhwIjoxNjE3ODg4Njk3fQ.Gkdg9PHt-_v202sOZmqh_mXWLTTZk4pU-2jW--S_BGg' \
		--header 'Content-Type: application/json' \
		--data-raw '{   "name" : "Neha Kakatiya", "mobile" : "7799953421", "email" :"neha@gmail.com" }' 


6) Delete user API(using Id of user to delete its record)

		curl --location --request DELETE 'localhost:3000/user/' \
		--header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmRiMGU3YjJhNjFkMTc4ZjgxMzA2OCIsImlhdCI6MTYxNzgwMjI5NywiZXhwIjoxNjE3ODg4Njk3fQ.Gkdg9PHt-_v202sOZmqh_mXWLTTZk4pU-2jW--S_BGg' \
		--header 'Content-Type: application/json' \
		--data-raw '{"userId" : "606ae573bf35122a0bb5e80c" }'

7) API to generate Bulk users

		curl --location --request GET 'localhost:3000/user/bulk?quantity=6'































