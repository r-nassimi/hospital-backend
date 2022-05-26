//createList is working

const ReceptionService = require('../../service/reception-service');

class ReceptionController {
  async getList(req, res, next) {
    try {
      const list = await ReceptionService.getList();
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
      const updatingList = await ReceptionService.updateList(body);
      if(updatingList) {
        const refresh = await ReceptionService.getList(id);
        return res.send(refresh);
      }
    } catch (e) {
      next(e);
    }
  }

  async deleteList(req, res, next) {
    try {
      const id = req.body._id;
      if (id) {
        await ReceptionService.deleteOne({ _id: id });  
      }
      await ReceptionService.find({ id });
        res.send("Deleted");
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ReceptionController();