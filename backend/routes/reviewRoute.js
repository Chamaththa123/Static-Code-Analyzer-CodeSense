import express from "express";
import Review from "../models/reviewModel.js"

const router = express.Router();

router.post('/review/add', async (req, res) => {

    const name = req.body.name;
    const rating = req.body.rating;
    const comment = req.body.comment;
    const date = req.body.date;

    const newReview = new Review({
        name, rating, comment, date
    })

    newReview.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err.message
            });
        }
        return res.status(200).json({
            success: "review added successfully"
        });
    });

});

router.route("/AllReview").get((req, res) => {
    Review.find().then((review) => {
        res.json(review)
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/ReviewCount").get((req, res) => {
    Review.find().count().then((review) => {
        res.json(review)
    }).catch((err) => {
        console.log(err);
    })
})

router.route(`/5reviewscount`).get((req, res) => {

    Review.find({ rating: 5 }).count().then((review) => {
        res.json(review)

    }).catch((err) => {
        console.log(err);
    })
});

router.route(`/4reviewscount`).get((req, res) => {

    Review.find({ rating: 4 }).count().then((review) => {
        res.json(review)

    }).catch((err) => {
        console.log(err);
    })
});

router.route(`/3reviewscount`).get((req, res) => {

    Review.find({ rating: 3 }).count().then((review) => {
        res.json(review)

    }).catch((err) => {
        console.log(err);
    })
});


router.route(`/2reviewscount`).get((req, res) => {

    Review.find({ rating: 2 }).count().then((review) => {
        res.json(review)

    }).catch((err) => {
        console.log(err);
    })
});

router.route(`/1reviewscount`).get((req, res) => {

    Review.find({ rating: 1 }).count().then((review) => {
        res.json(review)

    }).catch((err) => {
        console.log(err);
    })
});



export default router;