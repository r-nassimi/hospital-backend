const ReceptionService = require("../../service/reception-service");

//WIP
class ReceptionController {
  async getList(req, res, next) {
    try {
      const id = req.body.user_id;
      const list = await ReceptionService.find(id);
      res.send(list);
    } catch (e) {
      next(e);
    }
  }

  async createList(req, res, next) {
    try {
      const { name, doctor, date, complaint } = req.body;
      const list = await new ReceptionService({
        name,
        doctor,
        date,
        complaint,
      });
      res.send(list);
    } catch (e) {
      next(e);
    }
  }

  async updateList(req, res, next) {
    try {
      const { user_id, name, doctor, date, complaint, _id } =
        req.body;
      const updateList = await Reception.updateOne(
        { _id },

        {
          $set: {
            name,
            doctor,
            date,
            complaint,
          },
        }
      );
      await Reception.find({ user_id });
      res.send(updateList);
    } catch (e) {
      next(e);
    }
  }

  async deleteList(req, res, next) {
    try {
      const id = req.body._id;
      if (id) {
        await Reception.deleteOne({ _id: id });  
      }
      await Reception.find({ id });
        res.send("Deleted");
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ReceptionController();
