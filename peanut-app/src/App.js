// App.js
import React, {useState} from 'react';
import BluetoothController from './src/Bluetooth/BluetoothController.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <BluetoothController />
      <img className="backGround" src={require('./Images/background.png')}/>
    </div>
  );
}

export default App;
