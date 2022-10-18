import React from 'react';
import { useState } from 'react';
import {Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
// React Notification
import { NotificationManager } from 'react-notifications';

const Addstudent = () => {
  const [name,setname] = useState('');
  const [course,setcourse] = useState('');
  const [email,setemail] = useState('');
  const [phone,setphone] = useState('');
  const [errors,setErrors] = useState([]);
  //const API = 'http://localhost:8000';
  let navigate = useNavigate();
  const onSubmit = async(e) =>
  {
    e.preventDefault();
    
    const postBody = {
        name : name,
        course:course,
        email :email,
        phone : phone        
    }
    await axios.post('http://localhost:8000/api/add-student',postBody).then(resp => {
        if(resp.data.status===200)
        {
            setname('');  
            setcourse('');  
            setemail('');  
            setphone(''); 
            //alert(resp.data.status);
            navigate('/');
            /*swal({
                title: "Successful!",
                text: resp.data.message,
                icon: "success",
                button: "OK!",
              });*/
            NotificationManager.success(resp.data.message, 'Successful!', 3000);
        }
        else{
            setErrors(resp.data.message);
        }
    });

  }
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6'>
                {/* {errors.length> 0 ?<>
                <div class="alert alert-danger">
                    <ul>
                        
                        <li>{ errors }</li>
                       
                    </ul>
                </div><br /></>:''} it did not work here*/}
                <div className='card'>
                    <div className='card-header'>
                        <h4>Add Students
                            <Link to={'/'} className="btn btn-primary btn-sm float-end">BACK</Link>
                        </h4>
                    </div>
                    <div className='card-body'>
                        <form method="post" onSubmit={onSubmit}>
                            {/* <div className='form-group-mb3'>
                                <label>Student Name</label>
                                <input placeholder="Enter name" value={name} onChange={(e) => setname(e.target.value)} className='form-control' type='text' required maxlength="100" />
                            </div>
                            <div className='form-group-mb3'>
                                <label>Student Course</label>
                                <input placeholder="Enter course"  value={course} onChange={(e) => setcourse(e.target.value)} className='form-control' type='text' maxlength="200" required />
                            </div>
                            <div className='form-group-mb3'>
                                <label>Student Email</label>
                                <input placeholder="Enter email"  value={email} onChange={(e) => setemail(e.target.value)} className='form-control' type='email' maxlength="100" required/>
                            </div>
                            <div className='form-group-mb3'>
                                <label>Student Phone</label>
                                <input placeholder="Enter phone"  value={phone} onChange={(e) => setphone(e.target.value)} className='form-control' type="text" maxlength="10" pattern="[1-9]{1}[0-9]{9}" required  />
                            </div> */}
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
                                <input placeholder="Enter phone"  value={phone} onChange={(e) => setphone(e.target.value)} className='form-control' type="number"/>
                                <span className="text-danger">{errors.phone}</span>
                            </div>
                            <div className='form-group-mb3'>
                                <button className='btn btn-primary' type="submit">Save Student</button>
                            </div>
                        </form>
        
                    </div>
                 </div>
            </div>
        </div>
    </div>
  )
}

export default Addstudent;