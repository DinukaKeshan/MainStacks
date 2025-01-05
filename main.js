const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());

mongoose
  .connect("mongodb+srv://Dinuka:Dinuka2001@cluster0.ef95q.mongodb.net/mern")
  .then(() => console.log("Connected to MongoDB"))
  .catch(() => console.log("Failed to connect to MongoDB"));

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  city: String,
  profession: String,
});

const User = mongoose.model("users", userSchema);

//fetch all users

app.get("/users", async (req, res) => {
  try {
    const members = await User.find();
    res.json(members);
  } catch (error) {
    res.json(error);
  }
});

//fetch one user

app.get("/user", async (req, res) => {
  try {
    const filterName = req.body.username;
    const member = await User.findOne({ name: filterName });
    res.json(member);
  } catch (error) {
    res.json(error);
  }
});

//create a new user

app.get("/creat", async (req, res) => {
  try {
    const newUser = User.create({
      name: "Example Name",
      age: 30,
      email: "example@example.example",
      city: "Example",
      profession: "ExampleJob",
    });
    
    const savedUser = await newUser
      .save()
      .then(() => res.json(savedUser))
      .catch(() => res.json("error"));
  } catch (error) {
    res.json(error);
  }
});

//delete user

app.get("/delete", async (req, res) => {
  try {
    const delUser = await User.findByIdAndDelete("677a19849e54d24442b76a97");
    res.json(delUser);
  } catch (error) {
    res.json(error);
  }
});

//update user

app.get("/update", async (req, res) => {
  try {
    const paramUser = req.body.upName;
    const upUser = await User.findByIdAndUpdate("677a0d04ac13c07a3b3fcf92", {
      name: paramUser,
    });
    res.json(upUser);
  } catch (error) {
    res.json(error);
  }
});

//basic

app.get("/", (req, res) => {
  const usname = req.body.username;
  const user = { name: usname, email: "john@example.com" };
  res.json(user);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
