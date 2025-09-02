import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';

function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/enrollments')
      .then(response => setEnrollments(response.data))
      .catch(error => console.error('Error fetching enrollments', error));
  }, []);

  const handleEnrollStudent = () => {
    if (!studentId || !code) {
      alert('Please provide student ID and course code');
      return;
    }
    axios.post(`http://localhost:8080/api/student/Enrollment?studentId=${studentId}&code=${code}`)
      .then(response => {
        setEnrollments([...enrollments, response.data]);
        setStudentId('');
        setCode('');
      })
      .catch(error => console.error('Error enrolling student', error));
  };

  return (
    <div>

      <h3>Enroll Student</h3>
      <TextField
        label="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <TextField
        label="Course Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <Button variant="contained" onClick={handleEnrollStudent}>Enroll</Button>

      <h2>Enrollments</h2>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Course Code</TableCell>
              <TableCell>Enrollment Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {enrollments.map((enrollment) => (
              <TableRow key={enrollment.id}>
                <TableCell>{enrollment.student.studentId}</TableCell>
                <TableCell>{enrollment.course.code}</TableCell>
                <TableCell>{new Date(enrollment.enrollmentDate).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      
    </div>
  );
}

export default EnrollmentsPage;
