const knex = require("../db/connections");

function read(reviewId) {
    return knex("reviews")
    .select("*")
    .where({ "review_id": reviewId })
    .first()
};

function destroy(reviewId) {
    return knex("reviews")
        .where({ "review_id": reviewId })
        .del();
};

function update(updatedReview) {
    console.log(updatedReview)
    return knex("reviews")
        .where({ "review_id": updatedReview.review_id })
        .update({ 
            "score": updatedReview.score,
            "content": updatedReview.content,
         })
         .returning("*");
};

module.exports = {
    destroy,
    update,
    read,
}