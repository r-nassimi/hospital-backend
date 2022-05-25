//This is not final version of service

const Receptions = require('../models/reception-model');

class ReceptionService {
  async getList(user) {
    const receptionList = await Receptions.find({ user: user_id });
    return receptionList;
  }

  async createList(body) {
    const { name, doctor, date, complaint, user } = body;
    const list = await Receptions.create({
      user,
      name,
      doctor,
      date,
      complaint,
    });
    return list;
  }

  async updateList(body) {
    const {name, doctor, date, complaint, user } = body;
    const updateFunction = Receptions.findOneAndUpdate({
      $set: {
        user,
        name,
        doctor,
        date,
        complaint
      },
    });
    return updateFunction;
  }

  async deleteList(id, user) {
    await Receptions.deleteOne({ _id: id });
    return this.getList(user);
  }
}

module.exports = new ReceptionService();