import React from 'react';
import BluetoothService from '../BlueTooth/bluetoothServices.js';
import './controller.css';




const HexapodControl = ({ device }) => {


    const handleButtonDown = () => {
        console.log('Device:', device); // Add this line to check if device is defined
        if (device) {
          const command = 'crawl_forward';
          console.log('Transmitting command:', command);
          BluetoothService.sendCommand(device, command);
        }
      };
  
    const handleButtonUp = () => {
      // You can add additional logic here if needed
    };

    return (
        <div className="buttons">
          <button onMouseDown={handleButtonDown} onMouseUp={handleButtonUp}>
            Move Forward
          </button>
          {/* Add more controls as needed */}
        </div>
      );
    };

export default HexapodControl;
