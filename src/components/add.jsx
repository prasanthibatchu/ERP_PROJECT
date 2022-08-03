import Webcam from "react-webcam";
import React,{useRef,useState,useCallback} from 'react'
import { Button,Grid, Box, Container,Avatar,FormControl,InputLabel,Select,MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {Reusabletextfield} from './reusabletextfield'
const axios = require('axios');

const videoConstraints = {
  width: 100,
  facingMode: "environment",
};

export const Add = () => {
  let history = useNavigate();
  
  const [user, setUsers] = useState({
    name: "", age: "",bloodgroup:""
  });
  const [pic, setPic] = useState("");
  const [err, setErr] = useState(0)
  const [photo, setPhoto] = useState("");

//webcam
  const webcamRef = useRef(null);
  const [url, setUrl] = useState(null);
 
  const capturePhoto = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
  }, [webcamRef]);
 
  const onUserMedia = (e) => {
    console.log(e);
  };


  const validateForm = () => {
    setErr(0)

    if (user.name === "") {
      setErr(1)
      alert("Please enter Name")

    } 
   
    else if (user.age === "") {
      setErr(3)
      alert("Please enter your age")
    }
    else if(user.bloodgroup === ""){
        setErr(4)
        alert("please select your blood group")
    }
    else {
      const formdata = new FormData();
      
      formdata.append("name", user.name);
      formdata.append("photo", photo);
      formdata.append("age", user.age);
      formdata.append("blood_group", user.bloodgroup);
      formdata.append("dpic", pic.raw);
      axios.post('/Add Worker', formdata)
        .then(function (response) {
          if (response.data.status === true) {
            history("/data")
          } else {
            alert(response.data.msg)
          }
          console.log(response.data);
        });
    console.log(user)
    }

  }

  const onChangeValue = (e) => {
    setUsers({ ...user, [e.target.name]: e.target.value });

  }
 
  return (
    <div>
      <Container maxWidth="sm">
        <Box m={4} p={4} style={{ border: "1px solid black", borderRadius: "5px", backgroundColor: "white" }}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            spacing={5}
          >
           <Grid item>
            <Reusabletextfield label="Name*" variant="outlined" name="name" val={user.name} error={err===1 && true} change={onChangeValue} />
            </Grid>
            <Grid item>
              <Button>
            <Webcam
        ref={webcamRef}
        audio={true}
        screenshotFormat="image/png"
        videoConstraints={videoConstraints}
        onUserMedia={onUserMedia}
        mirrored={true}
       
                  
                  type="file"
                  id="contained-button-file1"
                  onChange={(e) => {
                    if (e.target.files.length !== 0) {
                      const image = e.target.files[0];
                      setPic({
                        raw: image,
                        preview: URL.createObjectURL(image),
                      });
                    }
                    e.target.value = "";
                  }}
                
        />
        <button onClick={capturePhoto}>
        
          Capture</button>
        <button onClick={() => setUrl(null)}>Refresh</button>
        {url && (
          <div>
            <img src={url} alt="Screenshot" />
          </div>
        )}

</Button>    

            </Grid>
            <Grid item>
            <Reusabletextfield label="age*" type="number" variant="outlined" name="age" val={user.age} error={err===3 && true} change={onChangeValue} />
            </Grid>
            <Grid item>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Blood</InputLabel>
        <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={user.bloodgroup}
        name = "bloodgroup"
        label="Blood Group"
        onChange={onChangeValue}
      >
          <MenuItem value={"O+"}>O+</MenuItem>
          <MenuItem value={"O-"}>O-</MenuItem>
          <MenuItem value={"B+"}>B+</MenuItem>
          <MenuItem value={"B-"}>B-</MenuItem>
          <MenuItem value={"AB-"}>AB-</MenuItem>
          <MenuItem value={"AB+"}>AB+</MenuItem>
          <MenuItem value={"A-"}>A-</MenuItem>
          <MenuItem value={"A+"}>A+</MenuItem>
        </Select>
      </FormControl>
           
            </Grid>
       
           
           <Grid item>
            <Button variant='contained' onClick={validateForm}>ADD</Button>
           </Grid>
           </Grid>
        </Box>
      </Container>
    </div>
  );
}
