const reviewService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//Middleware functions
async function reviewExists(req, res, next) {
    const reviewFound = await reviewService.read(req.params.reviewId);
    if (reviewFound) {
        res.locals.review = reviewFound;
        return next();
    }
    next({
        status: 404,
        message: "Review cannot be found.",
    });
};

function hasData(dataProperty) {

}

//Endpoint functions

//Diag. function
// function read(req, res) {
//     const data = res.locals.review;
//     res.json({ data: data });
// };

async function destroy(req, res) {
    const review = await reviewService.destroy(res.locals.review.review_id);
    res.sendStatus(204);
};

async function update(req, res) {
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
        review_id: res.locals.review.review_id,
    };
    const data = await reviewService.update(updatedReview);
    res.json({ data: data});
};


module.exports = {
    //read: [asyncErrorBoundary(reviewExists), read],
    delete: [
        asyncErrorBoundary(reviewExists), 
        asyncErrorBoundary(destroy)
    ],
    update: [
        asyncErrorBoundary(reviewExists), 
        asyncErrorBoundary(update),
    ],
};