import React, { useState } from 'react';
import axios from 'axios';
import './AddStudent.css'; // Linking the CSS file

const AddStudent = () => {
  const [studentData, setStudentData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    department: '',
    enrollmentYear: '',
    isActive: false
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/students`,
        studentData
      );
      console.log('Student added successfully:', response.data);
      setStudentData({
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
    <div className="add-student-form">
      <h2>Add New Student</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={studentData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={studentData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={studentData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={studentData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Department</label>
          <input
            type="text"
            name="department"
            value={studentData.department}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Enrollment Year</label>
          <input
            type="number"
            name="enrollmentYear"
            value={studentData.enrollmentYear}
            onChange={handleChange}
            required
          />
        </div>
        <div>
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
}

export default AddStudent;
