const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

const app = express();

//Routes
const healthRoute = require("./routes/health");
const usersRoute = require("./routes/users");

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use("/", usersRoute);
app.use("/", healthRoute);

//DB Connection
mongoose.connect(process.env.DB_CONNECTON, () =>
    console.log("Successfully connected to the DB")
);

app.listen(8000);