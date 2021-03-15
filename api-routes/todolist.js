const express = require("express")
var Router = express.Router();
const bodyparser = require("body-parser")
const mongoose = require("mongoose")
const _ = require("lodash")

const itemSchema = {
  name: String
};

const listSchema = {
  name: String,
  items: [itemSchema]
};

const List = mongoose.model("List", listSchema);
const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
  name: "Buy Food"
});
const item2 = new Item({
  name: "Cook Food"
});
const item3 = new Item({
  name: "Eat Food"
});

const defaultItems = [item1, item2, item3];

Router.use(bodyparser.urlencoded({
  extended: true
}));


Router.get("/", function(req, res) {
  if (req.isAuthenticated()) {
    res.redirect("/account/todolist/" + req.user.id);
  } else {
    res.redirect("/account/login");
  }
});

Router.get("/:customListName", function(req, res) {

  if (req.isAuthenticated()) {
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({
      name: customListName
    }, function(err, foundList) {
      if (!err) {
        if (!foundList) {
          const list = new List({
            name: customListName,
            items: defaultItems
          });
          list.save();
          res.redirect("/account/todolist/" + customListName)
        } else {
          res.render("pages/list", {
            ListTitle: foundList.name,
            newListItems: foundList.items
          });
        }
      }
    })
  } else {
    res.redirect("/account/login");
  }
});

Router.post("/", function(req, res) {
  if (req.isAuthenticated()) {
    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({
      name: itemName
    });

    List.findOne({
      name: listName
    }, function(err, foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/account/todolist/" + listName);
    })
  } else {
    res.redirect("/account/login");
  }
});

Router.post("/delete", function(req, res) {

  if (req.isAuthenticated()) {
    const listName = req.body.listName;
    const checkedItemId = req.body.checkbox;
    List.findOneAndUpdate({
      name: listName
    }, {
      $pull: {
        items: {
          _id: checkedItemId
        }
      }
    }, function(err, foundList) {
      if (!err) {
        res.redirect("/account/todolist/" + listName);
      }
    })
  } else {
    res.redirect("/account/login");
  }
});

module.exports = Router;
