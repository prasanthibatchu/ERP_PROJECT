import { useParams } from 'react-router-dom'
import React,{ useRef, useState, useCallback,useEffect} from 'react'
import { Button,Grid, Box, Container,FormControl,InputLabel,Select,MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {Reusabletextfield} from './reusabletextfield'
import Webcam from "react-webcam";
import {useLocation} from 'react-router-dom';
const axios = require('axios');

const WebcamComponent = () => <Webcam />;

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user",
};
export const Edit = (props) => {
  
    let { id } = useParams();
   
  let history = useNavigate();
  const location = useLocation();

  console.log(location,"Edit")
  
  const [user, setUsers] = useState({
    name: "", age: "",bloodgroup:""
   });
   const [photo, setPhoto] = useState("");
   const webcamRef = useRef(null);
   const capture = useCallback(() => {
         const photoSrc = webcamRef.current.getScreenshot();
         setPhoto(photoSrc);
       });
  const [err, setErr] = useState(0);
  useEffect(() => {
    getdata();

  }, [])
  const getdata = () => {
    const formdata = new FormData()
    formdata.append('id', id)
    axios.post('/List of all Workers', formdata)
      .then(function (response) {
        if (response.data.status === true) {
          console.log(response.data)
         {
          setUsers({name: response.data.data.name, age: response.data.data.age, bloodgroup: response.data.data.blood_group})
         }
         {
          setPhoto({photo: response.data.data.photo})
         }
        }
        console.log(response.data);

      });

  }
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
      formdata.append("id", id);
      formdata.append("name", user.name);
      formdata.append("photo", photo );
      formdata.append("age", user.age);
      formdata.append("blood_group", user.bloodgroup);
      
      axios.post('/Edit Worker', formdata)
        .then(function (response) {
          if (response.data.status === true) {
            history("/data")
          } else {
            alert(response.data.msg)
          }
          console.log(response.data);
        });
    console.log(user,photo)
    }

  }

  const onChangeValue = (e) => {
    setUsers({ ...user, [e.target.name]: e.target.value });

  }
 
  return (
    <div>
      <h2>Edit</h2>
      Select ID:{id}
    
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
              <div className="webcam-container">
                <div className="webcam-img">
                  {photo == "" ? (
                    <Webcam
                      audio={false}
                      height={200}
                      ref={webcamRef}
                      screenshotFormat="photo/jpeg"
                      width={220}
                      videoConstraints={videoConstraints}
                     
                    />
                  ) : (
                    <img src={photo} />
                  )}
                </div>
                <div>
                  {photo != "" ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setPhoto("");
                      }}
                      className="webcam-btn"
                    >
                      Retake photo
                     
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        capture();
                      }}
                      className="webcam-btn"
                    >
                      Capture
                    </button>
                  )}
                </div>
              </div>
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
            <Button variant='contained' onClick={validateForm}>Update</Button>
           </Grid>
           </Grid>
        </Box>
      </Container>
    </div>
  );
}
