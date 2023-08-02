const { Schema } = require("mongoose");

const exerciseSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: false,
    },
    reps: {
        type: Number,
        required: false,
    },
    sets: {
        type: Number,
        required: false,
    },

});

module.exports = exerciseSchema;