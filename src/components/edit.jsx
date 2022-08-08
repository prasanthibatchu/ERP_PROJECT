import { useParams } from "react-router-dom";
import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  Button,
  Grid,
  Box,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Reusabletextfield } from "./reusabletextfield";
import Webcam from "react-webcam";

const axios = require("axios");

const WebcamComponent = () => <Webcam />;

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user",
};
export const Edit = () => {
  let { id } = useParams();

  let history = useNavigate();
  const [loading, setLoading] = useState(true);

  const [user, setUsers] = useState({
    name: "",
    age: "",
    blood_group: "",
  });
  const [photo, setPhoto] = useState("");
  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    const photoSrc = webcamRef.current.getScreenshot();
    setPhoto(photoSrc);
  });

  useEffect(() => {
    getdata();
  }, []);

  const getdata = () => {
    const formdata = new FormData();
    formdata.append("id", id);
    axios.post("/single_user", formdata).then(function (response) {
      if (response.data.status === true) {
        console.log(response.data);
        setUsers({
          name: response.data.data.name,
          age: response.data.data.age,
          blood_group: response.data.data.blood_group,
        });
        setPhoto({
          photo: response.data.data.photo,
        });
        setLoading(false);
      }
    });
  };
  const validateForm = () => {
    const formdata = new FormData();
    formdata.append("id", id);
    formdata.append("name", user.name);
    formdata.append("photo", photo?.split(",")[1]);
    formdata.append("age", user.age);
    formdata.append("blood_group", user.blood_group);

    axios.post("/Edit Worker", formdata).then(function (response) {
      if (response.data.status === true) {
        history("/data");
      } else {
        alert(response.data.msg);
      }
      console.log(response.data);
    });
    console.log(user, photo);
  };

  const onChangeValue = (e) => {
    setUsers({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Update</h2>
      Select ID:{id}
      <Container maxWidth="sm">
        <br /> <br />
        {loading ? (
          <p>fetching data</p>
        ) : (
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
                  name="name"
                  val={user.name}
                  variant="outlined"
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
                      <img src={photo}/>
                     
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
                  name="age"
                  val={user.age}
                  variant="outlined"
                  change={onChangeValue}
                />
              </Grid>
              <Grid item>
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-label">Blood</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    name="bloodgroup"
                    value={user.blood_group}
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
              </Grid>{" "}
              <Grid item>
                <Button variant="contained" onClick={validateForm}>
                  Update
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
    </div>
  );
};
