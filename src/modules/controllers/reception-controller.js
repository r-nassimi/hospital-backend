const {validationResult} = require('express-validator');
const ReceptionService = require("../../service/reception-service");

class ReceptionController {
  async getList(req, res, next) {
    try {
      const {accessToken} = req.cookies;
      const list = await ReceptionService.getList(accessToken);
      return res.send(list);
    } catch (e) {
      next(e);
    };
  };

  async createList(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({error: {message: errors.array()[0].msg}})
      };
      const {accessToken} = req.cookies;
      const { name, doctor, date, complaint } = req.body;
      const list = new Receptions({
        name,
        doctor,
        date,
        complaint,
        accessToken
      });
      return res.send(list);
    } catch (e) {
      next(e);
    };
  };

  async updateList(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({error: {message: errors.array()[0].msg}})
      };
      const {accessToken} = req.cookies;
      const id = req.query._id;
      const updating = await ReceptionService.updateList(
        id,
        req.body,
        accessToken
      );
      return res.send(updating);
    } catch (e) {
      next(e);
    }
  }

  async deleteList(req, res, next) {
    try {
      const id = req.query._id;
        await ReceptionService.deleteOne({ _id: id });
      res.send("Deleted");
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ReceptionController();
