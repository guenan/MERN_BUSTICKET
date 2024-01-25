const express = require("express");
const app = express();
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
const port = process.env.PORT || 5000;
app.use(express.json());

// import routes
const usersRoute = require("./routes/usersRoute");
const busesRoute = require("./routes/busesRoute");
const bookingsRoute = require("./routes/bookingsRoute");
app.use("/api/bookings", bookingsRoute);

// apply route to incoming url
app.use("/api/users", usersRoute);
app.use("/api/buses", busesRoute);

app.listen(port, () => console.log(`nodejs started Listen on port ${port}`));