import React, { useState } from 'react';
import BluetoothService from '../bluetooth/bluetoothServices';
import './controller.css';
import eyeBar from '../Images/eyeBar.png';
import eyeBarCopy from '../Images/eyeBarCopy.png';
import eyeWindow from '../Images/eyeWindow.png';
import FrontEyeBar from '../Images/FrontEyeBar.png';
import mouthWindow from '../Images/mouthWindow.png';
import crawl_forward from '../Images/crawl_forward.png';
import crawl_backward from '../Images/crawl_backward.png';
import crawl_right from '../Images/crawl_right.png';
import crawl_left from '../Images/crawl_left.png';
import stand_image from '../Images/stand.png';
import squat_down from '../Images/squat_down.png';
import body_window from '../Images/body_window.png';
import blink_button from '../Images/blink_button.png';
import mouth from '../Images/mouth.png';
import stretch_image from '../Images/stretch_image.png';

const HexapodControl = ({ device }) => {
  const [width, setWidth] = useState(140);
  const [height, setHeight] = useState(100);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);

  const startCrawl = (direction) => {
    if (device) {
      BluetoothService.sendCommand(device, direction);
    }
  };

  const stopCrawl = (direction) => {
    if (device) {
      BluetoothService.sendCommand(device, `${direction}0`);
    }
  };

  const handleLeftStart = () => {
    console.log('Crawling left...');
    startCrawl('L');
  };

  const handleLeftStop = () => {
    console.log('Stopping crawl left...');
    stopCrawl('L');
  };

  const handleRightStart = () => {
    console.log('Crawling right...');
    startCrawl('R');
  };

  const handleRightStop = () => {
    console.log('Stopping crawl right...');
    stopCrawl('R');
  };

  const handleBackStart = () => {
    console.log('Crawling backward...');
    startCrawl('Z');
  };

  const handleBackStop = () => {
    console.log('Stopping crawl backward...');
    stopCrawl('Z');
  };

  const handleForwardStart = () => {
    console.log('Crawling forward...');
    startCrawl('F');
  };

  const handleForwardStop = () => {
    console.log('Stopping crawl forward...');
    stopCrawl('F');
  };

  const handleStretch = () => {
    console.log('Stretching...');
    if (device) {
      BluetoothService.sendCommand(device, 'S');
    }
  };

  const handleMouseUp = () => {
    console.log('Mouse released - executing lift and stretch...');
    if (device) {
      BluetoothService.sendCommand(device, 'U');
      setTimeout(() => {
        BluetoothService.sendCommand(device, 'S');
      }, 500);
    }
  };

  const standLift = () => {
    console.log('Lifting and standing...');
    if (device) {
      BluetoothService.sendCommand(device, 'U');
    }
  };

  const standUp = () => {
    console.log('Standing...');
    if (device) {
      BluetoothService.sendCommand(device, 'T');
    }
  };

  const mouthDown = () => {
    console.log('Mouth down...');
    if (device) {
      BluetoothService.sendCommand(device, 'L20');
    }
  };

  const mouthUp = () => {
    console.log('Mouth up...');
    if (device) {
      BluetoothService.sendCommand(device, 'L21');
    }
  };

  const handleBend = () => {
    console.log('Bending...');
    if (device) {
      BluetoothService.sendCommand(device, 'B');
    }
  };

  const handleBlink = () => {
    console.log('Blinking...');
    if (device) {
      BluetoothService.sendCommand(device, 'd');
    }
  };

  const xBarDown = (e) => {
    setDragging(true);
    setStartX(e.clientX);
  };

  const xBarMove = (e) => {
    if (dragging) {
      const deltaX = e.clientX - startX;
      const newWidth = width + deltaX;
      const clampedWidth = Math.min(Math.max(newWidth, 20), 160);
      setWidth(clampedWidth);
      if (device) {
        BluetoothService.sendCommand(device, `x${clampedWidth}`);
      }
      setStartX(e.clientX);
    }
  };

  const xBarUp = () => {
    setDragging(false);
  };

  const yBarDown = (e) => {
    setDragging(true);
    setStartY(e.clientY);
  };

  const yBarMove = (e) => {
    if (dragging) {
      const deltaY = e.clientY - startY;
      const newHeight = height + deltaY;
      const clampedHeight = Math.min(Math.max(newHeight, 20), 160);
      setHeight(clampedHeight);
      if (device) {
        BluetoothService.sendCommand(device, `y${clampedHeight}`);
      }
      setStartY(e.clientY);
    }
  };

  const yBarUp = () => {
    setDragging(false);
  };

  return (
    <div className="buttons">
      <div className="eyeContainer"></div>
      <img src={eyeWindow} alt="rectangle" className="eyeWindow" />
      <img src={mouthWindow} alt="rectangle" className="mouthWindow" />
      <img src={FrontEyeBar} alt="rectangle" className="yFrontBar" />
      <img src={FrontEyeBar} alt="rectangle" className="frontBar" />

      <div
        className="xrectangle"
        style={{ width: `${width}px` }}
        onMouseDown={xBarDown}
        onMouseMove={xBarMove}
        onMouseUp={xBarUp}
        onMouseLeave={xBarUp}
        min="10"
        max="160"
      >
        <img src={eyeBar} alt="rectangle" className="x-rectangle-image" />
      </div>

      <div
        className="yRectangle"
        style={{ height: `${height}px` }}
        onMouseDown={yBarDown}
        onMouseMove={yBarMove}
        onMouseUp={yBarUp}
        onMouseLeave={yBarUp}
        min="10"
        max="160"
      >
        <img src={eyeBarCopy} alt="rectangle" className="y-rectangle-image" />
      </div>

      <div className="legs">
        <button
          className="backward_button"
          onMouseDown={handleBackStart}
          onMouseUp={handleBackStop}
        >
          <img
            src={crawl_backward}
            alt="rectangle"
            className="crawlbackward"
          />
        </button>

        <button
          className="forward_button"
          onMouseDown={handleForwardStart}
          onMouseUp={handleForwardStop}
        >
          <img src={crawl_forward} alt="rectangle" className="crawlforward" />
        </button>

        <button
          className="right_button"
          onMouseDown={handleRightStart}
          onMouseUp={handleRightStop}
        >
          <img src={crawl_right} alt="rectangle" className="crawlright" />
        </button>

        <button
          className="left_button"
          onMouseDown={handleLeftStart}
          onMouseUp={handleLeftStop}
        >
          <img src={crawl_left} alt="rectangle" className="crawlleft" />
        </button>
      </div>

      <div className="bend">
        <button
          className="bend_button"
          onMouseDown={handleBend}
          onMouseUp={handleMouseUp}
        >
          <img src={squat_down} alt="rectangle" className="bendbutton" />
        </button>

        <button
          className="stand_button"
          onMouseDown={standLift}
          onMouseUp={standUp}
        >
          <img src={stand_image} alt="rectangle" className="standbutton" />
        </button>

        <button
          className="mouth_button"
          onMouseDown={mouthDown}
          onMouseUp={mouthUp}
        >
          <img src={mouth} alt="rectangle" className="mouthbutton" />
        </button>

        <button className="stretch_button" onMouseDown={handleStretch}>
          <img
            src={stretch_image}
            alt="rectangle"
            className="stretcher"
          />
        </button>
      </div>

      <div className="eyebar"></div>
      <img src={body_window} alt="rectangle" className="bodyWindow" />
      <button className="blink_button" onClick={handleBlink}>
        <img src={blink_button} alt="rectangle" className="blinkbutton" />
      </button>
      <div className="xrectangle"></div>
    </div>
  );
};

export default HexapodControl;
