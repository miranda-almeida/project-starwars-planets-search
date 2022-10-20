import React from 'react';
import './App.css';
import Table from './components/Table';
import StarwarsProvider from './context/StarwarsProvider';

function App() {
  return (
    <div>
      <h1>Starwars Planets Search</h1>
      <StarwarsProvider>
        <Table />
      </StarwarsProvider>
    </div>
  );
}

export default App;
