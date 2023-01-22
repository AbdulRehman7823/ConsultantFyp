const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middlewares/authenticate");
const User = require("../../models/User");
const Test = require("../../models/Test");
const CryptoJS = require("crypto-js");

router.get("/candidates/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const instructor = await User.findById(req.params.id);

    if (instructor && instructor.userType == "instructor") {
      const candidates = instructor.instructorCustomers;
      console.log(candidates);
      if (candidates.length > 0) {
        res.status(200).send(candidates);
      } else {
        res.status(200).send([]);
      }
    } else {
      res.status(422).send({ message: "There  is no instructor with this ID" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "There is some Error " + err.message });
  }
});

router.get("/acceptedCandidate/:id", verifyToken, async (req, res) => {
  try {
    const instructor = await User.findById(req.params.id);
    if (instructor && instructor.userType == "instructor") {
      const candidate = instructor.instructorAccepts;
      console.log(candidate);
      if (candidate.length > 0) {
        const records = await User.find().where("_id").in(candidate).exec();
        console.log(records);
        res.status(200).send(records);
      } else {
        res.status(200).send([]);
      }
    } else {
      res.status(422).send({ message: "There  is no instructor with this ID" });
    }
  } catch (err) {
    console.log(err);
    res.status(422).send({ message: "There is some Error " + err.message });
  }
});

router.post("/accept/:id", verifyToken, async (req, res) => {
  try {
    const instructor = await User.findById(req.params.id);
    const candidateId = req.body;

    let isExist = false;
    const instructorCustomers = instructor.instructorCustomers;
    await instructorCustomers.map((value) => {
      if (value.id == candidateId._id) {
        isExist = true;
        return;
      }
    });

    if (!isExist) {
      return res.status(422).send({
        message:
          "There is no Request From given candidate to current instructor",
      });
    } else if (instructor && instructor.userType == "instructor") {
      const candidates = instructor.instructorAccepts;

      candidates.push(candidateId);
      await User.findByIdAndUpdate(candidateId, {
        $pull: { instructors: { _id: req.params.id } },
      }).exec();
      await User.findByIdAndUpdate(instructor, {
        $pull: { instructorCustomers: { _id: candidateId._id } },
      }).exec();

      instructor.instructorAccepts = candidates;
      await instructor.save();
      res.status(200).send(instructor);
    } else {
      res.status(422).send({ message: "There  is no instructor with this ID" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "There is some Error " + err.message });
  }
});



router.put("/:id", async (req, res) => {
  try {
    const instructor = await User.findById(req.params.id);
    if (instructor) {
      (req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString()),
        Object.assign(instructor, req.body);
      await instructor.save();
      res.status(200).send(instructor);
    } else {
      res.status(422).send({ message: "There  is no instructor with this ID." });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const instructor = await User.findById(req.params.id);
    if (instructor) {
      instructor.password = CryptoJS.AES.decrypt(
        instructor.password,
        process.env.PASS_SEC
      ).toString(CryptoJS.enc.Utf8);
      res.status(200).send(instructor);
    } else {
      res.status(422).send({ message: "There  is no instructor with this ID." });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//get all tests

router.get("/tests/:id", async (req, res) => {
  const instructorId = req.params.id;
  const tests = await Test.find({ instructorId: instructorId });

  if (tests.length > 0) {
    res.status(200).send(tests);
  } else {
    res.status(422).send({ message: "There  is no tests with this Poet" });
  }
});

module.exports = router;
