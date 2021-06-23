const express  = require('express');
const mongoose = require('mongoose'),
      ObjectId = mongoose.Types.ObjectId;

const room     = require('./models/roomModel');

const isAuthed = require('./passport/isUserAuthed');

const roomRouter = express.Router();

roomRouter.get('/', isAuthed, (req, res) => {
   console.log('Inside get room')
    let query = {};

    room.find(query, (err, rooms) => {
      if(err) res.status(5008).send(err);
      else res.json(rooms);
    });
});

roomRouter.get('/:id', isAuthed, (req, res) => {
    const roomId = ObjectId(req.params.id);
    room.findById(roomId, (err, room) => {
      if(err) res.status(500).send(err);
      if(!room) res.status(404).send('Room not found.');
      res.status(200).json(room);
    });
});

module.exports = roomRouter;
