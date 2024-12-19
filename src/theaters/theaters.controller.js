const theaterService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//Endpoint functions

async function list(req, res) {
    const data = await theaterService.list();
    res.json({ data: data });
};

module.exports = {
    list: asyncErrorBoundary(list),
};