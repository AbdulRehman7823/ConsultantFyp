const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Test = require("../../models/Test")
const jwt = require('jsonwebtoken')

router.post('/login',async (req, res)=>{
  try{
    if(process.env.admin_username == req.body.username && process.env.admin_password == req.body.password){
       const token = jwt.sign({username: req.body.username,
                                password: req.body.password,
                                isAdmin :true},process.env.ADMIN_SEC)
      return res.status(200).json({accessToken:token});
    }else{
      return res.status(422).send({message:"Username or password incorrect"});
    }
  }catch(err){
      return res.status(500).send({message:"This product is invalid"});
  }
})

router.get("/instructors", async (req, res) => {
  try {
    let instructors = await User.find({userType:"instructor"},{username:1,email:1,img:1,userType:1,document:1,subscriptionfee:1});
    if (instructors.length > 0) {
      res.status(200).send(instructors);
    } else {
      res.status(200).send([]);
    }
  } catch (error) {
    res.status(422).send(error.message);
  }
});




router.get("/candidates",async (req, res) => {
  try {
    let candidates = await User.find({userType:"candidate"},{username:1,email:1,img:1,scores:1});
    if (candidates.length > 0) {
      res.status(200).send(candidates);
    } else {
      res.status(200).send([]);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/user/:id",  async (req, res) => {
  try {
    let user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      res.status(200).send({ message: "user deleted successfully" });
    } else {
      res.status(200).send({ message: "user is not available" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

  router.get('/tests', async (req, res) => { 
    try{
    let test = await Test.find();
    if(test.length == 0){
      return res.status(200).send([])
    }else
    res.status(200).send(test);
    }catch(e){
      res.status(400).send({message: e.message});
    }
});

router.get('/tests/:id', async (req, res) => {
  try{
    let id =  req.params.id;
    let test  = await Test.findById(id);
    if(test){
        res.status(200).send(test);
    }else{
      res.status(200).send("Test with this id is not found");
    }
  }catch(e){
    res.status(400).send({message: e.message});
  }
});


router.put("/tests/:id",  async (req, res) => {
  try {
    const updatedTest = await Test.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedTest);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


router.delete("/tests/:id",  async function (req, res) {

    try {
    let id = req.params.id;
    let test = await Test.findByIdAndDelete(id);
    if(!test){
      res.status(200).send({message: "This Poetry is not available"});
    }
    return res.send(test);
    }catch (err) {
     return res.status(404).send({message:"Id is not a valid"});
    }
});

router.post('/tests',async (req, res)=>{

    try{
      console.log(req.body);
        let test = new Test(req.body);
        await test.save();
        return res.status(200).send(test);
    }catch(err){
        return res.status(500).send({message:"This poetry is invalid"});
    }
});


router.get("/quickTest", async(req, res)=>{
  try{
    let test = await Test.findOne({instructorId:"admin"});
    if(test!= null){
      res.status(200).send(test);
    }else{
      res.status(422).send({message:"There is no Quick Test"});
    }
  }catch(err){
    res.status(422).send({message:err.message});
  }
});


router.put("/quickTest", async(req, res)=>{
 try {
    const updatedTest = await Test.findOne(
      {instructorId:"admin"},
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedTest);
  } catch (err) {
    res.status(500).send(err.message);
  }

});
module.exports = router;