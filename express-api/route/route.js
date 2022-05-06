// Load the MySQL pool connection
const { response } = require('express');
const { request } = require('express');
const pool = require('../data/config');

const router = app => {
    app.get('/', (request, response) => {
        response.send({
            message: 'Node.js and Express REST API'
        });
    });

    app.get('/users/:date', (request, response) => {
        const date = request.params.date;
        pool.query('SELECT * FROM `data` WHERE `date` = ?', date, (error, result) => {
            if (error) throw error;

            response.send(result);
        })
    })

    app.get('/users/', (request, response) => {
        const date = request.params.date;
        pool.query('SELECT * FROM `data` WHERE `date` = -1', (error, result) => {
            if (error) throw error;

            response.send(result);
        })
    })

    // Add a new event
    app.post('/users', (request, response) => {
        pool.query('INSERT INTO data SET ?', request.body, (error, result) => {
            if (error) throw error;

            pool.query('ALTER TABLE data AUTO_INCREMENT = 1');
            response.status(201).send(`User added with ID: ${result.insertId}`);
        });

    })
    // Update an existing user
    app.put('/users/:id', (request, response) => {
        const id = request.params.id;

        pool.query('UPDATE data SET ? WHERE id = ?', [request.body, id], (error, result) => {
            if (error) throw error;

            response.send('User updated successfully.');
        });
    });

    // Delete a user
    app.delete('/users/:id', (request, response) => {
        const id = request.params.id;

        pool.query('DELETE FROM data WHERE id = ?', id, (error, result) => {
            if (error) throw error;

            response.send('User deleted.');
        });
    });
}



// Export the router
module.exports = router;