const db = require("../db/connection")

const fetchSnackById = (id) => {
   return db.query(`SELECT * FROM snacks WHERE snack_id = $1`, [id]).then(({ rows }) => { 
        console.log(rows, "<< rows in model")
        return rows[0]
    })
};
 
module.exports = fetchSnackById;


// Interact with the database X
// do any necessary data manipulation X
// send the result back up to the controller X