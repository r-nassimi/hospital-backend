//This is not final version of service

const Receptions = require('../models/reception-model');

class ReceptionService {
  async getList(id) {
    const receptionList = await Receptions.find({user: id});
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

  async updateList(id, name, doctor, date, complaint) {
    const identificator = {_id: id};
    const updating = {
      $set: {
        user,
        name,
        doctor,
        date,
        complaint
      },
    };
    return await ReceptionService.updateOne(identificator, updating);
  }

  async deleteList(id, user) {
    await Receptions.deleteOne({ _id: id });
    const result = await this.getList(user);
    return result;
  }
}

module.exports = new ReceptionService();