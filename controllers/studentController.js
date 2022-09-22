const express = require("express");
const path = require("path");
const { readFileSync, writeFileSync } = require("fs");
const sendMail = require("../utility/sendMail");
const sendSMS = require("../utility/sendSMS");

//All Student Page
const allStudentPage = (req, res) => {
  //All Students Data
  const students = JSON.parse(
    readFileSync(path.join(__dirname, "../db/student.json"))
  );

  const isEmailVerified = students.filter((data) => data.isEmailVerified == true);

  res.render("student/index", {
    students: isEmailVerified,
  });
};

//Create Student Page
const createStudentPage = (req, res) => {
  res.render("student/create");
};

//Single Student Page
const singleStudentPage = (req, res) => {
  //All Students Data
  const students = JSON.parse(
    readFileSync(path.join(__dirname, "../db/student.json"))
  );

  //Get Id
  const { id } = req.params;

  //Find & Edit Id
  const student = students.find((data) => data.id == id);

  res.render("student/show", {
    student: student,
  });
};

// Student Data Store
const studentDataStore = async (req, res) => {
  //All Students Data
  const students = JSON.parse(
    readFileSync(path.join(__dirname, "../db/student.json"))
  );

  //Get All Data
  const { name, photo, email, cell, location } = req.body;

  //Get Last Id
  let id = 1;
  if (students.length > 0) {
    id = students[students.length - 1].id + 1;
  }
  const token = Date.now() + "_" + Math.floor(Math.random() * 1000000);

  //Add New Student Data
  students.push({
    id: id,
    name: name,
    email: email,
    cell: 88 + cell,
    location: location,
    photo: req.file ? req.file.filename : "avatar.png",
    isEmailVerified: false,
    token: token,
  });

  await sendMail(email, "Verify Account", { name, cell, token, id });
  //  await sendSMS(cell, `Hi! ${name}, you are welcome to Nihal IT Solutions.`);

  // Now Write Data to json db
  writeFileSync(
    path.join(__dirname, "../db/student.json"),
    JSON.stringify(students)
  );

  //Redirect
  res.redirect("/");
};

//Delete Student
const deleteStudent = (req, res) => {
  //All Students Data
  const students = JSON.parse(
    readFileSync(path.join(__dirname, "../db/student.json"))
  );

  const { id } = req.params;

  const newStudents = students.filter((data) => data.id != id);

  writeFileSync(
    path.join(__dirname, "../db/student.json"),
    JSON.stringify(newStudents)
  );

  //Redirect
  res.redirect("/");
};

//Edit Student Page
const editStudentPage = (req, res) => {
  //All Students Data
  const students = JSON.parse(
    readFileSync(path.join(__dirname, "../db/student.json"))
  );

  //Get Id
  const { id } = req.params;
  //Find & Edit Id
  const editStudent = students.find((data) => data.id == id);

  res.render("student/edit", {
    student: editStudent,
  });
};

// Update Student Data
const updateStudent = (req, res) => {
  //All Students Data
  const students = JSON.parse(
    readFileSync(path.join(__dirname, "../db/student.json"))
  );

  //Get Id
  const { id } = req.params;

  //Find & Edit Id
  const editStudent = students.find((data) => data.id == id);

  students[students.findIndex((data) => data.id == id)] = {
    ...students[students.findIndex((data) => data.id == id)],

    name: req.body.name,
    email: req.body.email,
    cell: req.body.cell,
    location: req.body.location,
  };

  writeFileSync(
    path.join(__dirname, "../db/student.json"),
    JSON.stringify(students)
  );

  //Redirect
  res.redirect("/");
};

//Unverified Student Page
const unverifiedStudentPage = (req, res) => {
  //All Students Data
  const students = JSON.parse(
    readFileSync(path.join(__dirname, "../db/student.json"))
  );
  const isEmailUnverify = students.filter((data) => data.isEmailVerified == false);

  res.render("student/unverified", {
    students: isEmailUnverify,
  });
};
//Verify with token
const verifyStudent = (req, res) => {
  //All Students Data
  const students = JSON.parse(
    readFileSync(path.join(__dirname, "../db/student.json"))
  );

  const token = req.params.token;


  students[students.findIndex((data) => data.token == token)] = {
    ...students[students.findIndex((data) => data.token == token)],
    isEmailVerified: true,
    isCellVerified: false,
    token: "",
  };

  writeFileSync(
    path.join(__dirname, "../db/student.json"),
    JSON.stringify(students)
  );

  //Redirect
  res.redirect("/");
};

//Export Modules
module.exports = {
  allStudentPage,
  createStudentPage,
  singleStudentPage,
  editStudentPage,
  studentDataStore,
  deleteStudent,
  updateStudent,
  unverifiedStudentPage,
  verifyStudent,
};
