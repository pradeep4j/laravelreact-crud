import React from 'react';
import axios from 'axios';
import {NotificationManager} from 'react-notifications';

import {Link} from 'react-router-dom';

const StudentRecord = ({StudentRecord}) => {
  const deletestudent = async(e,id) => {
    e.currentTarget.innerText='Deleting';
    await axios.delete(`http://localhost:8000/api/delete-student/${id}`).then(resp =>{
        if(resp.data.status ===200){
          e.target.closest("tr").remove();
          NotificationManager.success('Student deleted successfully!','Deleted Success!',5000);
        }
    }).catch(err =>{
        NotificationManager.success('Something went wrong on deletion!','Deletion Failure!',10000);
    });
  }
 
  return (
    <tr>
        <td>{StudentRecord.name}</td>
        <td>{StudentRecord.course}</td>
        <td>{StudentRecord.email}</td>
        <td>{StudentRecord.phone}</td>
        <td><Link className='btn btn-success btn-sm' to={`edit-student/${StudentRecord.id}`} >Edit</Link></td>
        <td><button className='btn btn-danger btn-sm' onClick={(e) => deletestudent(e,StudentRecord.id)}>Delete</button></td> 
    </tr>
  )
}

export default StudentRecord;