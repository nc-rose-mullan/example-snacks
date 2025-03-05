const fetchSnackById = require("../models/snacks.models");

const getSnackById = (request, response) => { 
    const { snack_id } = request.params
    console.log("hello from contoller", snack_id)

    fetchSnackById(snack_id).then((snack) => { 
        response.status(200).send({snack: snack})
    })
};

// receive the request X
// extract necessary info X
// call the model X
// send the response

module.exports = getSnackById