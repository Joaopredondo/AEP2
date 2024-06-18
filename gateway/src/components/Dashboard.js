import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChartComponent from './ChartComponent';
import { TextField, Container, Typography, Button, Box } from '@mui/material';
import { CSVLink } from 'react-csv';
import NavBar from './NavBar';
import Cronograma from './Cronograma';

function Dashboard() {
  console.log('Dashboard component loaded');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    console.log('Fetching data from API');
    axios.get('http://localhost:5000/api/data')
      .then(response => {
        console.log('Data fetched:', response.data);
        if (response.data.length > 0) {
          console.log('Sample data:', response.data[0]);
        }
        setData(response.data);
        setFilteredData(response.data); // Initialize filteredData with data
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleFilterChange = (event) => {
    const value = event.target.value.toLowerCase();
    console.log('Filter value:', value);
    const filtered = data.filter(d => {
      const diretoria = d.diretoria ? d.diretoria.toLowerCase() : '';
      console.log(`Item: ${JSON.stringify(d)}, Checking diretoria: ${diretoria} includes ${value}:`, diretoria.includes(value));
      return diretoria.includes(value);
    });
    console.log('Filtered data:', filtered);
    setFilteredData(filtered);
  };

  return (
    <>
      <NavBar />
      <Container>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard
          </Typography>
          <TextField
            label="Filtrar por diretoria"
            variant="outlined"
            onChange={handleFilterChange}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" sx={{ my: 2 }}>
            <CSVLink data={filteredData} filename={"filtered_data.csv"} style={{ color: 'white', textDecoration: 'none' }}>
              Exportar para CSV
            </CSVLink>
          </Button>
          <ChartComponent data={filteredData.length > 0 ? filteredData : data} />
          <Cronograma />
        </Box>
      </Container>
    </>
  );
}

export default Dashboard;
