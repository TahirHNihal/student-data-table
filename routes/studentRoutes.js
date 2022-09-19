const express = require("express");
const path = require("path");
const {
  allStudentPage,
  createStudentPage,
  singleStudentPage,
  editStudentPage,
  studentDataStore,
  deleteStudent,
  updateStudent,
  unverifiedStudentPage,
} = require("../controllers/studentController");
const multer = require("multer");

//Router Init
const router = express.Router();

//Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images/students_image/"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const studentPhotoMulter = multer({
  storage: storage,
}).single("student_profile");

//Routes
router.get("/", allStudentPage);
router.get("/create", createStudentPage);
router.post("/create", studentPhotoMulter, studentDataStore);

router.get("/edit/:id", editStudentPage);
router.post("/update/:id", studentPhotoMulter, updateStudent);

router.get("/delete/:id", deleteStudent);
router.get("/:id", singleStudentPage);

router.get("/unverified", unverifiedStudentPage);

//Export Modules
module.exports = router;
