const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db2 = {};
db2.mongoose = mongoose;
db2.url = dbConfig.url;
db2.donations = require("./donation.models.js")(mongoose);




module.exports = db2;