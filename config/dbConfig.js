const mongoose = require('mongoose');

mongoose.connect(process.env.mongo_url);
const db = mongoose.connection;

db.on('connected', () => {
    console.log("connexion to mongodb successful");
});

db.on('error', () => {
    console.log("connexion to mongodb failed");
});

