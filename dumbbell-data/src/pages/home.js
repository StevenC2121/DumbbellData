import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../UserContext';

const Exercise = (props) => (
  <tr>
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
  const user = useUser();
  const [exercises, setExercises] = useState([]);
  const [displayAll, setDisplayAll] = useState(true); // State to track display mode

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get('http://localhost:5000/exercises/');
        const userExercises = response.data.filter(
          (exercise) => exercise.email === user.currentUser // Use user.currentUser
        );
        setExercises(userExercises);
      } catch (error) {
        console.log(error);
      }
    };

    fetchExercises();
  }, [user.currentUser]);

  const deleteExercise = (id) => {
    axios
      .delete(`http://localhost:5000/exercises/${id}`)
      .then((res) => console.log(res.data));
    setExercises((prevExercises) => prevExercises.filter((el) => el._id !== id));
  };

  const toggleDisplayMode = () => {
    setDisplayAll((prevDisplay) => !prevDisplay);
  };

  const exerciseList = () => {
    // Filter the exercises based on the display mode
    const filteredExercises = displayAll
      ? exercises
      : exercises.reduce((acc, currentExercise) => {
          // Create an object to track the highest weight per exercise
          if (!acc[currentExercise.description]) {
            acc[currentExercise.description] = currentExercise;
          } else if (currentExercise.weight > acc[currentExercise.description].weight) {
            acc[currentExercise.description] = currentExercise;
          }
          return acc;
        }, {});

    return Object.values(filteredExercises).map((currentExercise) => (
      <Exercise
        exercise={currentExercise}
        deleteExercise={deleteExercise}
        key={currentExercise._id}
      />
    ));
  };

  return (
    <div>
      <h3>Logged Exercises</h3>
      <button onClick={toggleDisplayMode}>
        {displayAll ? 'Show Highest Weight Only' : 'Show All Stats'}
      </button>
      <table className='table'>
        <thead className='thread-light'>
          <tr>
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
