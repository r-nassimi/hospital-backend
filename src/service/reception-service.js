const Reception = require("../models/reception-model");

//WIP
class ReceptionService {
  async getList(_id) {
    const userList = await Reception.findOne({ user_id: _id });
    return userList;
  }

  async createList(user_id, name, doctor, date, complaint ){
    const list = await Reception.create({
      user_id,
      name,
      doctor,
      date,
      complaint
    });
    return list;
  }

  async updateList(_id, name, doctor, date, complaint) {
    const updatingList = {$set}
  }
}

module.exports = new ReceptionService();
