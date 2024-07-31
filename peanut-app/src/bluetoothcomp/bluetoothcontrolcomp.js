// BluetoothController.js

import React, { useState, useEffect } from 'react';
import BluetoothService from './bluetoothservicer.js';
import HexapodControl from '../controls/hexapodcontroller.js';
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
      BluetoothService.subscribeToCharacteristic(bluetoothDevice, handleCharacteristicChange);
    } catch (error) {
      console.error('Bluetooth connection failed:', error);
    }
  };

  useEffect(() => {
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
      <div className="bluetooth">
        <HexapodControl device={device} />
      </div>
      <div className="connect">
      <p>Connecting to Hexapod...</p>
      <button onClick={handleBluetoothConnect}>Connect Bluetooth</button>
      </div>
    </div>
  );
};

export default BluetoothController;
