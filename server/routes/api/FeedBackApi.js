const express = require("express");
const router = express.Router();
const FeedBack = require("../../models/Feedbacks");



router.get("/",async (req, res) => {
    try {
      let feedback = await FeedBack.find();
      if (feedback.length > 0) {
        res.status(200).send(feedback);
      } else {
        res.status(200).send([]);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  

router.post('/',async (req, res)=>{

    try{
      console.log(req.body);
        let feedback = new FeedBack(req.body);
        await feedback.save();
        return res.status(200).send(feedback);
    }catch(err){
        return res.status(500).send({message:err.message});
    }
});


module.exports = router;
