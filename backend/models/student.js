const mongoose = require('mongoose');

const studentIdRegex = /^1601\d{8}$/; // Assuming roll number starts with "1601"

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,  // Correct data type for studentId
    required: true,
    unique: true,
    match: [studentIdRegex, 'Student ID must follow the format 1601xxxxxxxx'],
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  department: { type: String, required: true },
  enrollmentYear: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
