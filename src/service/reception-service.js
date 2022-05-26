const jwt = require('jsonwebtoken');
const Receptions = require('../models/reception-model');
const config = require('../../config');

class ReceptionService {
  async getList(token) {
    const findUser = jwt.verify(token, config.jwtAccess);
    const receptionList = Receptions.find({user_id: findUser.id});
    return receptionList;
  }

  async createList(name, doctor, date, complaint, token) {
    const findUser = jwt.verify(token, config.jwtAccess);
    const newList = await Receptions.create({
      name: name,
      doctor: doctor,
      date: date,
      complaint: complaint,
      user_id: findUser.id
    });
    const result = Receptions.find({user_id: findUser.id})
    return result;
  }

  async updateList(id, body, token) {
    const findUser = jwt.verify(token, config.jwtAccess);
    const editList = await Receptions.updateOne({_id: id}, body);
    const result = Receptions.find({user_id: findUser.id});
    return result;
  }

  async deleteList(id, token) {
    const findUser = jwt.verify(token, config.jwtAccess);
    const deleteFunction = await Receptions.deleteOne({_id: id})
    const result = Receptions.find({user_id: findUser.id});
    return result;
  }
}

module.exports = new ReceptionService(); 
