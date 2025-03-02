const http = require("node:http");
const db = require("./db/connection");

const server = http.createServer((request, response) => {
    console.log(request.method, request.url)
    if (request.method === "GET" && request.url === "/api") {
        response.statusCode = 200;
        response.setHeader("content-type", "application/json");
        response.write(JSON.stringify({ msg: "hello world!" }));
        response.end();
    }

    if (request.method === 'GET' && request.url === '/api/snacks') { 
        return db.query(`SELECT * FROM snacks`).then(({rows}) => { 
            response.setHeader("content-type", "application/json")
            response.statusCode = 200
            response.write(JSON.stringify({ snacks: rows }))
            response.end()
        })
    }

    if (request.method === 'POST' && request.url === '/api/snacks') { 
        let body = ""
        request.on("data", (packet) => { 
           body += packet
        })

        request.on("end", () => { 
            const parsedBody = JSON.parse(body)
            console.log(parsedBody)

            return db.query(`INSERT INTO snacks (snack_name, snack_description, category_id, price_in_pence) VALUES ($1, $2, $3, $4)`, [parsedBody.snack_name, parsedBody.snack_description, parsedBody.category_id, parsedBody.price_in_pence])
        })
    }
});

server.listen(8000, (err) => { 
    if (err) {
        console.log(err);
    } else { 
        console.log("listening on 8000")
    }
})