import React from 'react';
import logo from './logo.svg';
import './App.css';
import AddPet from './addPet';
import PetList from './PetList';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <AddPet/>
        <PetList/>
      </header>
    </div>
  );
}

export default App;
