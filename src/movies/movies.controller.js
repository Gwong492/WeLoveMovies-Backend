const movieService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//Middleware functions
function hasData(req, res, next) {
    
}

async function movieExists(req, res, next) {
    const movieFound = await movieService.read(req.params.movieId);
    if (movieFound) {
        res.locals.movie = movieFound;
        return next();
    }
    next({
        status: 404,
        message: `Movie not found with id: ${req.params.movieId}`
    });
    
};

async function moviesTheatersExist(req, res, next) {
    const moviesTheatersFound = await movieService.readTheater(req.params.movieId);
    if (moviesTheatersFound) {
        res.locals.movieTheater = moviesTheatersFound;
        return next();
    }
    next({
        status: 404,
        message: `Theaters not found for id: ${req.params.movieId}`
    });  
};

async function reviewExits(req, res, next) {
    const reviewFound = await movieService.readReviewsCritics(req.params.movieId);
    if (reviewFound) {
        res.locals.review = reviewFound;
        return next();
    }
    next({
        status: 404,
        message: `Review not found with id: ${req.params.movieId}`
    });
};

//Endpoint functions
async function list(req, res) {
    const is_showing = req.query.is_showing;
    const data = await movieService.list(is_showing)
    res.json({ data: data });
};

function read(req, res) {
    const movie = res.locals.movie;
    res.json({ data: movie });
}

function readTheater(req, res) {
    const movies = res.locals.movieTheater;
    res.json({ data: movies })
}

function readReviews(req, res, next) {
    const review = res.locals.review;
    res.json({ data: review });
};

//Exports
module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), read],
    readTheater: [asyncErrorBoundary(moviesTheatersExist), readTheater],
    readReviews: [asyncErrorBoundary(reviewExits), readReviews],
};