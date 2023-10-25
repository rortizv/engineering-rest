# engineering-rest

This is a NodeJS REST api using a MySQL database.

The backend application is able to:
- Create a User from /register route when is not registered yet (no need jwt)
- Login User and generate jwt to validate requests
- User CRUD (all of these routes have jwt validation)
- Has a User "change state" to activate or deactivate the user (soft delete).
- Has a User "permanent delete" to delete the user forever.



Steps to configure and run:
1. Clone project ```https://github.com/rortizv/engineering-rest.git```
2. Open a PhpMyAdmin in local
3. Create a database with name ```engineering-rest```
4. Copy sql script from file ```engineering-rest.sql```
5. Paste it in the phpmyadmin sql editor and run the script (after this step, database is ready, just run the apache server with mysql)
6. Database has already some users, but you can create as many as you want
7. Use Node 18.18.2
8. Run ```npm i```
9. Run app with ```npm start```

Testing api routes with Postman:
You will find file: ```engineering-rest.postman_collection.json```
Load it in Postman and you can test all api services.
