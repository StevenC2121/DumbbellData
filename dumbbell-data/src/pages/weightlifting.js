import React from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

export default function Weightlifting() {
  const user = useUser();
  const navigate = useNavigate(); // Get the navigate function

  const [description, setDescription] = React.useState('');
  const [duration, setDuration] = React.useState(0);
  const [date, setDate] = React.useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const exercise = {
        email: user.currentUser,
        description,
        duration,
        date
      };

      console.log(exercise);

      const response = await axios.post('http://localhost:5000/exercises/add', exercise);
      console.log(response.data);

      // Reset form
      setDescription('');
      setDuration(0);
      setDate(new Date());

      // Use navigate to go to the home page
      navigate('/home');
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <h3>Create New Weightlifting Log</h3>
      <form onSubmit={handleSubmit}>
      <div className='form-group'>
  <label>Email: </label>
  <input 
    type='text'
    className='form-control'
    value={user.currentUser} // Display the currently logged-in user's email
    readOnly // Make the input read-only
  />
</div>
        <div className='form-group'>
          {/* Email is automatically filled from the currently logged-in user */}
          <label>Lift Description: </label>
          <input 
            type='text'
            className='form-control'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label>Weight (in lb): </label>
          <input
            type='text'
            className='form-control'
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />          
        </div>
        <div className='form-group'>
          <label>Date: </label>
          <div>
            <DatePicker
              selected={date}
              onChange={setDate}
            />
          </div>
        </div>
        
        <div className='form-group'>
          <input type='submit' value='Create Exercise Log' className='btn btn-primary' />
        </div>
      </form>
    </div>
  );
}
