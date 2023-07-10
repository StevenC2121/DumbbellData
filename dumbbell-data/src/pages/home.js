import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserService from "../services/user.service";

const Exercise = (props) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
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
};

const Home = () => {
  const [exercises, setExercises] = useState([]);

  const deleteExercise = (id) => {
    axios.delete('http://localhost:5000/exercises/' + id)
      .then(res => console.log(res.data));
    setExercises(exercises.filter(el => el._id !== id));
  };

  useEffect(() => {
    axios.get('http://localhost:5000/exercises/')
      .then(response => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const exerciseList = () => {
    return exercises.map(currentExercise => {
      return (
        <Exercise
          exercise={currentExercise}
          deleteExercise={deleteExercise}
          key={currentExercise._id}
        />
      );
    });
  };

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className='table'>
        <thead className='thead-light'>
          <tr>
            <th>Username</th>
            <th>Lift Description</th>
            <th>Weight (in lb)</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exerciseList()}
        </tbody>
      </table>
    </div>
  );
};

export default Home;