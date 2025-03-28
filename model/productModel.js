const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    author: {
        type: String,
        require: true
    },
    article: {
        type: String,
        require: true
    },
    comment: {
        type: String,
        require: true
    },

})

const blogModel = mongoose.model('product', blogSchema);

module.exports = blogModel;