const express = require('express');
const Comment = require('../Models/Comment');
const router = express.Router();

router.post('/addComment',async (req, res) => {
    try {
        const { plant, comment } = req.body;

        const newComment = new Comment({
            plant : plant,
            commentP : comment
        })

        const savedComment = await newComment.save();
        res.status(200).send({savedComment});
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ error: 'Internal Server Error', message: error.message })
    }
})

router.get('/getAllComments',async (req, res) => {
    let success = true;
    try {
        const comments = await Comment.find();
        res.status(200).send({ success, comments })
    } catch (error) {
        success = false
        console.log(error.message);
        res.status(400).send({ success, error: 'Internal server error' })
    }
})

module.exports = router;