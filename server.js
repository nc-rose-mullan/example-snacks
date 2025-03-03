const http = require('http');
const db = require('./db/connection');

const server = http.createServer((request, response) => { 
    const { method, url } = request
    
    if (method === 'GET' && url === "/api") {
        response.setHeader("content-type", "application/json");
        response.statusCode = 200;
        response.write(JSON.stringify({ msg: "Hello world" }));
        response.end();
    }
    if (method === 'GET' && url === '/api/snacks') { 
        console.log("GETTING SNACKS")
        return db.query(`SELECT * FROM snacks`).then(({ rows }) => {
            console.log(rows)
            response.setHeader("content-type", "application/json")
            response.statusCode = 200
            response.write(JSON.stringify({ snacks: rows }))
            response.end()
        })
    }
    if (method === 'POST' && url === '/api/snacks') { 
        let body = ""
        request.on("data", (packet) => { 
            body += packet
        })

        request.on("end", () => { 
            const {snack_name, snack_description, price_in_pence, category_id} = JSON.parse(body)

            return db.query(`INSERT INTO snacks (snack_name, snack_description, price_in_pence, category_id) VALUES ($1, $2, $3, $4)`, [snack_name, snack_description, price_in_pence, category_id])
        })
    }
});

server.listen(9090, (err) => { 
    if (err) {
        console.log(err);
    } else { 
        console.log("listening on 9090")
    }
})