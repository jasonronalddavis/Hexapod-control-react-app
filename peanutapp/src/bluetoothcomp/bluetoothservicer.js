// BluetoothService.js
//server
//Assign
class BluetoothService {
  async connect() {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ name: 'PEANUT' }],
        optionalServices: ['4fafc201-1fb5-459e-8fcc-c5c9c331914b'],
      });

      const server = await device.gatt.connect();
      console.log('Connected to Hexapod:', device.name);
      console.log('Server:', server);
      return device;
    } catch (error) {
      console.error('Bluetooth connection failed:', error);
      throw error;
    }
  }

  disconnect(device) {
    if (device.gatt.connected) {
      device.gatt.disconnect();
      console.log('Disconnected from Hexapod:', device.name);
    }
  }

  async sendCommand(device, command) {
    console.log('Sending command:', command);
    
    // Send the command to the Bluetooth characteristic
    const serviceUuid = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
    const characteristicUuid = 'beb5483e-36e1-4688-b7f5-ea07361b26a8';

    try {
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(serviceUuid);
      const characteristic = await service.getCharacteristic(characteristicUuid);

      await characteristic.writeValue(new TextEncoder().encode(command));
      
      console.log('Command sent successfully');
    } catch (error) {
      console.error('Failed to send command:', error);
    }
  }

  async subscribeToCharacteristic(device, callback) {
    try {
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService('4fafc201-1fb5-459e-8fcc-c5c9c331914b');
      const characteristic = await service.getCharacteristic('beb5483e-36e1-4688-b7f5-ea07361b26a8');

      characteristic.addEventListener('characteristicvaluechanged', callback);
      await characteristic.startNotifications();
    } catch (error) {
      console.error('Failed to subscribe to characteristic:', error);
    }
  }
}

export default BluetoothService;