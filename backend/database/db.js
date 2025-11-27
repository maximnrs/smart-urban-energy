const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "energy_dashboard"
});

module.exports = connection.promise();
