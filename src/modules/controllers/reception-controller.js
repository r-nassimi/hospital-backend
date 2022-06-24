const ReceptionService = require("../../service/reception-service");

class ReceptionController {
  async getList(req, res, next) {
    try {
      const list = await ReceptionService.getList(req.userId);
      return res.send(list);
    } catch (e) {
      next(e);
    }
  }

  async createList(req, res, next) {
    try {
      const { name, doctor, date, complaint } = req.body;
      const list = await ReceptionService.createList(
        name,
        doctor,
        date,
        complaint,
        req.userId
      );
      return res.send(list);
    } catch (e) {
      next(e);
    }
  }

  async updateList(req, res, next) {
    try {
      const { accesstoken } = req.headers;
      const updating = await ReceptionService.updateList(
        req.body,
        accesstoken
      );
      return res.send(updating);
    } catch (e) {
      next(e);
    }
  }

  async deleteList(req, res, next) {
    try {
      const listID = req.query._id;
      const deleting = await ReceptionService.deleteList(listID);
      res.send("Deleted!");
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ReceptionController();