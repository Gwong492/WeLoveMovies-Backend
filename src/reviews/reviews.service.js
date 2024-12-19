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
    return knex("reviews")
        .where({ "review_id": updatedReview.review_id })
        .update({
            "score": updatedReview.score,
            "content": updatedReview.content,
        })
        .then(() => {
            return knex("reviews as r")
                .join("critics as c", "r.critic_id", "c.critic_id")
                .select(
                    "r.review_id",
                    "r.content",
                    "r.score",
                    "r.created_at as review_created_at",
                    "r.updated_at as review_updated_at",
                    "r.critic_id",
                    "r.movie_id",
                    "c.critic_id",
                    "c.preferred_name",
                    "c.surname",
                    "c.organization_name",
                    "c.created_at as critic_created_at",
                    "c.updated_at as critic_updated_at"
                )
                .where({ "r.review_id": updatedReview.review_id })
                .first();
        })
        .then((updatedReviewWithCritic) => {
            return {
                review_id: updatedReviewWithCritic.review_id,
                content: updatedReviewWithCritic.content,
                score: updatedReviewWithCritic.score,
                created_at: updatedReviewWithCritic.review_created_at,
                updated_at: updatedReviewWithCritic.review_updated_at,
                critic_id: updatedReviewWithCritic.critic_id,
                movie_id: updatedReviewWithCritic.movie_id,
                critic: {
                    critic_id: updatedReviewWithCritic.critic_id,
                    preferred_name: updatedReviewWithCritic.preferred_name,
                    surname: updatedReviewWithCritic.surname,
                    organization_name: updatedReviewWithCritic.organization_name,
                    created_at: updatedReviewWithCritic.critic_created_at,
                    updated_at: updatedReviewWithCritic.critic_updated_at,
                },
            };
        });
}

module.exports = {
    destroy,
    update,
    read,
}