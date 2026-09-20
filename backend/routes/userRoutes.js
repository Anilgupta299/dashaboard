const express=require("express");
const bcrypt = require("bcryptjs");
const User=require("../models/User");
const authenticateToken = require("../middleware/authiMiddleware");
const router=express.Router();

router.use(authenticateToken);

// CREATE USER
router.post('/',async(req,res)=>{
    try{
    const { name, role, password } = req.body;
    const email = req.body.email?.trim().toLowerCase();

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user=await User.create({ name, email, role, password: hashedPassword });
        res.status(201).json({
      success: true,
            message:"User created successfully",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
        });
    } catch (error) {
    console.error("Create user error:", error);
    const status = error.code === 11000 ? 409 : error.name === "ValidationError" ? 400 : 500;
    const message = status === 409
      ? "Email already registered"
      : status === 400
        ? "Invalid user data"
        : "Unable to create user";
    res.status(status).json({ success: false, message });
    }
});


// GET ALL USERS
router.get("/",async(req,res)=>{
    try{
        const users=await User.find();
        res.status(200).json({success: true, users});
    }catch(error){
        res.status(500).json({success: false, message:"Unable to fetch users"});
    }
});

// updates Users
router.put("/:id", async (req, res) => {
  try {
    const { name, role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, role },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update user",
    });
  }
});

// delete Users

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete user",
    });
  }
});

module.exports=router;