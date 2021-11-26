# Express Boilerplate
A boilerplate/starter project for quickly building RESTful APIs using Node.js, Express, and Mongoose. <br/><br/>

## Directory Structure
## `app.js`
This is your server's main file. It references all required files that further reference to other files. Among the main elements in this file are the instantiation of `express`, `middlewares`, references to the `routes` and the `database connection`. <br/><br/>

## `.env`
All environment variables (configuration constants)are declared in this file. In this template, the database connection string is included. Simply replace `<db_username` with your mongodb username and `<db_name>` with the name you wish to use for your collection.<br/> **Do not include this file when pushing to your remote version control repo, such as Github. To ensure that this file is excluded when you push to your remote repo, add `.env` in your `.gitignore` file.** <br/><br/>

## `models` Subdirectory
In this subdirectory, you will define all models for your collections. A model is a data object schema. It describes the collection fields and their data types, along with other attributes. <br/><br/>

## `routes` Subdirectory
The models defined in the `models` subdirectory are consumed by the routes created in this folder.
