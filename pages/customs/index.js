// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import BoxDrawing from '@/components/BoxDrawing';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import SmartToyIcon from '@mui/icons-material/SmartToy';
// import ColorLensIcon from '@mui/icons-material/ColorLens';
// import Dragg from '@/components/dragg';

// const ColorSelector = ({ setNewColor }) => {
//   const colors = ['white', 'black', 'yellow', 'blue', 'red'];
//   const [activeColor, setActiveColor] = useState('white');

//   const handleColorClick = (color) => {
//     if (color !== activeColor) {
//       setActiveColor(color);
//       setNewColor(color);
//     }
//   };

//   return (
//     <div className="color-content">
//       <h4>SELECT COLOR</h4>
//       <div className="color-groups">
//         {colors.map((color) => (
//           <div
//             key={color}
//             className={`color color-${color} ${color === activeColor ? 'active-color' : ''}`}
//             onClick={() => handleColorClick(color)}
//           ></div>
//         ))}
//       </div>
//     </div>
//   );
// };

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `vertical-tab-${index}`,
//     'aria-controls': `vertical-tabpanel-${index}`,
//   };
// }

//   const App = () => {

//   const [boxDrawingValues, setBoxDrawingValues] = useState({
//     startX: 0,
//     startY: 0,
//     endX: 0,
//     endY: 0,
//   });
//   const [imageData, setImageData] = useState(false);
//   const [value, setValue] = useState(0);
//   const [activeColor, setActiveColor] = useState('white');
//   const [textareaValue, setTextareaValue] = useState('');
//   const [selectedFile, setSelectedFile] = useState(null);

//   const setNewColor = (color) => {
//     setActiveColor(color);
//   };

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const handleTextareaChange = (e) => {
//     setTextareaValue(e.target.value);
//   };

//   const handleTextareaResize = (e) => {
//     e.target.style.height = '63px';
//     let scrollHeight = e.target.scrollHeight;
//     e.target.style.height = `${scrollHeight}px`;
//   };

//   const handleBoxDrawingValuesChange = (values) => {
//     setBoxDrawingValues(values);
//     console.log('BoxDrawing values:', values);
//   };

//   const handleFileChange = (e) => {
//     setSelectedFile(URL.createObjectURL(e.target.files[0]));
//   };

//   const handleBuyNow = () => {
//     onAdd(product, qty);

//     setShowCart(true);
//   }
  

//   const handleSubmit = () => {
//     const boxDrawingValuesArray = Object.values(boxDrawingValues);
//     const formattedBoxDrawingValues = boxDrawingValuesArray.join('_');
//     const formattedTextareaValue = textareaValue.replace(/ /g, '_');

//     const postData = `prompt-input=${formattedTextareaValue} ${activeColor} ${formattedBoxDrawingValues}`;

//     fetch('https://b729-34-71-203-48.ngrok-free.app/submit-prompt', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: postData,
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.text();
//       })
//       .then(data => {
//         var html_code = data;
//         var regex = /src="(.*?)"\sclass=/;
//         var match = html_code.match(regex);

//         // Assuming match[1] contains the base64 image
//         console.log(match[1])

//         setImageData(match[1]);
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   };

//   return (
//     <header>
//       <section className="banner-wrapper">
//         <div className='both-image'>
//           <div className="imagecomponent">

//             <BoxDrawing imageUrl={`./img/tshirt_${activeColor}.jpg`} onValuesChange={handleBoxDrawingValuesChange} imggg={imageData}/>
//           </div>
//           <div className="generated-image" style={{ position: 'relative' }} >
//           {!selectedFile &&<img src={`./img/tshirt_${activeColor}.jpg`} alt="Generated Image"/>}
//           {/* <canvas id="ccc" width={600} height={400} ></canvas> */}
//           {selectedFile ?
//             <div style={{ position: 'absolute', top: 0, left: 0 }}>
//             <Dragg upload={selectedFile} back={`./img/tshirt_${activeColor}.jpg`}/>
//               </div> : null
//             }
//           </div>
//          </div>
//         <div className="customs-buttons">
//             <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
//             <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
//           </div>
//         {/* TABS */}
//         <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}>
//           <div>
//             <Tabs
//               orientation="vertical"
//               variant="standard"
//               value={value}
//               onChange={handleChange}
//               aria-label="Vertical tabs example"
//               sx={{ borderRight: 1, borderColor: 'divider' }}
//             >
//               <Tab icon={<CloudUploadIcon />} label="Upload File" {...a11yProps(1)} onClick={() => {
//                 setImageData(false)}} />
//               <Tab icon={<ColorLensIcon />} label="Select Color" {...a11yProps(2)} onClick={() => {
//                 setImageData(false)}}/>
//               <Tab icon={<SmartToyIcon />} label="Generate" {...a11yProps(3)} onMouseUp={() => {
//                 setImageData(true)}}/>
//             </Tabs>
//           </div>
//           <TabPanel value={value} index={0}>
//             <span className="file-upload">
//               <input type="file" onChange={handleFileChange} />
//             </span>
//           </TabPanel>
//           <TabPanel value={value} index={1}>
//             <div className="colorselector">
//               <ColorSelector setNewColor={setNewColor} />
//             </div>
//           </TabPanel>
//           <TabPanel value={value} index={2}>
//             <div className="wrapper">
//               <textarea
//                 spellCheck="false"
//                 placeholder="Type something here..."
//                 value={textareaValue}
//                 onChange={handleTextareaChange}
//                 onKeyUp={handleTextareaResize}
//               ></textarea>
//               <button onClick={() => {
//                 handleSubmit();
                
//               }}>Submit</button>
//             </div>
//           </TabPanel>
//         </Box>
//         {/* TABS-END */}
//       </section>
//     </header>
//   );
// };

// export default App;
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BoxDrawing from '@/components/BoxDrawing';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import Dragg from '@/components/dragg';
import Link from 'next/link';
import { generateSlug } from '../../utils/generateSlug';
import { useRouter } from 'next/router';


const ColorSelector = ({ setNewColor }) => {
  const colors = ['white', 'black', 'yellow', 'blue', 'red'];
  const [activeColor, setActiveColor] = useState('white');

  const handleColorClick = (color) => {
    if (color !== activeColor) {
      setActiveColor(color);
      setNewColor(color);
    }
  };

  return (
    <div className="color-content">
      <h4>SELECT COLOR</h4>
      <div className="color-groups">
        {colors.map((color) => (
          <div
            key={color}
            className={`color color-${color} ${color === activeColor ? 'active-color' : ''}`}
            onClick={() => handleColorClick(color)}
          ></div>
        ))}
      </div>
    </div>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const App = () => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(null);

  const [boxDrawingValues, setBoxDrawingValues] = useState({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  });

  const [value, setValue] = useState(0);
  const [activeColor, setActiveColor] = useState('white');
  const [textareaValue, setTextareaValue] = useState('');
  const [imageData, setImageData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dynamicProductSlug, setDynamicProductSlug] = useState('some-slug');
  const [boxtrue, setboxtrue] = useState(false);


  useEffect(() => {
    // Simulate fetching the dynamicProductSlug asynchronously
    // In a real scenario, replace this with actual fetching logic
    const fetchDynamicProductSlug = async () => {
      // Simulating an asynchronous delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generate a slug using our utility function
      const slug1 = generateSlug();
      setDynamicProductSlug(slug1);
    };

    fetchDynamicProductSlug();
  }, []);

  if (!dynamicProductSlug) {
    // Return a loading state or handle the case where dynamicProductSlug is not available yet
    return <div>Loading...</div>;
  }

  const cproductDetails = {
    cname: 'Product Name',
    cdetails: 'Product Details',
    cprice: 50,
    cimage: '/img/black_tshirt.png', // Add the image path or URL
    // Add other details as needed
  };

  const handleButtonClick = () => {
    router.push({
      pathname: '/dynamic-product/[slug1]',
      query: {
        slug1: dynamicProductSlug,
        ...cproductDetails,
      },
    });
  };




  const setNewColor = (color) => {
    setActiveColor(color);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
  };

  const handleTextareaResize = (e) => {
    e.target.style.height = '63px';
    let scrollHeight = e.target.scrollHeight;
    e.target.style.height = `${scrollHeight}px`;
  };

  const handleBoxDrawingValuesChange = (values) => {
    setBoxDrawingValues(values);
    console.log('BoxDrawing values:', values);
  };

  const handleFileChange = (e) => {
    setSelectedFile(URL.createObjectURL(e.target.files[0]));
  };

  // const handleUploadSubmit = () => {
  //   if (selectedFile) {
  //     // Pass the selected file to the Dragg component
  //     handleDraggUpload(selectedFile);
  //   }
  // };

  // const handleDraggUpload = (file) => {
  //   const uploadedImageUrl = URL.createObjectURL(file);
  //   setImageUrl(uploadedImageUrl);
  //   console.log('File uploaded to Dragg:', file);
  // };
  // const handleBuyNow = () => {
  //   onAdd(product, qty);

  //   setShowCart(true);
  // }

  const handleSubmit = () => {
    const boxDrawingValuesArray = Object.values(boxDrawingValues);
    const formattedBoxDrawingValues = boxDrawingValuesArray.join('_');
    const formattedTextareaValue = textareaValue.replace(/ /g, '_');

    const postData = `prompt-input=${formattedTextareaValue} ${activeColor} ${formattedBoxDrawingValues}`;

    fetch('https://036f-104-198-7-19.ngrok-free.app/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: postData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        var html_code = data;
        var regex = /src="(.*?)"\sclass=/;
        var match = html_code.match(regex);

        // Assuming match[1] contains the base64 image
        console.log(match[1])

        setImageData(match[1]);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <header>
      <section className="banner-wrapper">
        <div className='both-image'>
          <div className="imagecomponent">
            <BoxDrawing imageUrl={`./img/${activeColor}_tshirt.png`} onValuesChange={handleBoxDrawingValuesChange} imggg={boxtrue} />
          </div>
          <div className="generated-image" style={{ position: 'relative' }}>
            {imageData ? (
              <React.Fragment>
                {!selectedFile && <img src={`${imageData}`} alt="Generated Image" />}
                {selectedFile && (
                  <div style={{ position: 'absolute', top: 0, left: 0 }}>
                    <Dragg upload={selectedFile} back={`${imageData}`} />
                  </div>
                )}

              </React.Fragment>
            ) : (
              <Dragg upload={selectedFile} back={`./img/${activeColor}_tshirt.png`} />
            )}
          </div>

        </div>

        <div className='finalise'>
          <Link href={`/dynamic-product/${dynamicProductSlug}`}>
            <button type='button' className='finalise-button' onClick={handleButtonClick}>VIEW PRODUCT</button>
          </Link>
        </div>

        {/* TABS */}
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}>
          <div>
            <Tabs
              orientation="vertical"
              variant="standard"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              <Tab icon={<CloudUploadIcon />} label="Upload File" {...a11yProps(1)} onClick={() => {
                setboxtrue(false)
              }} />
              <Tab icon={<ColorLensIcon />} label="Select Color" {...a11yProps(2)} onClick={() => {
                setboxtrue(false)
              }} />
              <Tab icon={<SmartToyIcon />} label="Generate" {...a11yProps(3)} onClick={() => {
                setboxtrue(true)
              }} />
            </Tabs>
          </div>
          <TabPanel value={value} index={0}>
            <span className="file-upload">
              <input type="file" onChange={handleFileChange} />
              {/* {selectedFile && (
                <div className="image-preview">
                  <img src={URL.createObjectURL(selectedFile)} alt="Preview" />
                </div>
              )} */}
              {/* <button onClick={handleUploadSubmit}>Submit</button> */}
            </span>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className="colorselector">
              <ColorSelector setNewColor={setNewColor} />
            </div>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div className="wrapper">
              <textarea
                spellCheck="false"
                placeholder="Type something here..."
                value={textareaValue}
                onChange={handleTextareaChange}
                onKeyUp={handleTextareaResize}
              ></textarea>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </TabPanel>
        </Box>
        {/* TABS-END */}
      </section>
    </header>
  );
};

export default App;