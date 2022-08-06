import Webcam from "react-webcam";
import React, { useRef, useState, useCallback } from "react";
import {
  Button,
  Grid,
  Box,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Reusabletextfield } from "./reusabletextfield";
const axios = require("axios");

const WebcamComponent = () => <Webcam />;

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user",
};

export const Add = () => {
  let history = useNavigate();

  const [user, setUsers] = useState({
    name: "",
    age: "",
    bloodgroup: "",
  });
  const [photo, setPhoto] = useState("");
  const [err, setErr] = useState(0);
  const webcamRef = useRef(null);
//  const [dpic,setDpic]=useState("")

  const capture = useCallback(() => {
        const photoSrc = webcamRef.current.getScreenshot();
        setPhoto(photoSrc);
     console.log(photoSrc);
      });

  const validateForm = () => {
    setErr(0);

    if (user.name === "") {
      setErr(1);
      alert("Please enter Name");
    }
    else if(photo === ""){
     
      alert("please capture your image")
    }
     else if (user.age === "") {
      setErr(3);
      alert("Please enter your age");
    } else if (user.bloodgroup === "") {
      setErr(4);
      alert("please select your blood group");
    } else {
     
      
      const formdata = new FormData();

      formdata.append("name", user.name);
      formdata.append("photo", photo?.split(",")[1]);
      formdata.append("age", user.age);
      formdata.append("blood_group", user.bloodgroup);
      
      axios.post("/Add Worker", formdata).then(function(response) {
        if (response.data.status === true) {
          history("/data");
        } else {
          alert(response.data.msg);
        }
        console.log(response.data);
      });
      console.log(user, photo);
    }
  };

  const onChangeValue = (e) => {
    setUsers({ ...user, [e.target.name]: e.target.value });
  };

 

  return (
   
    <div>
      <Container maxWidth="sm">
        <Box
          m={4}
          p={4}
          style={{
            border: "1px solid black",
            borderRadius: "5px",
            backgroundColor: "white",
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            spacing={5}
          >
            <Grid item>
              <Reusabletextfield
                label="Name*"
                variant="outlined"
                name="name"
                val={user.name}
                error={err === 1 && true}
                change={onChangeValue}
              />
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
              <Reusabletextfield
                label="age*"
                type="number"
                variant="outlined"
                name="age"
                val={user.age}
                error={err === 3 && true}
                change={onChangeValue}
              />
            </Grid>
            <Grid item>
              <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-label">Blood</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={user.bloodgroup}
                  name="bloodgroup"
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
              <Button variant="contained" onClick={validateForm}>
                ADD
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
    
  );
};
