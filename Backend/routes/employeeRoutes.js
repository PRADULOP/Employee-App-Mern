const express=require('express');
const router=express.Router();

const employeeModel=require('../model/employeeModel');

router.use(express.json());
router.use(express.urlencoded({extended:true}));
const jwt = require('jsonwebtoken');

function verifyToken(req,res,next){
    let token = req.headers.token;
    try{
        if(!token) throw 'Unauthorized access';
        else{
            let payload = jwt.verify(token,'secretkey');
            req.user = payload;
            if(!payload) throw 'Unauthorized access';
            next();
        }
    }catch(error){
        console.log(error);
    }
}


function verifyAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();  
}


//GET OPERATION
router.get('/',verifyToken,async(req,res)=>{
    try{
        const employees=await employeeModel.find();
        res.send(employees)
    }catch(err){
        res.send("Failed to fetch data")  }
    })

// CREATE OPERATION
router.post('/add',verifyToken, verifyAdmin, async(req,res)=>{
    try{
        const data = new employeeModel(req.body);
        await data.save();
        res.send('Employee Added successfully');
}catch(error){
    res.send("Failed to add Employee")
}

})

// UPDATE OPERATION
router.put('/update/:id',verifyToken,verifyAdmin,async(req,res)=>{
    try{
        const updatedEmployee = await employeeModel.findByIdAndUpdate(req.params.id,req.body)
    if(!updatedEmployee){
        return res.send('Employee Details not found')
     }
     res.send("Employee Details updated successfully")
    }catch(error){
        res.send("Failed to update Employee Details")
    }
})

// DELETE OPERATION

router.delete('/delete/:id',verifyToken, verifyAdmin,async(req,res)=>{
    try {
        const deleteemployee = await employeeModel.findByIdAndDelete(req.params.id,req.body)
        if(!deleteemployee){
            return res.send('Employee Details not found')
        }
        res.send('Employee Details deleted successfully')
    } catch (error) {
        res.send("Failed to delete Employee Details")
    }
})

module.exports = router;