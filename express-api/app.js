// Точка входа и порт
const bodyParser = require('body-parser');
const express = require('express');
const port = 3002;
const app = express();
const route = require('./route/route');
var cors = require('cors')

app.use(cors()) // Use this after the variable declaration

// Использовать Node.js промежуточное ПО для разбора тела
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

route(app);

// Запуск сервера
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${server.address().port}`);
});

