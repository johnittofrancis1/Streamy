const express = require("express"),
    mongoose = require("mongoose"),
    path = require('path'),
    cookieParser = require("cookie-parser"),
    dotenv = require('dotenv');

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());

const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/local";
const PORT = process.env.SERVER_PORT || 5000;


mongoose.connect("mongodb://localhost:27017/local", { useUnifiedTopology: true, useNewUrlParser: true }, () => console.log("MongoDB connected"));

app.get("/api", (req, res) => {
    res.send("REST API for Live Streams");
});

app.use("/api/streams", require('./routes/streams'));
app.use("/api/users", require('./routes/users'));


// app.use(express.static(path.join(__dirname, '/client/build')));

// app.get('*', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
//     res.sendFile(path.join(__dirname, '/client/build/index.html'));
// });


app.listen(PORT, () => console.log(`The server is running on http://localhost:${PORT}`));