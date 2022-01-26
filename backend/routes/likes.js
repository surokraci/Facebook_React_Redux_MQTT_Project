const express = require('express');
const router = express.Router();


const Like = require('../models/Like');


router.get('/', async (req, res) => {
    Like.find()
    .exec(function(error, likesX){
    if(error){
      return res.send(error)
    }
    return res.send({
      likes: [...likesX]
    })
  })
});


router.put('/like/:id', async (req, res) => {
    const id = req.params.id;
    const author = req.body.author
    const updateLike = await Like.findOneAndUpdate(
    {_id: id},
    {
        $push: {
            authors: author
        }
    },
    {new: true}
  )
  return res.send(updateLike)
});

router.put('/dislike/:id', async (req, res) => {
    const id = req.params.id;
    const author = req.body.author
    const updateLike = await Like.findByIdAndUpdate(
    id,
    {$pull: {authors: author}},
    {new: true}
  )
  return res.send(updateLike)
});



module.exports = router;