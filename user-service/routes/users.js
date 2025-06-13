const express= require("express");
const router= express.Router();
const User =require("../models/Users");

router.get("/",async(req,res)=>{
    try{
        const user =  await User.find();
        res.status(200).json(user);
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Internal server error"});
    }
})

router.post("/",async(req,res)=>{
    const {name,email,package} = req.body;  
    try{
        const user = new User({
            name,email,package
        });
        await user.save();

        res.status(201).json({
            message: "User created Successfully",
            user: user
        })
        console.log("User created successfully:", user);
    }catch(err){
        console.error("[User Error: ]Error creating user:", err);
        res.status(500).json({
            message: "Error creating user",
            error: err.message
        })
    }
}
)

router.get('/name/:name', async (req, res) => {
    const { name } = req.params;

    try {
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        console.error("Error fetching user by name:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get('/email/:email',async(req,res)=>{
    const {email} =req.params;

    try{
        const user =await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.json(user); 

    }catch(err){
        console.error("Error fetching user by email:", err);
        res.status(500).json({error:"[User-Service] Error fetching user by email"});
    }

});


module.exports =router;