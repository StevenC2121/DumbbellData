import React from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import './weightlifting.css';

export default function Weightlifting() {
  const user = useUser();
  const navigate = useNavigate();

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

      setDescription('');
      setDuration(0);
      setDate(new Date());

      navigate('/home');
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <div className="exercise-container">
      <div className="exercise-box">
        <h3>Create New Weightlifting Log</h3>
        <form onSubmit={handleSubmit} className='exercise-form'>
          <div className='form-group'>
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
      <div className="exercise-image">
        <img src="/barbellcurl.png" alt="Barbell Curl" width={300} height={300}/>
      </div>
    </div>
  );
}
