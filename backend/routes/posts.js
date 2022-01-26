const express = require('express');
const Comment = require('../models/Comment');
const Like = require('../models/Like');

const router = express.Router();

const Post = require('../models/Post');


router.get('/', async (req, res) => {
    Post.find()
    .exec(function(error, postsX){
    if(error){
      return res.send(error)
    }
    return res.send({
      posts: [...postsX]
    })
  })
});

router.post('/', async (req, res) => {
    let newPost = new Post({
        creationDate: new Date(),
        ...req.body
      })
    let newLikes = new Like({
        post: newPost._id,
        authors: []

    })
      await newPost.save()
      await newLikes.save()
      return res.send({newPost,newLikes})
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const updatePost = await Post.findByIdAndUpdate(
    {_id: id},
    { ...req.body},
    {new: true}
  )
  return res.send(updatePost)
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try{
      await Post.findByIdAndDelete(id, function(error, response){
        if(error){
          return res.send(error)
        }
        
      })
      await Comment.deleteMany({post: id}, function(error){
        if(error){
          return res.send(error)
        }
      })
      await Like.deleteMany({post: id}, function(error){
        if(error){
          return res.send(error)
        }
      })
      return res.send(id)
    }catch(error){
      return res.send(error)
    }
  });
  



module.exports = router;