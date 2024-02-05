const { Router } = require("express");
const router = Router();
const {User}=require("../db")
const {Course}=require("../db")
const userMiddleware = require("../middleware/user");

// User Routes
router.post('/signup', (req, res) => {
    const username=req.body.username;
    const password=req.body.password;
    User.create({
        username:username, //both do the same thing
        password
    })
    .then(function(){
        res.json({
            message:"User created successfully"
        })
    })
    // Implement user signup logic
});

router.get('/courses',async (req, res) => {
    const courses= await Course.find({})
    res.json({
        courses:courses
    })
    // Implement listing all courses logic
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const courseId=req.params.courseId;
    const username=req.headers.username;
    //zod
    try{
        await User.updateOne({
            username:username
        },{
            "$push":{
                purchasedCourses:courseId
            }
        })
    }catch(e){
        console.log(e);
    }
        //.catch(function(e){console.log(e)})
    res.json({
        message:"Purchase complete!"
    })
    // Implement course purchase logic
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const user = await User.findOne({
        username: req.headers.username
    });

    console.log(user.purchasedCourses);
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    });

    res.json({
        courses: courses
    })

    // Implement fetching purchased courses logic
});

module.exports = router