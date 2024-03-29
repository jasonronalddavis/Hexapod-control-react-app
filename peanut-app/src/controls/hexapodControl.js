// HexapodControl.js

import React, { useState } from 'react';
import BluetoothService from '../Bluetooth/bluetoothServices';
import './controller.css';

const HexapodControl = ({ device }) => {

  const [crawlForward, setCrawlForward] = useState(false); // State for tracking crawling forward action

  const handleCrawlStart = () => {
    console.log('Crawling forward...');
    if (device) {
      console.log('Transmitting command: 11');
      BluetoothService.sendCommand(device, new Uint8Array([11])); // Send the command to start crawling forward
      setCrawlForward(true); // Set the state to indicate crawling forward
    }
  };

  const handleCrawlStop = () => {
    console.log('Stopping crawl...');
    if (device) {
      console.log('Transmitting command: 14');
      BluetoothService.sendCommand(device, new Uint8Array([13])); // Send the command to stop crawling
      setCrawlForward(false); // Set the state to indicate not crawling
    }
  };
  const handleBackward = () => {
    console.log('Device:', device);
    if (device) {
      console.log('Transmitting command: B');
      BluetoothService.sendCommand(device, new Uint8Array([66])); // ASCII code for 'B'
    }
  };

  const handleStretch = () => {
    console.log('Device:', device);
    if (device) {
      console.log('Transmitting command: S');
      BluetoothService.sendCommand(device, new Uint8Array([83])); // ASCII code for 'S'
    }
  };

  const standLift = () => {
    console.log('Device:', device);
    if (device) {
      console.log('Transmitting command: L');
      BluetoothService.sendCommand(device, new Uint8Array([18])); // ASCII code for 'S'
    }
  };

  const handleEyeballXChange = (value) => {
    console.log('Eyeball X-Axis:', value);
    if (device) {
      const byteValue = Number(value); // Convert the value to a number
      const byteCommand = new Uint8Array([byteValue]); // Create a Uint8Array with the byte value
      BluetoothService.sendCommand(device, byteCommand); // Send the byte command to adjust eyeball X-axis
    }
  };
  
  const handleEyeballYChange = (value) => {
    console.log('Eyeball Y-Axis:', value);
    if (device) {
      const byteValue = Number(value); // Convert the value to a number
      const byteCommand = new Uint8Array([byteValue]); // Create a Uint8Array with the byte value
      BluetoothService.sendCommand(device, byteCommand); // Send the byte command to adjust eyeball X-ax
    }
  };
  
  const handleEyelidChange = (value) => {
    console.log('Eyelid:', value);
    if (device) {
      const command = `L${value}`; // Command format for adjusting eyelid position
      BluetoothService.sendCommand(device, new Uint8Array([...command])); // Send the command to adjust eyelid position
    }
  };
  
  const handleBlink = () => {
    console.log('Blinking...');
    if (device) {
      console.log('Transmitting command: 10');
      BluetoothService.sendCommand(device, new Uint8Array([10])); // Send the command for blinking
    }
  };
  
  const handleButtonUp = () => {
    console.log('Button released');
    if (device) {
      console.log('Transmitting command: 15');
      BluetoothService.sendCommand(device, new Uint8Array([15]));
    }
  };
  
  const standUp = () => {
    console.log('Button released');
    if (device) {
      console.log('Transmitting command: 13');
      BluetoothService.sendCommand(device, new Uint8Array([13]));
    }
  };

  return (

    <div className="buttons">
         <div className="legs">
      <button
        onMouseDown={handleBackward}
        onMouseUp={handleButtonUp}
      >
        Move Backward
      </button>
      <button
        onMouseDown={handleCrawlStart}
        onMouseUp={handleCrawlStop}
      >
        Move Forward
      </button>
      <button
        onMouseDown={handleStretch}
      >
        Stretch
      </button>
      <button
        onMouseDown={standLift}
        onMouseUp={standUp}
      >
        Stand
      </button>
      </div>

      
      <div className='sliders'>
      <div>
        <label className= "xLabel" >X-Axis:</label>
        <input className="xSlider" type="range" min="20" max="160" defaultValue="65" onChange={(e) => handleEyeballXChange(e.target.value)} />
      </div>
      <div className = "eyeY">
        <label className= "yLabel">Y-Axis:</label>
        <input className="ySlider" type="range" min="20" max="90" defaultValue="40" onChange={(e) => handleEyeballYChange(e.target.value)} />
      </div>
      <div className="eyelid">
        <label className ="lidLabel">Eyelid:</label>
        <input className="lidSlider" type="range" min="10" max="180" onChange={(e) => handleEyelidChange(e.target.value)} />
      </div>
     <button className="blink" onMouseDown={handleBlink} onMouseUp={handleButtonUp}>
  Blink
</button>

    </div>
    </div>
  );
};

export default HexapodControl;
