import logo from './logo.svg';
import './App.css';
import React from 'react';
import BluetoothController from './BlueTooth/bluetoothController.js';
import { BrowserRouter as Router, Routes, Route} from 'react-dom/client';//import ListUsers from "../components/User/users";

import './index.css';


function App() {
  return (
  <div className="App">
  <header className="App-header">
  <h1>Hexapod Control App</h1>
  </header>
  <main>
  <BluetoothController />
  </main>
  </div>
  );
  }
  
  export default App;