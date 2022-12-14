const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const User = require("../../models/User");
const axios = require("axios");
const { verifyToken } = require("../../middlewares/authenticate");


router.get("/instructors/:id", verifyToken, async (req, res) => {
  try {
    const candidate = await User.findById(req.params.id);
    if (candidate && candidate.userType == "candidate") {
      const instructors = candidate.instructors;
      if (instructors.length > 0) {
        const records = await User.find().where("_id").in(instructors).exec();
        res.status(200).send(records);
      } else {
        res.status(422).send({
          message: "There  is no instructor Appointed by current candidate",
        });
      }
    } else {
      res.status(422).send({ message: "There  is no candidate with this ID" });
    }
  } catch (err) {
    console.log(err);
  }
});



router.get("/:id", verifyToken, async (req, res) => {
  const reader = await User.findById(req.params.id);
  if (reader) {
    res.status(200).send(reader);
  } else {
    res.status(422).send({ message: "There  is no Candidate with this ID" });
  }
});



router.post("/request/instructor/:id", verifyToken, async (req, res) => {
  try {
    let candidate = await User.findById(req.params.id, {
      _id: 1,
      username: 1,
      email: 1,
      instructors: 1,
      img: 1,
    });
    let instructor = await User.findById(req.body.instructorId, {
      _id: 1,
      username: 1,
      email: 1,
      instructorCustomers: 1,
      img: 1,
    });
    if (candidate && instructor) {
      var check = 0;
      await candidate.instructors.forEach((value, index) => {
        if (value.id == instructor.id) {
          check = 1;
          return;
        }
      });

      await instructor.instructorCustomers.forEach((value, index) => {
        if (value.id == candidate.id) {
          check = 2;
          return;
        }
      });
      if (check === 1) {
        return res.status(422).json({
          message: "This instructor is already Appointed by current candidate",
        });
      } else if (check === 2) {
        return res.status(422).json({
          message: "This Customer is already in contact with current instructor",
        });
      }

      const object = {
        candidateId: req.params.id,
        username: candidate.username,
        email: candidate.email,
        img: candidate.img,
        data: req.body.data,
      };

      candidate.instructors.push(instructor.id);
      instructor.instructorCustomers.push(object);
      await instructor.save();
      await candidate.save();

      const response = await axios.post(
        "http://localhost:3000/api/checkout/payment",
        {
          tokenId: req.body.tokenId,
          amount: req.body.amount,
        }
      );
      return res
        .status(200)
        .json({ candidate: candidate, instructor: instructor, Response: response });
    } else {
      return res
        .status(422)
        .json({ message: "candidate or instructor Id is incorrect" });
    }
  } catch (err) {
    return res.status(500).json({ Message: err.message });
  }
});


module.exports = router;
