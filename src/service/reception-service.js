const Receptions = require("../models/reception-model");

class ReceptionService {
  async getList(id) {
    const receptionList = Receptions.find({
      user_id: id,
    });
    return receptionList;
  }

  async createList(name, doctor, date, complaint, id) {
    const newList = await Receptions.create({
      name: name,
      doctor: doctor,
      date: date,
      complaint: complaint,
      user_id: id,
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