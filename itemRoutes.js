/** all routes for /items */

const express = require("express");

// const db = require("./fakeDb");
const router = new express.Router();
let { items } = require("./fakeDb");

/**return list of shopping items */
router.get("/", function (req, res) {

  return res.json({
    "items": items
  });
});

/**add item to array and show added item */
router.post("/", function (req, res) {
  console.log("body is ", req.body);
  let item = {
    "name": req.body.name,
    "price": req.body.price
  };
  items.push(item);

  return res.json({
    "added": item
  });
});

/** return single item */
router.get("/:name", function (req, res) {
  const name = req.params.name;
  let returnItem = undefined;

  for (const obj of items) {
    if (obj.name === name) {
      returnItem = obj;
      break;
    }
  }
  return res.json(returnItem);
});

/** modify and show modified item */
router.patch("/:name", function (req, res) {
  let newName = req.body.name;
  let newPrice = req.body.price;
  let currentName = req.params.name;

  for (let obj of items) {
    if (obj.name === currentName) {
      obj.name = newName;
      obj.price = newPrice;
      return res.json({
        "Updated": {...obj}
      });
    }
  }
});

/** deletes item and returns a message of deleted */
router.delete("/:name", function (req, res) {
  let deleteName = req.params.name;
  for (let obj of items) {
    if (obj.name === deleteName) {
      delete obj.name;
      delete obj.price;
      obj = null;
      break;
    }
  }

  return res.json({ "message": "Deleted"});
});


module.exports = router;