import { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';

function App() {
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const keysPressed = useRef({});

  const speed = 5;

  function handleResize(){
    setWidth(window.innerWidth % 255) ;
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
  }, [handleResize]);

  const handleKeyDown = useCallback((event) => {
    keysPressed.current[event.key] = true;
  }, []);

  const handleKeyUp = useCallback((event) => {
    keysPressed.current[event.key] = false;
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useEffect(() => {
    function updatePosition() {
      let deltaX = 0;
      let deltaY = 0;

      if (keysPressed.current['ArrowLeft']) {
        deltaX -= speed;
        console.log('Moving Left:', deltaX);
      }
      if (keysPressed.current['ArrowRight']) {
        deltaX += speed;
        console.log('Moving Right:', deltaX);
      }
      if (keysPressed.current['ArrowUp']) {
        deltaY -= speed;
        console.log('Moving Up:', deltaY);
      }
      if (keysPressed.current['ArrowDown']) {
        deltaY += speed;
        console.log('Moving Down:', deltaY);
      }

      setXPos(prevX => {
        const newX = Math.max(0, Math.min(prevX + deltaX, window.innerWidth - 50)); // Assuming element width is 50px
        console.log('New X Position:', newX);
        return newX;
      });

      setYPos(prevY => {
        const newY = Math.max(0, Math.min(prevY + deltaY, window.innerHeight - 50)); // Assuming element height is 50px
        console.log('New Y Position:', newY);
        return newY;
      });

      requestAnimationFrame(updatePosition);
    }

    requestAnimationFrame(updatePosition);
  }, []);


  const color = `rgb(${width % 255}, ${(width + 70) % 255}, 0)`;

  return (
    <>
      <div className="Text">
        <div style={{ 
          backgroundColor: color, 
          transform: `translate(${xPos}px, ${yPos}px)`,
          position: 'absolute', // Ensure positioning is set correctly
          top: 0,
          left: 0,
          height : '30px',  
          width : '30px'
        }}>
        </div>
      </div>
    </>
  );
}

export default App;
