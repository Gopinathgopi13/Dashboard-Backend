const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/Details");

const Teacher = mongoose.model("teacher_details", {
  id: Number,
  name: String,
  yearOfJoining: Number,
  performance: String,
  department: String,
});

let Milestone = mongoose.model("milestone_details", {
  year: Number,
  award: String,
  description: String,
});

let Events = mongoose.model("event_details", {
  eventName: String,
  date: String,
  status: String,
});

let Student = mongoose.model("student_details", {
  firstName: String,
  lastName: String,
  age: Number,
  email: String,
});

app.get("/teachers", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/events", async (req, res) => {
  try {
    const events = await Events.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/milestone", async (req, res) => {
  try {
    const milestone = await Milestone.find();
    res.json(milestone);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/addData", async(req, res)=>{
  try {
    let formData = req.body;
    console.log(formData)
    let student_details = await Teacher.create(formData);
    res.status(200).json(student_details);
  } catch (error) {
    console.log(error);
  }
})
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
