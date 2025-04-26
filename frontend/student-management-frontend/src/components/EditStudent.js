import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditStudent.css';

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  
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

  // Memoized function to fetch the student data
  const fetchStudent = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/students/${id}`);
      setStudent(res.data);
    } catch (error) {
      console.error(error);
    }
  }, [id]); // Only re-create this function if `id` changes

  // Fetch student data when the component mounts
  useEffect(() => {
    fetchStudent();
  }, [fetchStudent]); // Add `fetchStudent` as a dependency

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent({ ...student, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/students/${id}`, student);
      alert('Student updated successfully!');
      navigate('/manage-students');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="editstudent-container">
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="studentId"
          value={student.studentId}
          onChange={handleChange}
          placeholder="Student ID"
          required
        />
        <input
          name="firstName"
          value={student.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          name="lastName"
          value={student.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          name="email"
          type="email"
          value={student.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="dob"
          type="date"
          value={student.dob}
          onChange={handleChange}
          required
        />
        <input
          name="department"
          value={student.department}
          onChange={handleChange}
          placeholder="Department"
          required
        />
        <input
          name="enrollmentYear"
          value={student.enrollmentYear}
          onChange={handleChange}
          placeholder="Enrollment Year"
          required
        />
        <label>
          Active
          <input
            type="checkbox"
            name="isActive"
            checked={student.isActive}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Student</button>
      </form>
    </div>
  );
}

export default EditStudent;
