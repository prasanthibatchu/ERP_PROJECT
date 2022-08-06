import React, {useState} from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';


export const FaceAuth = () => {
  const webcamRef = React.useRef(null);
  const videoConstraints = {
    width : 200,
    height : 200,
    facingMode: 'user'
  };
  const[name, setName] = useState('')
  const [image,setImage]=useState('');
  const capture = React.useCallback(  () => {
    let imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc)
    console.log(`imageSrc = ${imageSrc}`)
  
  }, 
   [webcamRef]
  );


  return (
    <div className="webcam-container">
                <div className="webcam-img">
    
                     {image == '' ? <Webcam
                        audio={false}
                        height={200}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={220}
                        videoConstraints={videoConstraints}
                    /> : <img src={image} />}
                </div>
                <div>
                    {image != '' ?
                        <button onClick={(e) => {
                            e.preventDefault();
                            setImage('')
                        }}
                            className="webcam-btn">
                            Retake Image</button> :
                        <button onClick={(e) => {
                            e.preventDefault();
                            capture();
                        }}
                            className="webcam-btn">Capture</button>
                    }
                    
                </div>
                <div>

                </div>
                {name}
            </div>
        );
    };



