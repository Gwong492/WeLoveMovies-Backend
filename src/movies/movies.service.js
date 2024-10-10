const knex = require("../db/connections");
const mapProperties = require("../utils/map-properties");

function list(isShowing) {
    if (isShowing) {
        // When is_showing is true, return only movies currently showing in theaters
        return knex("movies as m")
          .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
          .select("m.*")
          .where({ "mt.is_showing": true })
          .groupBy("m.movie_id");
    }

    return knex("movies as m").select("m.*")
};

// function read("movieId") {

// };

module.exports = {
    list,
};