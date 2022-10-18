import React from 'react';
import Student from './components/Student';
import Addstudent from './components/Addstudent';
import Editstudent from './components/Editstudent';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
// React Notification
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';


const App = () => {

  return (
    <Router>
      <Routes>
            <Route exact path="/" element={<Student />} />
            <Route  path="/add-student" element={<Addstudent />} />
            <Route  path="/edit-student/:id" element={<Editstudent />} />    
      </Routes>
      <NotificationContainer/>
    </Router>
  );
}

export default App;
