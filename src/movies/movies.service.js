const knex = require("../db/connections");

function list(isShowing) {
    if (isShowing = "true") {
        return knex("movies as m")
          .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
          .select("m.*")
          .where({ "mt.is_showing": true })
          .groupBy("m.movie_id")
    }

    return knex("movies as m").select("m.*")
};

function read(movieId) {
    return knex("movies")
        .select("*")
        .where({ "movie_id": movieId })
        .first();
};

function readTheater(movieId) {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .join("theaters as t", "t.theater_id", "mt.theater_id")
        .select("t.*", "m.created_at", "m.updated_at", "mt.is_showing", "m.movie_id")
        .where({ "m.movie_id": movieId })
};

function readReviewsCritics(movieId) {
    return knex("reviews as r")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .select("r.*", "c.*")
        .where({ "r.movie_id": movieId })
        .then((reviews) => {
            return reviews.map((review) => ({
                ...review,
                critic: {
                    critic_id: review.critic_id,
                    preferred_name: review.preferred_name,
                    surname: review.surname,
                    organization_name: review.organization_name,
                    created_at: review.created_at,
                    updated_at: review.updated_at,
                }
            }));
        });
};

module.exports = {
    list,
    read,
    readTheater,
    readReviewsCritics,
};