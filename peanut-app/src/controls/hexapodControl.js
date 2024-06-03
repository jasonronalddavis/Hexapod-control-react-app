import React, { useState, useEffect } from 'react';
import BluetoothService from '../Bluetooth/bluetoothServices';
import './controller.css';
import eyeBar from '../Images/eyeBar.png';
import eyeBarCopy from '../Images/eyeBarCopy.png';
import eyeWindow from '../Images/eyeWindow.png';
import FrontEyeBar from '../Images/FrontEyeBar.png';
import mouthWindow from '../Images/mouthWindow.png';

//crawlR
const HexapodControl = ({ device }) => {
  const [scrollbarValue, setScrollbarValue] = useState(0);
  const [crawlForward, setCrawlForward] = useState(false); // State for tracking crawling forward action
  const [crawlBackward, setCrawlBackward] = useState(false); // State for tracking crawling forward action
  const [crawlRight, setCrawlRight] = useState(false); // State for tracking crawling forward action
  const [width, setWidth] = useState(140); // Initial width of the rectangle
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);
  const [height, setHeight] = useState(100); // Initial width of the rectangle
  const minWidth = 20;
  const maxWidth = 140;
  const minHeight = 20;
  const maxHeight = 140;


  const xBarDown = (e) => {
    setDragging(true);
    setStartX(e.clientX); // Store the starting X coordinate
  };

  // Effect for adjusting bar length based on scrollbar value


  const xBarUp = () => {
    // Stop dragging when the mouse is released
    setDragging(false);
  };



  const yBarDown = (e) => {
    setDragging(true);
    setStartY(e.clientY); // Store the starting X coordinate
  };


  const yBarUp = () => {
    // Stop dragging when the mouse is released
    setDragging(false);
  };

  const xBarMove = (e) => {
    if (dragging) {
      // Calculate the change in X coordinate
      const deltaX = e.clientX - startX;
      // Update the rectangle width based on the change
      const newWidth = width + deltaX;
      const clampedWidth = Math.min(Math.max(newWidth, minWidth), maxWidth);
      setWidth(clampedWidth);

      // Transmit the new width value via Bluetooth
      if (device) {
        BluetoothService.sendCommand(device, `x${clampedWidth}`);
      }

      setStartX(e.clientX);
    }
  };


  const yBarMove = (e) => {
    if (dragging) {
      // Calculate the change in X coordinate
      const deltaY = e.clientY - startY;
      // Update the rectangle width based on the change
      const newHeight = height + deltaY;
      const clampedHeight = Math.min(Math.max(newHeight, minHeight), maxHeight);
      setHeight(clampedHeight);
console.log(clampedHeight);
      // Transmit the new width value via Bluetooth
      if (device) {
        BluetoothService.sendCommand(device, `y${clampedHeight}`);
      }

      setStartY(e.clientY);
    }
};

  useEffect(() => {
    const fIntervalId = setInterval(() => {
      if (crawlForward && device) {
        console.log('Crawling forward...');
        BluetoothService.sendCommand(device, new Uint8Array([11])); // Send the command to start crawling forward
      }
    }, 20); // Adjust the interval as needed

    const bIntervalId = setInterval(() => {
      if (crawlBackward && device) {
        console.log('Crawling backward...');
        BluetoothService.sendCommand(device, new Uint8Array([11])); // Send the command to start crawling forward
      }
    }, 20);
    const rIntervalId = setInterval(() => {
      if (crawlRight && device) {
        console.log('Crawling backward...');
        BluetoothService.sendCommand(device, new Uint8Array([12])); // Send the command to start crawling forward
      }
    }, 20);

    return () => {
      clearInterval(fIntervalId); // Clear interval on component unmount
      clearInterval(bIntervalId);
      clearInterval(rIntervalId);
    };
  }, [crawlForward, device], [crawlBackward, device], [crawlRight, device]);


const handleRightStart = () =>{
  console.log('Crawling backward...');
  if (device) {
    console.log('Transmitting command: 11');
    const byteCommand = `X${12}`;
    BluetoothService.sendCommand(device,byteCommand); // Send the command to start crawling forward
    setCrawlRight(true); // Set the state to indicate crawling forward
  }

};


  const handleBackStart = () => {
    console.log('Crawling backward...');
    if (device) {
      console.log('Transmitting command: 11');
      const byteCommand = `Z${12}`;
      BluetoothService.sendCommand(device,byteCommand); // Send the command to start crawling forward
      setCrawlBackward(true); // Set the state to indicate crawling forward
    }
  };


  const handleBackStop = () => {
    console.log('Stopping crawl...');
    if (device) {
      console.log('Transmitting command: 8');
      BluetoothService.sendCommand(device, new Uint8Array([19])); // Send the command to stop crawling
      setCrawlBackward(false); // Set the state to indicate not crawling
    }
  };

  const handleCrawlStart = () => {
    console.log('Crawling forward...');
    if (device) {
      console.log('Transmitting command: 11');
      const byteCommand = `F${11}`;
      BluetoothService.sendCommand(device,byteCommand); // Send the command to start crawling forward
      setCrawlForward(true); // Set the state to indicate crawling forward
    }
  };

  const handleForwardStop = () => {
    console.log('Stopping crawl...');
    if (device) {
      console.log('Transmitting command: 14');
      BluetoothService.sendCommand(device, new Uint8Array([19])); // Send the command to stop crawling
      setCrawlForward(false); // Set the state to indicate not crawling
    }
  };



  const handleStretch = () => {
    console.log('Device:', device);
    if (device) {
      console.log('Transmitting command: S');
      const byteCommand = `S${18}`;
      BluetoothService.sendCommand(device,byteCommand ); // ASCII code for 'S'
    }
  };
  const standLift = () => {
    console.log('Device:', device);
    if (device) {
      const byteCommand = `U${13}`;
      console.log('Transmitting command: U');
      BluetoothService.sendCommand(device, byteCommand); // ASCII code for 'S'
    }
  };
  const handleEyeballXChange = (value) => {
    if (device) {
      const byteCommand = `x${value}`; // Append "x" to indicate X-Axis
      BluetoothService.sendCommand(device, byteCommand); // Send the command to adjust eyeball X-axis
      console.log('Eyeball X-Axis:', byteCommand);

    }
  };
  const handleEyeballYChange = (value) => {
   if (device) {
    const command = `y${value}`; // Construct the command string
    BluetoothService.sendCommand(device, command); // Send the command as a string
    console.log('Eyeball Y-Axis:', command);
  }
};
  
  const mouthDown = () => {
    console.log('Device:', device);
    if (device) {
      console.log('Transmitting command: L');
      BluetoothService.sendCommand(device, 20); // ASCII code for 'S'
    }
  };

  const mouthUp = () => {
    console.log('Device:', device);
    if (device) {
      console.log('Transmitting command: L');
      BluetoothService.sendCommand(device, 21); // ASCII code for 'S'
    }
  };
  const handleEyelidChange = (value) => {
    console.log('Eyelid:', value);
    if (device) {
      const command = `e${value}`; // Command format for adjusting eyelid position
      BluetoothService.sendCommand(device, command); // Send the command to adjust eyelid position
    }
  };
  const handleBend = (value) => {
    console.log('Device:', device);
    if (device) {
      console.log('Transmitting command: Bend');
      const command = `B${14}`; // Command format for adjusting eyelid position
      BluetoothService.sendCommand(device, command); // ASCII code for 'S'
    }
  };
  const handleBlink = () => {
    console.log('Blinking...');
    if (device) {
      console.log('Transmitting command: 16');
      const command = `b${17}`; 
      BluetoothService.sendCommand(device, command); // Send the command for blinking
    }
  };

  const blinkDown = () => {
    console.log('Button released');
    if (device) {
      console.log('Transmitting command: 15');
      const command = `d${19}`;
      BluetoothService.sendCommand(device, command );
    }
  };
  const handleButtonUp = () => {
    console.log('Button released');
    if (device) {
      console.log('Transmitting command: 15');
      const command = `U${19}`;
      BluetoothService.sendCommand(device, command );
    }
  };


  const standUp = () => {
    console.log('Button released');
    if (device) {
      console.log('Transmitting command: Stnd12');
      const command = `T${10}`;
      BluetoothService.sendCommand(device, command);
    }
  };


  return (
    <div className="buttons">
  <div className="eyeContainer">
</div>
<img src={eyeWindow} alt="rectangle" className="eyeWindow"/>
<img src={mouthWindow} alt="rectangle" className="mouthWindow"/>

<img src={FrontEyeBar} alt="rectangle" className="frontBar"/>
<img src={FrontEyeBar} alt="rectangle" className="xFrontBar"/>
      <div
        className="rectangle"
        style={{ width: `${width}px` }}
        onMouseDown={xBarDown}
        onMouseMove={xBarMove}
        onMouseUp={xBarUp}
        onMouseLeave={xBarUp}
        min="10" max="160"
      >
        <img src={eyeBar} alt="rectangle" className="rectangle-image" />

      </div>

      <div
        className="yRectangle"
        style={{ height: `${height}px` }}
        onMouseDown={yBarDown}
        onMouseMove={yBarMove}
        onMouseUp={yBarUp}
        onMouseLeave={yBarUp}
        min="10" max="160"
      >
        <img src={eyeBarCopy} alt="rectangle" className="y-rectangle-image" />
      </div>

      
         <div className="legs">
      <button
        onMouseDown={handleBackStart}
        onMouseUp={handleBackStop}
      >
        Move Backward
      </button>

      <button
        onMouseDown={handleCrawlStart}
        onMouseUp={handleForwardStop}
      >
        Move Forward
      </button>

      <button
        onMouseDown={handleRightStart}
        onMouseUp={handleForwardStop}
      >
        Move Right
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





      <button
        onMouseDown={handleBend}
      >
        Bend
      </button>
      </div>
      <div className = "mouth">
        <button
        onMouseDown={mouthDown}
        onMouseUp={mouthUp}
      >
      Mouth
      </button>
      </div>
      <div className='sliders'>
      <div>
        <label className= "xLabel" >X-Axis:</label>
        <input className="xSlider" type="range" min="10" max="160" defaultValue="40" onChange={(e) => handleEyeballXChange(e.target.value)}/>
      </div>
      <div className = "eyeY">
        <label className= "yLabel">Y-Axis:</label>
        <input className="ySlider" type="range" min="10" max="120" defaultValue="40" onChange={(e) => handleEyeballYChange(e.target.value)}/>
      </div>
      <div className="eyelid">
        <label className ="lidLabel">Eyelid:</label>
        <input className="lidSlider" type="range" min="10" max="160" onChange={(e) => handleEyelidChange(e.target.value)}/>
      </div>
     <button className="blink" onMouseDown={handleBlink} onMouseUp={blinkDown}>
  Blink
</button>

    </div>
    </div>
  );
  };

export default HexapodControl;
