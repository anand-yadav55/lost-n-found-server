const routes = require('express').Router();

const lostObject = require('../models/lostObject');
const User = require('../models/user');

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

routes.get('/all', (req, res) => {
  lostObject
    .find({})
    .sort({ _id: -1 })
    .exec((err, data) => {
      if (err) {
        throw new Error('Error in getting all data');
      }
      if (!data) {
        res.send([]);
      }
      res.status(200);
      res.send(data);
    });
});

routes.get('/view-request/:id', (req, res) => {
  lostObject.findOne({ _id: req.params.id }).then((doc) => {
    res.send(doc);
  });
});

routes.post('/create-lost-request', async (req, res) => {
  // const user = await User.findOne({ _id: req.body.userId });
  // if (!user) res.json({ msg: 'authentication tampering occured' });
  const newLostObject = new lostObject({
    name: req.body.name,
    contact: req.body.contact,
    itemLost: req.body.itemLost,
    itemDescription: req.body.itemDescription,
    reportDate: req.body.date,
    lostOrFound: 'lost',
  });
  newLostObject.save((err, data) => {
    if (err) {
      throw new Error('Error detected in finding all blogs');
    }
    res.status(200).send(data);
  });
});
routes.post('/create-found-request', async (req, res) => {
  // const user = await User.findOne({ _id: req.body.userId });
  // if (!user) res.json({ msg: 'authentication tampering occured' });
  const newLostObject = new LostObject({
    name: req.body.name,
    contact: req.body.contact,
    itemLost: req.body.itemLost,
    itemDescription: req.body.itemDescription,
    reportDate: req.body.date,
    lostOrFound: 'found',
  });
  newLostObject.save((err, data) => {
    if (err) {
      throw new Error('Error detected in finding all blogs');
    }
    res.status(200).send(data);
  });
});
module.exports = routes;
