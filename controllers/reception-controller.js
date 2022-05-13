//This is not final version of controller

const ReceptionList = require('../models/reception-model')

module.exports.getList = (req, res) => {
  const user_id = req.query.user_id
  List.find({user_id: user_id}).then((result) => {
    res.send(result);
  }).catch((error) => {
    res.send(error);
  });
};

module.exports.createList = (req, res) => {
  const {user_id, name, doctor, date, complaint } = req.body
  res.set('Access-Control-Allow-Origin', '*');
  const list = new List({
    user_id: user_id,
    name: name,
    doctor: doctor,
    date: date,
    complaint: complaint
  });
  list.save().then(result => {
    res.send(result);
  });
};

module.exports.updateList = (req, res) => {
  const {user_id, name, doctor, date, complaint, _id } = req.body
  res.set('Access-Control-Allow-Origin', '*');
  Appoint.updateOne({ _id }, {
    $set: {
      name,
      doctor,
      date,
      complaint
    },
  }).then(result => {
    Appoint.find({user_id}).then((result) => {
      res.send(result);
    });
  });
};

module.exports.deleteList = (req, res) => {
  const id = req.query._id;
  if (id) {
    Appoint.deleteOne({ _id: id }).then(event => {
      Task.find().then((result) => {
      res.send(result);
    }).catch((err) => {
      res.send(err);
    });
    })
  }
};