const express = require("express");

// const path = require("path");

const fs = require("fs");

const upload = require("../middleware/upload");

const User = require("../models/user.model")

const router = express.Router();


router.post("/single", upload.single("profile_pic") ,async ( req, res) =>{
  try{
      const user = await User.create({
        //   id:req.body.id,
          first_name : req.body.first_name,
          last_name :req.body.last_name,
          profile_pic : req.file.path,
      });

      return res.status(201).send({user});

  }catch(e){

    return res.status(500).json({status:"failed", message :e.message})

  }


});


router.get ("", async ( req, res) =>{

const user = await User.find().lean().exec();

return res.status(201).send({user});


});



router.patch("/:id", upload.single("profile_pic"),async (req, res) => {
    try {

        const user = await User.findById(req.params.id)

        await fs.unlink(`${user.profile_pic}`,(err) =>{
            if (err){
                throw err
            }
            console.log("file was deleted")
        });



      const updateUser = await User.findByIdAndUpdate(req.params.id, {
            profile_pic: req.file.path
      })
        .lean()
        .exec();
  
      return res.status(201).send({updateUser});
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {

        const user = await User.findById(req.params.id)

        await fs.unlink(`${user.profile_pic}`,(err) =>{
            if (err){
                throw err
            }
            console.log("file was deleted")
        });


      const deletedUser = await User.findByIdAndDelete(req.params.id).lean().exec();
  
      return res.status(200).send({deletedUser});
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  


module.exports = router;