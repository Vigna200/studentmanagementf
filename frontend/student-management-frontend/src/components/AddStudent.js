import axios from 'axios';
import React, { useState } from 'react';
import './AddStudent.css';

function AddStudent() {
  const [student, setStudent] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    department: '',
    enrollmentYear: '',
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent({ ...student, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!student.studentId || !student.firstName || !student.lastName || !student.email || !student.dob || !student.department || !student.enrollmentYear) {
      alert("Please fill in all the fields.");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/students`, student);
      if (response.status === 201) {
        alert('Student added successfully!');
        setStudent({
          studentId: '',
          firstName: '',
          lastName: '',
          email: '',
          dob: '',
          department: '',
          enrollmentYear: '',
          isActive: true
        });
      }
    } catch (error) {
      console.error('Error adding student:', error);
      if (error.response) {
        alert(`Failed to add student. Error: ${error.response.data.message}`);
      } else {
        alert('Failed to add student. Please try again later.');
      }
    }
  };

  return (
    <div className="addstudent-container">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <input name="studentId" value={student.studentId} onChange={handleChange} placeholder="Student ID" required />
        <input name="firstName" value={student.firstName} onChange={handleChange} placeholder="First Name" required />
        <input name="lastName" value={student.lastName} onChange={handleChange} placeholder="Last Name" required />
        <input name="email" value={student.email} onChange={handleChange} placeholder="Email" type="email" required />
        <input name="dob" value={student.dob} onChange={handleChange} placeholder="Date of Birth" type="date" required />
        <input name="department" value={student.department} onChange={handleChange} placeholder="Department" required />
        <input name="enrollmentYear" value={student.enrollmentYear} onChange={handleChange} placeholder="Enrollment Year" type="number" required />
        <label>
          Active
          <input type="checkbox" name="isActive" checked={student.isActive} onChange={handleChange} />
        </label>
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}

export default AddStudent;
