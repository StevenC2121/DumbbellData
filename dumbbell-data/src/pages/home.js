import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../UserContext';

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <button
        className="btn btn-link"
        onClick={() => {
          window.location.href = '/edit-exercise/' + props.exercise._id;
        }}
      >
        edit
      </button>
      {' | '}
      <button
        className="btn btn-link"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        delete
      </button>
    </td>
  </tr>
);

const Home = () => {
  const user = useUser(); // Call useUser hook to get the user from context

  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/exercises/')
      .then((response) => {
        const userExercises = response.data.filter(
          (exercise) => exercise.username === user.currentUser // Use user.currentUser
        );
        setExercises(userExercises);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user.currentUser]); // Add user.currentUser as a dependency

  const deleteExercise = (id) => {
    axios
      .delete(`http://localhost:5000/exercises/${id}`)
      .then((res) => console.log(res.data));
    setExercises((prevExercises) => prevExercises.filter((el) => el._id !== id));
  };

  const exerciseList = () => {
    return exercises.map((currentexercise) => (
      <Exercise
        exercise={currentexercise}
        deleteExercise={deleteExercise}
        key={currentexercise._id}
      />
    ));
  };

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className='table'>
        <thead className='thread-light'>
          <tr>
            <th>Username</th>
            <th>Lift Description</th>
            <th>Weight (in lb)</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{exerciseList()}</tbody>
      </table>
    </div>
  );
};

export default Home;