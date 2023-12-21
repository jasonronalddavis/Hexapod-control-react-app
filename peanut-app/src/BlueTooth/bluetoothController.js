// bluetoothController.js
import React, { useState, useEffect } from 'react';
import BluetoothService from './bluetoothServices';
import HexapodControl from '../controls/hexapodControl.js';
import './bluetooth control.css';

const BluetoothController = () => {
  const [device, setDevice] = useState(null);
  const [connected, setConnected] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  const handleBluetoothConnect = async () => {
    console.log('Handling Bluetooth connection...');
    try {
      const bluetoothDevice = await BluetoothService.connect();
      setDevice(bluetoothDevice);
      setConnected(true);
      // Set up Bluetooth characteristic event listener
      BluetoothService.subscribeToCharacteristic(bluetoothDevice, handleCharacteristicChange);
    } catch (error) {
      console.error('Bluetooth connection failed:', error);
    }
  };

  useEffect(() => {
    // Clean up function
    return () => {
      if (connected) {
        BluetoothService.disconnect(device);
        setConnected(false);
      }
    };
  }, [connected, device]);

  const handleCharacteristicChange = (event) => {
    const receivedValue = event.target.value;
    if (receivedValue === 'crawl_forward') {
      setIsMoving(true);
    }
  };

  return (
    <div>
      <div className="buttons">
        <h2 className="Hex-head">Hexapod Control</h2>
        <h2>Status: {isMoving ? 'crawl_forward' : 'crawl-stop'}</h2>
        <HexapodControl device={device} isMoving={isMoving} />
      </div>
      <p>Connecting to Hexapod...</p>
      <button onClick={handleBluetoothConnect}>Connect Bluetooth</button>
    </div>
  );
};

export default BluetoothController;