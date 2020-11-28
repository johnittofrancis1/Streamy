const router = require('express').Router(),
    Stream = require("../models/Stream");

router.post("/new", (req, res) => {
    const newStream = req.body;
    Stream.create(newStream, (err, createdStream) => {
        if (err)
            res.sendStatus(500);
        else    
            res.status(201).json(createdStream);
    });
});

router.get("/", (req, res) => {
    Stream.find({}).populate('user', 'name').exec((err, allStreams) => {
        if (err)
            res.sendStatus(500);
        else
            res.json(allStreams);
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Stream.findOne({_id: id}).populate('user', 'name').exec((err, foundStream) => {
        if (err)
            res.sendStatus(500);
        else if (!foundStream)
            res.sendStatus(404);
        else    
            res.status(200).json(foundStream);
    })
});

router.patch('/:id', (req, res) => {
    const id = req.params.id;
    const updateContent = req.body;
    Stream.findByIdAndUpdate(id, updateContent, (err, updatedStream) => {
        if (err)
        {
            console.log(err);
            res.sendStatus(500);
        }
        else if (!updatedStream)
            res.sendStatus(404);
        else
            res.status(200).json(updatedStream);
    });
});

router.delete('/:id', (req, res) => {
    Stream.findOneAndRemove({_id: req.params.id}, (err, removedStream) => {
        if (err)
            res.sendStatus(500);
        else if (! removedStream)
            res.sendStatus(404);
        else
            res.sendStatus(204);
    });
});

module.exports = router;
