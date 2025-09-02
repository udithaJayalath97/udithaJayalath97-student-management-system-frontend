import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, CircularProgress } from '@mui/material';

function ResultPage() {
  const [results, setResults] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [code, setCode] = useState('');
  const [score, setScore] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8080/api/results')
      .then(response => {
        setResults(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching results:', error);
        setLoading(false); 
      });
  }, []);

  const handleSearch = () => {
    if (!studentId) {
      alert('Please enter a student ID');
      return;
    }

    setLoading(true);

    axios.get(`http://localhost:8080/api/results/student?studentId=${studentId}`)
      .then(response => {
        setResults(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching results:', error);
        setLoading(false);
      });
  };

  const handleRecordResult = () => {
    if (!studentId || !code || !score) {
      alert('Please fill in all fields');
      return;
    }
    axios.post(`http://localhost:8080/api/results/add?studentId=${studentId}&code=${code}&score=${score}`)
      .then(response => {
        setResults([...results, response.data]);
        setStudentId('');
        setCode('');
        setScore('');
      })
      .catch(error => console.error('Error recording result', error));
  };

  return (
    <div>
      <h3>Search Results by Student ID</h3>

      <TextField
        label="Enter Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      
      <Button variant="contained" onClick={handleSearch}>Search</Button>

      {loading && <CircularProgress />}

      <h3>Record Result</h3>
      <TextField
        label="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <TextField
        label="Course ID"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <TextField
        label="Score"
        value={score}
        onChange={(e) => setScore(e.target.value)}
      />
      <Button variant="contained" onClick={handleRecordResult}>Record Result</Button>

      <h2>Results</h2>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Course Code</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Date Recorded</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result) => (
              <TableRow key={result.id}>
                <TableCell>{result.student.studentId}</TableCell>
                <TableCell>{result.course.code}</TableCell>
                <TableCell>{result.course.title}</TableCell>
                <TableCell>{result.score}</TableCell>
                <TableCell>{new Date(result.dateRecorded).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ResultPage;
