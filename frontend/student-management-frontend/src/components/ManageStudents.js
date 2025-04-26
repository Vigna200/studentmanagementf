import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageStudent.css';

function ManageStudents() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/students`);
      setStudents(res.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-student/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this student?');
      if (confirmDelete) {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/students/${id}`);
        fetchStudents(); // Refresh list after deletion
      }
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="manage-container">
      <h2>Manage Students</h2>
      <table className="manage-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Department</th>
            <th>Enrollment Year</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.studentId}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.email}</td>
              <td>{new Date(student.dob).toLocaleDateString()}</td>
              <td>{student.department}</td>
              <td>{student.enrollmentYear}</td>
              <td>{student.isActive ? 'Active' : 'Inactive'}</td>
              <td>
                <button onClick={() => handleEdit(student._id)}>Edit</button>
                <button onClick={() => handleDelete(student._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageStudents;
