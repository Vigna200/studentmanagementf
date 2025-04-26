import axios from 'axios';
import React, { useState } from 'react';
import './AddStudent.css'; // Linking the CSS file

const AddStudent = () => {
  const [studentData, setStudentData] = useState({
    rollNumber: '', // Added roll number
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    department: '',
    enrollmentYear: '',
    isActive: false
  });
  const [error, setError] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Mapping rollNumber to studentId before sending to the backend
      const dataToSend = {
        studentId: studentData.rollNumber,  // Map rollNumber to studentId
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        email: studentData.email,
        dob: studentData.dob,
        department: studentData.department,
        enrollmentYear: studentData.enrollmentYear,
        isActive: studentData.isActive
      };

      // Sending the data to the backend
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/students`, 
        dataToSend
      );
      
      console.log('Student added successfully:', response.data);

      // Clear form after successful submission
      setStudentData({
        rollNumber: '',
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
        department: '',
        enrollmentYear: '',
        isActive: false
      });
      setError(''); // Clear error if successful
    } catch (error) {
      console.error('Failed to add student. Error:', error.response ? error.response.data : error.message);
      setError('Failed to add student. Please try again.');
    }
  };

  return (
    <div className="addstudent-container">
      <h2>Add New Student</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Roll Number</label>
          <input
            type="text"
            name="rollNumber"
            value={studentData.rollNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={studentData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={studentData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={studentData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={studentData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Department</label>
          <input
            type="text"
            name="department"
            value={studentData.department}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Enrollment Year</label>
          <input
            type="number"
            name="enrollmentYear"
            value={studentData.enrollmentYear}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group checkbox-group">
          <label>Active</label>
          <input
            type="checkbox"
            name="isActive"
            checked={studentData.isActive}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Add Student</button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
