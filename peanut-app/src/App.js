// App.js
import React, {useState} from 'react';
import BluetoothController from './bluetoothcomp/bluetoothcontrolcomp.js';
import './appstyle.css';

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
