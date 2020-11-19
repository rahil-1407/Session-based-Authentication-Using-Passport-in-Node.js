const mongoose = require('mongoose');

//Schema of  URL and its Content
const urlschema = new mongoose.Schema(
{
    url: {
        type: Object,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});

module.exports = new mongoose.model('htmlcode', urlschema);