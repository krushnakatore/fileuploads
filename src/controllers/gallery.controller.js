const express = require("express");

const upload = require("../middleware/upload");

const Gallery = require("../models/gallery.model")

const router = express.Router();

const fs = require("fs");


router.post("/multiple",upload.any("profile_pic") ,async ( req, res) =>{
    const filePaths = req.files.map((file) => file.path);

    var a = [];
    for(let i = 0; i < 5; i++){
        a.push(filePaths[i])
    }

    // console.log(a)

 
    try{
        const user = await Gallery.create({
        
            user_id: req.body.user_id,
            profile_pic : a,

            // user_id:
            
        });
  
        return res.status(201).send({user});
  
    }catch(e){
  
      return res.status(500).json({status:"failed", message :e.message})
  
    }


});


router.get("/multiple", async ( req, res) =>{
    try{
        const user = await Gallery.find().populate({path:"user_id"}).lean().exec() 
        
  
        return res.status(201).send({user});
  
    }catch(e){
  
      return res.status(500).json({status:"failed", message :e.message});
  
    }

});
router.delete("/:id", async (req, res) => {
    try {

        const user = await Gallery.findById(req.params.id)
        
        // console.log(user.profile_pic[0])


        for(var i = 0; i < user.profile_pic.length; i++){
        //    console.log(`${user.profile_pic[i]}`) 

            await fs.unlink(`${user.profile_pic[i]}`,(err) =>{
                if (err){
                    throw err
                }
                console.log("file was deleted")
            });

        }

       


      const deletedUser = await Gallery.findByIdAndDelete(req.params.id).lean().exec();
  
     return res.status(200).send({deletedUser});
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  



module.exports = router