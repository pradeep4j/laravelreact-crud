import React, { useEffect } from 'react';
import { useState } from 'react';
import {Link,useParams,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import swal from 'sweetalert';

const Editstudent = () => {
  const [name,setname] = useState('');
  const [course,setcourse] = useState('');
  const [email,setemail] = useState('');
  const [phone,setphone] = useState('');
  const [errors,setErrors] = useState([]);
  const {id} = useParams();
  let navigate = useNavigate();
  //const API = 'http://localhost:8000';

  const getStudentWithId = async(id) => {
    await axios.get(`http://localhost:8000/api/edit-student/${id}`).then(resp =>{
        let data = resp.data;
        if(data.status===200)
        {
            setname(data.selectedStudenRecord.name);
            setcourse(data.selectedStudenRecord.course);  
            setemail(data.selectedStudenRecord.email);  
            setphone(data.selectedStudenRecord.phone); 
        }
        else{
            /*swal({
                title: "Warning!",
                text: 'No Student ID Found!',
                icon: "warning",
                button: "OK!",
              });  */
              NotificationManager.error('No Student ID Found!','Error',5000);
              navigate("/");
        }
    });
  } 
  const onSubmit = async(e) =>
  {
    e.preventDefault();
    const postBody = {
        name : name,
        course:course,
        email :email,
        phone : phone        
    }
    await axios.put(`http://localhost:8000/api/update-student/${id}`,postBody).then(resp => {
        if(resp.data.status===200){
            setname('');  
            setcourse('');  
            setemail('');  
            setphone(''); 
            navigate('/');
            /*swal({
                title: "Successful!",
                text: resp.data.message,
                icon: "success",
                button: "OK!",
              });*/
            //NotificationManager.success(resp.data.message,'Successful',5000);
        }
        else{
            setErrors(resp.data.message);
        }
          
    });
  }
  useEffect(()=>{
     getStudentWithId(id);
  },[]);
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6'>
                <div className='card'>
                    <div className='card-header'>
                        <h4>Edit Students
                            <Link to={'/'} className="btn btn-primary btn-sm float-end">BACK</Link>
                        </h4>
                    </div>
                    <div className='card-body'>
                        <form onSubmit={onSubmit}>
                            <div className='form-group-mb3'>
                                <label>Student Name</label>
                                <input placeholder="Enter name" value={name} onChange={(e) => setname(e.target.value)} className='form-control' />
                                <span className="text-danger">{errors.name}</span>
                            </div>
                            <div className='form-group-mb3'>
                                <label>Student Course</label>
                                <input placeholder="Enter course"  value={course} onChange={(e) => setcourse(e.target.value)} className='form-control' />
                                <span className="text-danger">{errors.course}</span>
                            </div>
                            <div className='form-group-mb3'>
                                <label>Student Email</label>
                                <input placeholder="Enter email"  value={email} onChange={(e) => setemail(e.target.value)} className='form-control' />
                                <span className="text-danger">{errors.email}</span>
                            </div>
                            <div className='form-group-mb3'>
                                <label>Student Phone</label>
                                <input placeholder="Enter phone" type="number" value={phone} onChange={(e) => setphone(e.target.value)} className='form-control' />
                                <span className="text-danger">{errors.phone}</span>
                            </div>
                            <div className='form-group-mb3'>
                                <button className='btn btn-primary' type="submit">Update Student</button>
                            </div>
                        </form>
        
                    </div>
                 </div>
            </div>
        </div>
    </div>
  )
}

export default Editstudent;