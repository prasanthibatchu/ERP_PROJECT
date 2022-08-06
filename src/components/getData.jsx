import axios from "axios";
import React, { useEffect,useState } from "react";
import "../App.css"
import {Button}  from '@mui/material'
import { useNavigate } from "react-router-dom";
export const Getdetail = () => {
  const [users, setUsers] = useState([]);
 let history=useNavigate()

  useEffect(() => {
    getdata();
  }, []);

const getdata = () => {
axios.get("/List of all Workers").then(function (res) {
  if(res.data.status === true) {
    setUsers(res.data.data);
    console.log(res.data.data);
   
  } else {
    setUsers({
          
      data: [],
      noData: false,
    });
  }
  console.log(res.data);
}
)
}
const deleteRow = (id) => {
 
  const formdata = new FormData();
  formdata.append("id", id);
  axios.post("/Delete Worker", formdata).then(function (response) {
    if (response.data.status === true) {
      getdata();
    }
    console.log(response.data);
  });
};
 return (
<div className="get">

        <table className="tab">
          <thead className="hd">
            <th>ID</th>
            <th>NAME</th>
            <th>AGE</th>
            <th>BLOOD GROUP</th>

            <th>ADDED TIME</th>
            <th>PHOTO</th>
            <th>EDITED TIME</th>
            <th>EDIT DETAILS</th>
            <th>DELETE</th>DE
          
          </thead>
          <tbody>
         
            { users.length > 0 &&
            users.map((user) => {
              return (
                <tr>
                  {/* {JSON.stringify(photo)}  */}
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.blood_group}</td>                  
                  <td>{user.Added_Date}</td>
                  <td>
                   
                        <img
                          src={`http://192.168.1.51:3335/static/uploads/${user.photo}`}
                          alt="IMAGE"
                          width="150"
                          height="150"
                        />
                      
                      </td>
                      <td>{user.Edited_Date }</td>

                      <td>
                            <form>
                              <Button
                                variant="contained"
                                color="success"
                                onClick={() => history('/edit',
                                {state:{name: user?.name,age:user?.age}})}
                              >
                                Edit
                              </Button>
                            </form>
                          </td>
                          <td>
                            <form>
                              <Button
                                variant="contained"
                                color="error"
                                onClick={() => deleteRow(user.id)}
                              >
                                Delete
                              </Button>
                            </form>
                          </td>
                                  
                </tr>
              );
            })}
          </tbody>
        </table>
      
    </div>
  );
};