const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const db = require("./models");

const PORT = process.env.PORT || 3333;

const app = express();

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).catch((err) => console.log(err));

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get('/', (req, res) => { res.sendFile(path.join(__dirname, "./public/index.html"))});
app.get('/exercise', (req, res) => { res.sendFile(path.join(__dirname, "./public/stats.html"))});
app.get('/stats', (req, res) => { res.sendFile(path.join(__dirname, "./public/exercise.html"))});



app.listen(PORT, () => {
    console.log(`App is running on: ${PORT}`)
});

