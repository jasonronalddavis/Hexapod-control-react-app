// App.js
import React, {useState} from 'react';
import BluetoothController from './bluetooth/bluetoothcontroller.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <BluetoothController />
      <img className="backGround" src={require('./Images/background.png')}/>
      {/* Home */}
    </div>
  );
}

export default App;
