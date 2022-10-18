import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import StudentRecord from './StudentRecord';
import Spinner from './Spinner.js';
// React Notification
//import { NotificationManager } from 'react-notifications';


const Student = () => {
    const [students,setStudents] = useState([]);
    const [spinner,setSpinner] = useState(true);
    const getStudent = async() => {
        await axios.get('http://localhost:8000/api/view-student').then(resp => {
            let data = resp.data;
            
            if(data.status===200){
                setStudents(data.studentrecord);//setTimeout(() => {setStudents(data.studentrecord); }, 1000);
                setSpinner(false);
            }
        });
        
    }
    let listContent;

    if(spinner) {
        listContent = <tr><td colspan='7'><h3>Loading...</h3></td></tr>//<div className="list-msg"><Spinner/></div>;
    }
    else {
        listContent = students.map((student) => (<StudentRecord StudentRecord={student} />)) 
    }
    
    useEffect(() => {
        getStudent();
        
    },[]);
       
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-12'>
                <div className='card'>
                    <div className='card-header'>
                        <h4>Student Data
                            <Link to={'add-student'} className="btn btn-primary btn-sm float-end">Add Student</Link>
                        </h4>
                    </div>
                    <div className='card-body'>
                        <table className='table table-bordered table-striped'>
                            <thead>
                                <tr><th>Name</th>
                                    <th>Course</th><th>Email</th><th>Phone</th><th>Edit</th><th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listContent}
                            </tbody>
                        </table>
        
                    </div>
                 </div>
            </div>
        </div>
    </div>
  )
}

export default Student;