const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin}=require("../db")
const {Course}=require("../db")
const router = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    const username=req.body.username;
    const password=req.body.password;
    Admin.create({
        username:username, //both do the same thing
        password
    })
    .then(function(){
        res.json({
            message:"Admin created successfully"
        })
    })
    
    //check if a user with this username already exists or not
    
    // Implement admin signup logic
});

router.post('/courses', adminMiddleware,async (req, res) => {
    //input validation usinf zod
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


router.get('/courses', adminMiddleware, async (req, res) => {
    const courses= await Course.find({})
    res.json({
        courses:courses
    })
    // Implement fetching all courses logic
});

module.exports = router;