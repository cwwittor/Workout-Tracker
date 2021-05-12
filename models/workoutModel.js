const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema for the workout, seperated with a date and exercise
const WkSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String,
                required: true,
                trim: true
            },
            name: {
                type: String,
                required: true,
                trim: true
            },
            duration: {
                type: Number,
                required: true
            },
            weight: {
                type: Number
            },
            reps: {
                type: Number
            },
            sets: {
                type: Number
            },
            disctance: {
                type: Number
            },
        }
    ]
    
})

const Workout = mongoose.model("Workout", WkSchema);
module.exports = Workout;