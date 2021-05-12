const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const { Workout } = require("./models");
const db = require("./models");

const PORT = process.env.PORT || 3334;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).catch((err) => console.log(err));

//html route for main page
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, "./public/index.html"))});
//html route for stats page
app.get('/stats', (req, res) => { res.sendFile(path.join(__dirname, "./public/stats.html"))});
//html route for exercise page
app.get('/exercise', (req, res) => { res.sendFile(path.join(__dirname, "./public/exercise.html"))});
 

app.put('/api/workouts/:id', ({ body, params }, res) => {
    Workout.findByIdAndUpdate(params.id, { $push: { exercises: body } }, { new: true, runValidators: true }).then((response) => {
        res.json(response)
    })

});

app.get("/api/workouts", (req, res) => {
    Workout.aggregate([{ $addFields: { totalDuration: { $sum: "$exercises.duration" } } }])
        .then((response) => {
            res.json(response);
        })

});

app.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

//route for range
app.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([{ $addFields: { totalDuration: { $sum: "$exercises.duration" } } }])
        .then((response) => {
            res.json(response);
        })
});

app.listen(PORT, () => {
    console.log(`App is running on: ${PORT}`)
});

