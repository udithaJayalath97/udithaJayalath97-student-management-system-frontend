import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';

function StudentPage() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ studentId:'',firstName: '', lastName: '', email: '', phoneNumber: '' });

  // Fetch all students on page load
  useEffect(() => {
    axios.get('http://localhost:8080/api/students')
      .then(response => setStudents(response.data))
      .catch(error => console.error('There was an error fetching the students!', error));
  }, []);

  // Create a new student
  const handleCreateStudent = () => {
    axios.post('http://localhost:8080/api/students/create', newStudent)
      .then(response => {
        setStudents([...students, response.data]);
        setNewStudent({ studentId:'',firstName: '', lastName: '', email: '', phoneNumber: '' });
      })
      .catch(error => console.error('Error creating student', error));
  };

  // Delete a student by ID
  const handleDeleteStudent = (id) => {
    axios.delete(`http://localhost:8080/api/students/delete/${id}`)
      .then(() => {
        setStudents(students.filter(student => student.id !== id));
      })
      .catch(error => console.error('Error deleting student', error));
  };

  return (
    <div>

      <h3>Create New Student</h3>
      <TextField
        label="Student Id"
        value={newStudent.studentId}
        onChange={(e) => setNewStudent({ ...newStudent, studentId: e.target.value })}
      />
      <TextField
        label="First Name"
        value={newStudent.firstName}
        onChange={(e) => setNewStudent({ ...newStudent, firstName: e.target.value })}
      />
      <TextField
        label="Last Name"
        value={newStudent.lastName}
        onChange={(e) => setNewStudent({ ...newStudent, lastName: e.target.value })}
      />
      <TextField
        label="Email"
        value={newStudent.email}
        onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
      />
      <TextField
        label="Phone"
        value={newStudent.phoneNumber}
        onChange={(e) => setNewStudent({ ...newStudent, phoneNumber: e.target.value })}
      />
      <Button variant="contained" onClick={handleCreateStudent}>Create Student</Button>
      <h2>Students</h2>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Id</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.studentId}</TableCell>
                <TableCell>{student.firstName}</TableCell>
                <TableCell>{student.lastName}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.phoneNumber}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => handleDeleteStudent(student.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      
    </div>
  );
}

export default StudentPage;
