const movieService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


//Endpoint functions
async function list(req, res) {
    const is_showing = req.query.is_showing;
    const data = await movieService.list(is_showing)
    res.json({ data: data });
};

//Exports
module.exports = {
    list: asyncErrorBoundary(list),
};