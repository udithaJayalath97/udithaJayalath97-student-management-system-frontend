import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';

function CoursePage() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: '', code: '', description: '', credits: 0 });

  useEffect(() => {
    
    axios.get('http://localhost:8080/api/getCourses')
      .then(response => setCourses(response.data))
      .catch(error => console.error('There was an error fetching the courses!', error));
  }, []);

  const handleCreateCourse = () => {
    axios.post('http://localhost:8080/api/createCourse', newCourse)
      .then(response => {
        setCourses([...courses, response.data]);
        setNewCourse({ title: '', code: '', description: '', credits: 0 });
      })
      .catch(error => console.error('Error creating course', error));
  };

  const handleDeleteCourse = (id) => {
    axios.delete(`http://localhost:8080/api/courses/delete/${id}`)
      .then(() => {
        setCourses(courses.filter(course => course.id !== id));
      })
      .catch(error => console.error('Error deleting course', error));
  };

  return (
    <div>
      <h3>Create New Course</h3>
      <TextField
        label="Course Title"
        value={newCourse.title}
        onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
      />
      <TextField
        label="Course Code"
        value={newCourse.code}
        onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
      />
      <TextField
        label="Course Description"
        value={newCourse.description}
        onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
      />
      <TextField
        label="Credits"
        type="number"
        value={newCourse.credits}
        onChange={(e) => setNewCourse({ ...newCourse, credits: Number(e.target.value) })}
      />
      <Button variant="contained" onClick={handleCreateCourse}>Create Course</Button>
      <h2>Courses</h2>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Credits</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.code}</TableCell>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.description}</TableCell>
                <TableCell>{course.credits}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => handleDeleteCourse(course.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      
    </div>
  );
}

export default CoursePage;
