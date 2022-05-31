const jwt = require("jsonwebtoken");
const Receptions = require("../models/reception-model");
const config = require("../../config");

class ReceptionService {
  async getList(token) {
    const findUser = jwt.verify(token, config.jwtAccess);
    const receptionList = Receptions.find({
      user_id: findUser.id,
    });
    return receptionList;
  }

  async createList(name, doctor, date, complaint, token) {
    const findUser = jwt.verify(token, config.jwtAccess);
    const newList = await Receptions.create({
      name: name,
      doctor: doctor,
      date: date,
      complaint: complaint,
      user_id: findUser.id,
    });
    return newList;
  }

  async updateList(body) {
    const { _id } = body;
    const editList = await Receptions.findOneAndUpdate(
      { _id: _id },
      body
    );
    return editList;
  }

  async deleteList(_id) {
    const deleting = await Receptions.deleteOne({ _id });
    return true;
  }
}

module.exports = new ReceptionService();