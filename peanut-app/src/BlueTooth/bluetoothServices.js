// bluetoothServices.js
class BluetoothService {
  async connect() {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ name: 'PEANUT' }],
        optionalServices: ['4fafc201-1fb5-459e-8fcc-c5c9c331914b'],
      });

      const server = await device.gatt.connect();
      console.log('Connected to Hexapod:', device.name);
      return device;
    } catch (error) {
      console.error('Bluetooth connection failed:', error);
      throw error;
    }
  }

  disconnect(device) {
    // Implement Bluetooth disconnection logic if needed
  }

  sendCommand(device, command) {
    console.log('Sending command:', command);
  }

  async subscribeToCharacteristic(device, callback) {
    try {
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService('4fafc201-1fb5-459e-8fcc-c5c9c331914b');
      const characteristic = await service.getCharacteristic('beb5483e-36e1-4688-b7f5-ea07361b26a8');
  
      characteristic.addEventListener('characteristicvaluechanged', (event) => {
        const receivedValue = event.target.value;
        console.log('Received Value:', receivedValue);
      });
  
      await characteristic.startNotifications();
    } catch (error) {
      console.error('Failed to subscribe to characteristic:', error);
    }
  }
}

export default new BluetoothService();
  