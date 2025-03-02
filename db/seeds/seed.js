const db = require("../connection")
const format = require("pg-format")

function seed({ snacksData, categoriesData, vendingMachineData }) {
    return db.query(`DROP TABLE IF EXISTS snacks;`)
        .then(() => { return db.query(`DROP TABLE IF EXISTS categories;`); })
        .then(() => { return db.query(`DROP TABLE IF EXISTS vending_machines;`); })
        .then(() => {
            return db.query(`CREATE TABLE vending_machines (
                vm_id SERIAL PRIMARY KEY,
                vm_location VARCHAR(100),
                vm_rating INT
            );`);
        })
        .then(() => {
            return db.query(`CREATE TABLE categories(
                category_id SERIAL PRIMARY KEY,
                category_name VARCHAR(40) NOT NULL
            );`);
        })
        .then(() => {
            return db.query(`CREATE TABLE snacks(
                snack_id SERIAL PRIMARY KEY,
                snack_name VARCHAR(40) NOT NULL,
                snack_description VARCHAR(100),
                price_in_pence INT,
                category_id INT,
                FOREIGN KEY (category_id) REFERENCES categories(category_id)
            );`);
        })
        .then(() => { 
            const formattedCategories = categoriesData.map((category) => { 
                return [category.category_name]
            })

            const sqlString = format(`INSERT INTO categories (category_name)VALUES %L RETURNING *`, formattedCategories)
            return db.query(sqlString)
        })
        .then(({rows}) => { 
            console.log(rows)


            // const formattedSnacks = snacksData.map((snack) => { 
            //     return [snack.snack_name, snack.snack_description, snack.price_in_pence, ]
            // })
            // console.log(formattedSnacks)
        })
}

module.exports = seed 