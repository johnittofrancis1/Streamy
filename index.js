const express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/local", { useUnifiedTopology: true, useNewUrlParser: true }, () => console.log("MongoDB connected"));

const PORT = 5000;
const stream_schema = new mongoose.Schema(
    {
        id: Number,
        title: String,
        description: String,
        userId: String,
    }
);

const Stream = mongoose.model("Stream", stream_schema);

app.get("/api/", (req, res) => {
    res.send("REST API for Live Streams");
});

app.post("/api/stream/new", (req, res) => {
    const newStream = req.body;
    Stream.create(newStream, (err, createdStream) => {
        if (err)
            res.sendStatus(500);
        else    
            res.status(201).json(createdStream);
    })
});

app.get("/api/streams", (req, res) => {
    Stream.find({}, (err, allStreams) => {
        if (err)
            res.sendStatus(500);
        else
            res.json(allStreams);
    })
})

app.get('/api/stream/:id', (req, res) => {
    const id = req.params.id;
    Stream.findOne({id}, (err, foundStream) => {
        if (err)
            ress.sendStatus(500);
        else if (!foundStream)
            res.sendStatus(404);
        else    
            res.status(200).json(foundStream);
    })
});

app.patch('/api/stream/:id', (req, res) => {
    const id = req.params.id;
    const updateContent = req.body;
    Stream.findOneAndUpdate({id}, updateContent, (err, updatedStream) => {
        if (err)
            res.sendStatus(500);
        else if (!updatedStream)
            res.sendStatus(404);
        else
            res.status(200).json(updatedStream);
    });
});

app.delete('/api/stream/:id', (req, res) => {
    const id = req.params.id;
    Stream.findOneAndRemove({id}, (err, removedStream) => {
        if (err)
            res.sendStatus(500);
        else if (! removedStream)
            res.sendStatus(404);
        else
            res.sendStatus(204);
    });
});

app.listen(PORT, () => console.log(`The server is running on http://localhost:${PORT}`));
