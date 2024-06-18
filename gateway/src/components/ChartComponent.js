import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Paper, Grid } from '@mui/material';

// Registrar as escalas e elementos necessários
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

function ChartComponent({ data }) {
  console.log('ChartComponent loaded with data:', data);

  // Agrupar os dados por diretoria e calcular a média do nível socioeconômico
  const aggregatedData = data.reduce((acc, item) => {
    const { diretoria, nivel_socio_economico } = item;
    if (!acc[diretoria]) {
      acc[diretoria] = { ...item, nivel_socio_economico: 0, count: 0 };
    }
    acc[diretoria].nivel_socio_economico += nivel_socio_economico;
    acc[diretoria].count += 1;
    return acc;
  }, {});

  const aggregatedArray = Object.keys(aggregatedData).map(key => {
    const item = aggregatedData[key];
    return {
      ...item,
      nivel_socio_economico: item.nivel_socio_economico / item.count,
    };
  });

  // Handler para clique no gráfico de barras
  const handleBarClick = (event, elements) => {
    if (elements && elements.length > 0) {
      const { index } = elements[0];
      const clickedData = aggregatedArray[index];
      alert(`Diretoria: ${clickedData.diretoria}\nNível Socioeconômico: ${clickedData.nivel_socio_economico}`);
    }
  };

  // Dados para o gráfico de barras
  const barChartData = {
    labels: aggregatedArray.map(d => `${d.diretoria} (ID: ${d.id_escola})`),
    datasets: [
      {
        label: 'Nível Socioeconômico',
        data: aggregatedArray.map(d => d.nivel_socio_economico),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  // Dados para o gráfico de linha
  const lineChartData = {
    labels: aggregatedArray.map(d => `${d.diretoria} (Rede: ${d.rede})`),
    datasets: [
      {
        label: 'Nível Socioeconômico',
        data: aggregatedArray.map(d => d.nivel_socio_economico),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
    ],
  };

  // Dados para o gráfico de pizza
  const pieChartData = {
    labels: aggregatedArray.map(d => `${d.diretoria} (ID: ${d.id_escola}, Rede: ${d.rede})`),
    datasets: [
      {
        label: 'Nível Socioeconômico',
        data: aggregatedArray.map(d => d.nivel_socio_economico),
        backgroundColor: aggregatedArray.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`),
      },
    ],
  };

  console.log('Bar Chart Data:', barChartData);
  console.log('Line Chart Data:', lineChartData);
  console.log('Pie Chart Data:', pieChartData);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Bar data={barChartData} onClick={(event, elements) => handleBarClick(event, elements)} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Line data={lineChartData} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Pie data={pieChartData} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <MapContainer center={[-23.55052, -46.633308]} zoom={4} style={{ height: '400px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {aggregatedArray.map((d, index) => {
              if (d.latitude && d.longitude) {
                return (
                  <Marker key={index} position={[d.latitude, d.longitude]}>
                    <Popup>
                      <strong>Diretoria:</strong> {d.diretoria}<br />
                      <strong>Nível Socioeconômico:</strong> {d.nivel_socio_economico.toFixed(2)}
                    </Popup>
                  </Marker>
                );
              }
              return null;
            })}
          </MapContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ChartComponent;
