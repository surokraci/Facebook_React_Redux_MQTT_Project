const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

router.get('/', async (req, res) => {
  User.find()
  .exec(function(error, usersX){
    if(error){
      return res.send(error)
    }
    return res.send({
      users: [...usersX]
    })
  })
});

router.post('/', async (req, res) => {
  let newUser = new User({
    registrationDate: new Date(),
    ...req.body
  })
  newUser.save()
  console.log(newUser._id);
  res.send(newUser)
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const updateUser = await User.findByIdAndUpdate(
    {_id: id},
    { ...req.body},
    {new: true}
  )
  return res.send(updateUser)
    
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  try{
    await User.deleteOne({login: id}, function(error, response){
      if(error){
        return res.send(error)
      }
    })
    await Post.deleteMany({author: id}, function(error){
      if(error){
        return res.send(error)
      }
    })
    await Comment.deleteMany({author: id}, function(error){
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
