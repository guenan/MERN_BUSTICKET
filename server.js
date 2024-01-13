const express = require("express");
const app = express();
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
const port = process.env.PORT || 5000;
app.use(express.json());

// import routes
const usersRoute = require("./routes/usersRoute");

// apply route to incoming url
app.use("/api/users", usersRoute);

app.listen(port, () => console.log(`nodejs started Listen on port ${port}`));