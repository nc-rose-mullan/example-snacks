const express = require("express");
const app = express();
const db = require("./db/connection")

app.use(express.json())

app.get('/api', (request, response) => { 
    response.status(200).send({msg: "Hello world from express"})
})

app.get('/api/snacks', (request, response) => { 
    return db.query(`SELECT * FROM snacks`).then(({ rows }) => { 
        response.status(200).send({snacks: rows})
    })
})

app.get('/api/snacks/:snack_id', (request, response) => {
    const { snack_id } = request.params;
    return db.query(`SELECT * FROM snacks WHERE snack_id = $1`, [snack_id])
        .then(({ rows }) => { 
        response.status(200).send({ snack: rows[0] })
    }) 
})

app.post('/api/snacks', (request, response) => { 
    console.log(request.body)

})

module.exports = app