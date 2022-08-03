const clientModel = require("../../db/models/client.model");
const fields = [
  { fieldName: "name", placeholder: "name", value: "", error: "" },
  { fieldName: "email", placeholder: "email", value: "", error: "" },
  {
    fieldName: "accountIntialbalance",
    placeholder: "accountIntialbalance",
    value: "",
    error: "",
  },
  {
    fieldName: "currentBalnce",
    placeholder: "currentBalnce",
    value: "",
    error: "",
  },
  {
    fieldName: "transaction",
    placeholder: "transaction",
    value: "",
    error: "",
  },
];

class client {
  static home = async (req, res) => {
    try {
      const allclients = await clientModel.find();
      res.render("home", {
        pageTitle: "All clients",
        allclients,
        isEmpty: !allclients.length,
      });
    } catch (e) {
      res.send(e.message);
    }
  };
  static addPost = (req, res) => {
    res.render("addPost", { pageTitle: "Add client" });
  };
  static addLogicPost = async (req, res) => {
    try {
      const clientData = new clientModel(req.body);
      await clientData.save();
      res.redirect("/");
    } catch (e) {
      let myErr = {};
      for (const property in e.errors) {
        if (e.errors[property]["properties"])
          myErr[property] = e.errors[property]["properties"].message;
        else myErr[property] = e.errors[property].message;
      }
      res.render("addPost", { myErr });
    }
  };
  static single = async (req, res) => {
    try {
      const result = await clientModel.findById(req.params.id);
      if (result) {
        fields.forEach((field) => (field.value = result[field.fieldName]));
      }
      res.render("single", {
        pageTitle: "Single client",
        result,
        fields,
      });
    } catch (e) {
      res.redirect(e.message);
    }
  };
  static edit = async (req, res) => {
    try {
      const result = await clientModel.findById(req.params.id);
      res.render("edit", {
        pageTitle: "Single client",
        result,
      });
    } catch (e) {
      res.redirect("/dberror");
    }
  };
  static editLogic = async (req, res) => {
    try {
      let clientData = await clientModel.findById(req.params.id);
      for (const property in req.body) {
        clientData[property] = req.body[property];
      }
      await clientData.save();
      res.redirect("/");
    } catch (e) {
      res.send(e.message);
    }
  };
  static del = async (req, res) => {
    try {
      const result = await clientModel.findByIdAndDelete(req.params.id);
      res.redirect("/");
    } catch (e) {
      res.redirect("/dberror");
    }
  };
  static makeTrans = async (req, res) => {
    try {
      res.render("makeTrans");
    } catch (err) {
      res.send(err.message);
    }
  };

  //   withdraw => number <5000 , <currentBalance , add tranaction
  //     add balance => number > 0 , <10000
  static makeTransLogic = async (req, res) => {
    try {
      const UserData = await userModel.findById(req.params.id);
      let statusVal = false;
      if (req.body.type == "add") {
        if (req.body.balance > 0 && req.body.balance < 10000) {
          statusVal = true;
          UserData.currentBalnce =
            UserData.currentBalnce + Number(req.body.balance);
        }
      } else if (req.body.type == "withdraw") {
        if (
          req.body.balance < 5000 &&
          req.body.balance < UserData.currentBalnce
        ) {
          statusVal = true;
          UserData.currentBalnce =
            UserData.currentBalnce - Number(req.body.balance);
        }
      }

      const transVal = {
        date: Date.now(),
        type: req.body.type,
        status: statusVal,
      };
      UserData.transaction.push(transVal);
      await UserData.save();
      res.redirect("/");
    } catch (err) {
      console.log(err.message);
    }
  };
}

module.exports = client;
