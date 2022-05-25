//createList is working

const ReceptionService = require('../../service/reception-service');

class ReceptionController {
  async getList(req, res, next) {
    try {
      const { id } = req.user;
      const list = await ReceptionService.getList(id);
      return res.send(list);
    } catch (e) {
      next(e);
    }
  }

  async createList(req, res, next) {
    try {
      const list = await ReceptionService.createList(req.body);
      return res.send(list);
    } catch (e) {
      next(e);
    }
  }

  async updateList(req, res, next) {
    try {
      const updatingList = await ReceptionService.updateList(req.body);
      if(updatingList) {
        const refresh = await ReceptionService.getList(req.user.id);
        return res.send(refresh);
      }
    } catch (e) {
      next(e);
    }
  }

  async deleteList(req, res, next) {
    try {
      const result = await ReceptionService.deleteList(req.body.id, req.user.id);
        res.send("Deleted");
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ReceptionController();
