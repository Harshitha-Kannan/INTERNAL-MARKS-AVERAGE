✅ 4️⃣ BACKEND (server.js)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/internalAssessment')
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

const studentSchema = new mongoose.Schema({
    rollno: String,
    name: String,
    subject: String,
    partA: [Number],
    partB: [Number],
    total: Number
});

const averageSchema = new mongoose.Schema({
    subjectMarks: [Number],
    average: Number
});

const Student = mongoose.model("Student", studentSchema);
const Average = mongoose.model("Average", averageSchema);

app.post("/api/student-record", async (req,res)=>{
    try{
        await Student.create(req.body);
        res.status(201).json({message:"Saved"});
    }catch(err){
        res.status(500).json({error:err});
    }
});

app.post("/api/average", async (req,res)=>{
    try{
        await Average.create(req.body);
        res.status(201).json({message:"Saved"});
    }catch(err){
        res.status(500).json({error:err});
    }
});

app.listen(5000, ()=> console.log("Server running on http://localhost:5000"));