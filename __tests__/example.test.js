const seed = require("../db/seeds/seed")
const data = require("../db/data/test-data/index.js")
const db = require("../db/connection")
const request = require("supertest")
const app = require("../app.js")

beforeEach(() => { 
    return seed(data)
})

afterAll(() => { 
    return db.end()
})

describe("GET: /api/snacks/:snack_id", () => { 
    test("200: Responds with the snack object with the requested id", () => { 
        return request(app)
            .get('/api/snacks/3')
            .expect(200)
            .then(({body}) => {
                const snack = body.snack
                expect(snack.snack_id).toBe(3)
                expect(typeof snack.snack_name).toBe('string')
                expect(typeof snack.snack_description).toBe('string')
                expect(typeof snack.price_in_pence).toBe('number')
                expect(typeof snack.category_id).toBe('number')
            })
    })
});

describe("POST: /api/snacks", () => { 
    test("201: Respond with the newly posted snack", () => {
        return request(app)
            .post('/api/snacks')
            .send({
                snack_name: "Twix",
                snack_description: "A single twix is called a twick",
                price_in_pence: 115,
                category_id: 4
            })
            .expect(201)
            .then(({ body }) => { 
                const { snack_id, snack_name, snack_description, price_in_pence, category_id } = body.snack
                expect(snack_id).toBe(7)
                expect(typeof snack_name).toBe("string")
                expect(typeof snack_description).toBe("string")
                expect(typeof price_in_pence).toBe("number")
                expect(typeof category_id).toBe("number")
            })

    })
})