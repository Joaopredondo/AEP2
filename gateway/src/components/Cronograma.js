import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const cronograma = [
  {
    sprint: 'Sprint 1',
    periodo: '1 semana',
    atividades: [
      'Configuração do ambiente de desenvolvimento',
      'Pesquisa e seleção de dados',
      'Importação dos dados para o MongoDB',
      'Criação do backend para servir a API dos dados',
    ],
  },
  {
    sprint: 'Sprint 2',
    periodo: '1 semana',
    atividades: [
      'Desenvolvimento do frontend',
      'Criação da dashboard inicial',
      'Implementação da funcionalidade de filtro',
      'Adição de gráficos de barras, linhas e pizza',
    ],
  },
  {
    sprint: 'Sprint 3',
    periodo: '1 semana',
    atividades: [
      'Melhoria da UI com Material-UI',
      'Implementação da funcionalidade de exportação para CSV',
      'Adição de testes unitários',
    ],
  },
  {
    sprint: 'Sprint 4',
    periodo: '1 semana',
    atividades: [
      'Implementação de feedback visual para o usuário',
      'Correção de bugs e otimização de performance',
      'Finalização e revisão do projeto',
    ],
  },
];

function Cronograma() {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cronograma do Projeto
        </Typography>
        {cronograma.map((sprint, index) => (
          <Paper key={index} sx={{ p: 2, my: 2 }}>
            <Typography variant="h6" component="h2">
              {sprint.sprint} - {sprint.periodo}
            </Typography>
            <ul>
              {sprint.atividades.map((atividade, idx) => (
                <li key={idx}>
                  <Typography variant="body1">{atividade}</Typography>
                </li>
              ))}
            </ul>
          </Paper>
        ))}
      </Box>
    </Container>
  );
}

export default Cronograma;
