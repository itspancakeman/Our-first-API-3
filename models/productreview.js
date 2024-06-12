//collin --

const mongoose = require('mongoose');

const productReviewSchema = new mongoose.Schema({
    title: {type: String, required: true},
    postedBy: {type: String, required: true},
    ownership: {type: String, required: true},
    verifiedOwner: {type: Boolean, required: true},
    postedWhen: {type: Date, required: true},
    pros: {type: String, required: true},
    cons: {type: String, required: true},
    overallReview: {type: String, required: true},
    relatedImaged: {type: File, required: false},
    likes: {type: Number, required: true},
    dislikes: {type: Number, required: true}
});

const ProductReview = mongoose.model('ProductReview', productReviewSchema);

module.exports = ProductReview;

//collin --