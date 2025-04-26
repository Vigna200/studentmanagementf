import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './StudentList.css';

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/students`);
      setStudents(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="studentlist-container">
      <h2>Student List</h2>
      <table className="studentlist-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Department</th>
            <th>Enrollment Year</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.studentId}</td>
              <td>{student.firstName} {student.lastName}</td>
              <td>{student.email}</td>
              <td>{new Date(student.dob).toLocaleDateString()}</td>
              <td>{student.department}</td>
              <td>{student.enrollmentYear}</td>
              <td>{student.isActive ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
