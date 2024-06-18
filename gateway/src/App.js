import React from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import './index.css';

function App() {
  console.log('App component loaded');
  return (
    <div className="App">
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;
