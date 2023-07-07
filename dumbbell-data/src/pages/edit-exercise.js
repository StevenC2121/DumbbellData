import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const EditExercise = () => {
  const { id } = useParams();
  const [exercise, setExercise] = useState({
    username: '',
    description: '',
    duration: 0,
    date: new Date(),
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/exercises/${id}`)
      .then(response => {
        setExercise({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date),
        });
      })
      .catch(error => {
        console.log(error);
      });

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          setUsers(response.data.map(user => user.username));
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  const { username, description, duration, date } = exercise;

  const onChangeUsername = e => {
    setExercise({ ...exercise, username: e.target.value });
  };

  const onChangeDescription = e => {
    setExercise({ ...exercise, description: e.target.value });
  };

  const onChangeDuration = e => {
    setExercise({ ...exercise, duration: e.target.value });
  };

  const onChangeDate = date => {
    setExercise({ ...exercise, date: date });
  };

  const onSubmit = e => {
    e.preventDefault();

    const updatedExercise = {
      username: exercise.username,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date,
    };

    console.log(updatedExercise);

    axios.put(`http://localhost:5000/exercises/update/${id}`, updatedExercise)
      .then(res => console.log(res.data))
      .catch(error => console.log(error));

    window.location = '/';
  };

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={username}
            onChange={onChangeUsername}
          >
            {users.map(user => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={duration}
            onChange={onChangeDuration}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={date} onChange={onChangeDate} />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default EditExercise;
