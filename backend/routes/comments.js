const express = require('express');
const router = express.Router();

const Comment = require('../models/Comment');

router.get('/', async (req, res) => {
    return res.send({
        allUsers: []
      });
});

router.post('/', async (req, res) => {
    return res.send(req.body);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    return res.send({
      putUserId: id
    });
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  return res.send({
    deletedUserId: id
  });
});



module.exports = router;