

import React, { useState, useRef, useEffect } from 'react';
import { fabric } from 'fabric';

function Dragg({ upload ,back}) {
  const [canvas, setCanvas] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const newCanvas = new fabric.Canvas(canvasRef.current);
    setCanvas(newCanvas);
    
  
    // Cleanup function
    return () => {
      console.log("dispose")
      newCanvas.dispose();
    };
  }, []); // Only run this effect once during the initial render

    useEffect(() => {
      if (canvas) {
        fabric.Image.fromURL(back, function(img) {
          img.scaleToWidth(canvas.width);
          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
        });
      }
    }, [canvas, back]);

  useEffect(() => {
    console.log("2")
    // Ensure canvas is defined before attempting to clear it
    if (canvas) {
  
      var deleteIcon = "./img/dustbin.png";

  var imgg = document.createElement('img');
  imgg.src = deleteIcon;
      // Clear the existing canvas content
      // canvas.clear();

      // Load an image
      
      fabric.Image.fromURL(upload, (img) => {
        // Retrieve saved properties from localStorage
        const savedProperties = localStorage.getItem('imageProperties');
        const properties = savedProperties ? JSON.parse(savedProperties) : { left: 100, top: 100, scaleX: 0.2, scaleY: 0.2 };

        // Set image properties (e.g., width, height, position)
        img.set(properties);

        // Add image to the canvas
        canvas.add(img);

        // Event listener for changes in object position and size
        img.on('modified', () => {
          // Update the fixed position after user interaction
          img.setCoords();

          // Save the new position and scale to localStorage
          localStorage.setItem('imageProperties', JSON.stringify({
            left: img.left,
            top: img.top,
            scaleX: img.scaleX,
            scaleY: img.scaleY,
          }));
          fabric.Object.prototype.controls.deleteControl = new fabric.Control({
            x: 0.5,
            y: -0.5,
            offsetY: 16,
            cursorStyle: 'pointer',
            mouseUpHandler: deleteObject,
            render: renderIcon,
            cornerSize: 24
          });
      
          function deleteObject(eventData, transform) {
            const target = transform.target;
            const canvas = target.canvas;
            canvas.remove(target);
            canvas.requestRenderAll();
          }
          function renderIcon(ctx, left, top, styleOverride, fabricObject) {
            var size = this.cornerSize;
            ctx.save();
            ctx.translate(left, top);
            ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
            ctx.drawImage(imgg, -size/2, -size/2, size, size);
            ctx.restore();
          }
        
          canvas.renderAll();
        });
      });
      
     
    }
    
    
  }, [canvas,upload]); 
  const mergeImages = () => {
    // Merge the canvas content with the background image
    const mergedImageURL = canvas.toDataURL('image/png');
    console.log(mergedImageURL);

    // Now you can use the mergedImageURL as needed (e.g., display it, save it, etc.)
  };// Include canvas and upload in the dependency array

  return (
    <>
      <canvas ref={canvasRef} width={400} height={600} ></canvas>
      <button onClick={mergeImages}>Merge Images</button>
    </>
  );
}

export default Dragg;