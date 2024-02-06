const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin, User, Course}=require("../db")
const jwt=require("jsonwebtoken");
const {JWT_SECRET}=require("../config")

// Admin Routes
router.post('/signup', async (req, res) => {
    const username=req.body.username;
    const password=req.body.password;
    await Admin.create({
        username:username, //both do the same thing
        password
    })
    res.json({
        message:"Admin created successfully"
    })
    // Implement admin signup logic
});

router.post('/signin',async (req, res) => {
    const username=req.body.username;
    const password=req.body.password;
    const user=await User.find({
        username,
        password
    })
    if(user)
    {
        const token=jwt.sign({
            username
        },JWT_SECRET);
        res.json({
            token
        })
    }
    else
    {
        res.status(411).json({
            message:"Incorrect email and password"
        })
    }
    
    // Implement admin signup logic
});

router.post('/courses', adminMiddleware, async (req, res) => {
    const title=req.body.title;
    const description=req.body.description;
    const imageLink=req.body.imageLink;
    const price = req.body.price;
        const newCourse = await  Course.create({
            title:title,
            description,
            imageLink,
            price
        })
        res.json({
            message:"Course created successfully",
            courseId: newCourse._id
        })
    });
    // Implement course creation logic

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports = router;