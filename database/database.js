const mysql = require('mysql2');
const config = require('./config/setting');
const pool = mysql.createPool(config);

module.exports = pool.promise();
