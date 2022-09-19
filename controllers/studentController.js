const express = require("express");
const path = require("path");
const { readFileSync, writeFileSync } = require("fs");
const sendMail = require("../utility/sendMail");

//All Student Page
const allStudentPage = (req, res) => {
  //All Students Data
  const students = JSON.parse(
    readFileSync(path.join(__dirname, "../db/student.json"))
  );

  const isVerify = students.filter((data) => data.isVerified == true);

  res.render("student/index", {
    students: isVerify,
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
const studentDataStore = (req, res) => {
  //All Students Data
  const students = JSON.parse(
    readFileSync(path.join(__dirname, "../db/student.json"))
  );

  //Get All Data
  const { name, photo, email, cell, location } = req.body;

  //Get Last Id
  let last_id = 1;
  if (students.length > 0) {
    last_id = students[students.length - 1].id + 1;
  }
  const token = Date.now() + "_" + Math.floor(Math.random() * 1000000);

  //Add New Student Data
  students.push({
    id: last_id,
    name: name,
    email: email,
    cell: cell,
    location: location,
    photo: req.file ? req.file.filename : "avatar.png",
    isVerified: false,
    token: token,
  });

  sendMail(email, "Verify Account", name);

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
  const isUnverify = students.filter((data) => data.isVerified == false);

  res.render("student/unverified", {
    students: isUnverify,
  });
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
};
