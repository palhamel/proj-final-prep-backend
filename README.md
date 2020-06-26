# Final project @ Technigo Bootcamp - Backend

RESTful API for Final project.

- Mongoose models
- Error handling using Try/Catch.
- Using environment variables.
- Using async/await.
- ReadyState check om database
- Seeding database locally and externally.
- Deployed to Heroku and database to MongoDB cloud.

#### Tech used: 
- Node.js, Express, MongoDB, MongoDB Atlas and JavaScript ES6
- VS Code, MongoDB Compass, Postman and Chrome.

## 

- Root:
https://proj-final-prep-backend.herokuapp.com/ <br>

- To return all Kits:
https://proj-final-prep-backend.herokuapp.com/kits <br>

- To return ONE Kit via database id:
https://proj-final-prep-backend.herokuapp.com/kit/5ef5fc996202b3002a7ab308 <br>

- Sort by price:
https://proj-final-prep-backend.herokuapp.com/kits/sort?sort_by=average_cost <br>


## 
I started by working on the mongoose model for my database. I then did a local seed to MongoDB and started working on the endpoints. I needed to make some changes in the model and did a new database seed. Kept on working on the endpoints and handling errors. 
When everything worked locally I deployed to Heroku. And had some issues regarding versions of dependencies with Heroku but solved it all. 
Also configured MongoDB Atlas. Tested first with a empty database and then did a seed to MongoDB Atlas using Heroku Config Vars and "RESET_DATABASE=true" to run my seed to db. 

## View it live - the website:
https://proj-final-prepper.netlify.app/


