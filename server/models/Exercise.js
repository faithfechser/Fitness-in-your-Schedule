const { Schema, model } = require("mongoose");

const exerciseSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        maxlength: 25,
    },
    duration: {
        type: Number,
        required: true,
    },
    distance: {
        type: Number,
        required: true,
    },
    sets: {
        type: Number,
        required: false,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

});

const Exercise = model('Exercise', exerciseSchema);

module.exports = Exercise;