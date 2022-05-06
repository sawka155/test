var mysql = require('mysql');
// Set database connection credentials
const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
    charset: 'utf8mb4',
};

const pool = mysql.createPool(config);

module.exports = pool;