const express = require("express");
const router = express.Router();
const Test = require("../../models/Test");
const { verifyToken } = require("../../middlewares/authenticate");

router.get("/", async (req, res) => {
  try {
    let test = await Test.find();
    if (test.length > 0) {
      res.status(200).send(test);
    } else {
      res.status(200).send({ message: "There is no test" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let test = await Test.findById(id);
    if (test) {
      res.status(200).send(test);
    } else {
      res.status(400).send({ message: "There is no test with this id." });
    }
    res.send(test);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedTest = await Test.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (updatedTest) {
      res.status(200).send(updatedTest);
    } else {
      res.status(400).send({ message: "There is no Test with this id." });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", async function (req, res) {
  try {
    let id = req.params.id;
    let test = await Test.findByIdAndDelete(id);
    if (!test) {
      res.status(404).send({ message: "This test is not available" });
    }
    return res.send(test);
  } catch (err) {
    return res.status(404).send({ message: "Id is not a valid" });
  }
});

router.post("/", async (req, res) => {
  try {
    let test = new Test(req.body);
    await test.save();
    return res.status(200).send(test);
  } catch (err) {
    return res.status(500).send({ message: "This Test is invalid" });
  }
});

module.exports = router;
