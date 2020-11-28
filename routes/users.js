const router = require('express').Router(),
    User = require("../models/User"),
    { signToken, verifyToken } = require("../serverAuth");

router.post("/new", (req, res) => {
    User.create(req.body, (err, createdUser) => {
        if(err) 
        {
            return res.json({success: false, message: err, code: err.code});
        }
        const token = signToken(createdUser);
        res.cookie("authToken", token, {
            expires: new Date(Date.now() + 30 * 60 * 1000)
        }).json({success: true, message: "Registered Succesfully", token});
    })
});

router.post("/authenticate", (req, res) => {
    // check if the user exists
    User.findOne({email: req.body.email}, (err, user) => {
        // if there's no user or the password is invalid
        if(!user) {
            // deny access
            return res.json({success: false, message: "Invalid Username"})
        }
        if (user.validPassword(req.body.password))
        {
            const token = signToken(user);
            res.cookie("authToken", token, {
                expires: new Date(Date.now() + 30 * 60 * 1000)
            }).json({success: true, message: "Token attached", token});
        }
        else
        {
            // deny access
            return res.json({success: false, message: "Password is not correct"})
        }
    });
});

router.use(verifyToken);

router.get("/", (req, res) => {
    User.find({}, (err, users) => {
        if (err)
            return res.json({success: false, code: err.code});
        res.json(users)
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    User.findById(id, (err, user) => {
        if(err) 
            return res.json({success: false, code: err.code});
        res.json(user);
    })
});

router.patch('/:id', (req, res) => {
    const id = req.params.id;
    const updateContent = req.body;
    User.findById(req.params.id, (err, user) => {
        if(err) 
            return res.json({success: false, code: err.code});
        Object.assign(user, req.body)
        user.save((err, updatedUser) => {
            if(err) 
                return res.json({success: false, code: err.code});
            res.json({success: true, message: "User updated.", updatedUser})
        })
    })
});

router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if(err) 
            return res.json({success: false, code: err.code});
        res.json({success: true, message: "User deleted.", user})
    })
});

module.exports = router;
