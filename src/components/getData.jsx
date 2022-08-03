import axios from "axios";
import React, { useEffect,useState } from "react";
import "../App.css"
export const Getdetail = () => {
  const [users, setUsers] = useState([]);
 

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
            
          
          </thead>
          <tbody>
            { users.length > 0 &&
            users.map((user) => {
              return (
                <tr>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.blood_group}</td>
                  
                  <td>{user.Added_Date}</td>
                  
                  <td>
                        <img
                          src={`http://192.168.1.51:5335/static/uploads/${user.photo}`}
                          alt="IMAGE"
                          width="150"
                          height="150"
                        />
                      
                      </td>
                      <td>{user.Edited_Date }</td>

                  <td>
                    <button
                      size="small"
                      variant="contained"
                      color="success"
                      
                    >
                      Edit
                    </button>
                  </td>
                                  
                </tr>
              );
            })}
          </tbody>
        </table>
      
    </div>
  );
};