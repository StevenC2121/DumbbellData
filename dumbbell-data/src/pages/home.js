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
  const [sortColumn, setSortColumn] = useState('description'); // Initial sorting column
  const [sortOrder, setSortOrder] = useState('asc'); // Initial sorting order

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

  // Function to handle sorting when a table header is clicked
  const handleSort = (column) => {
    if (column === sortColumn) {
      // If clicking the same column, toggle the sorting order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // If clicking a different column, set it as the new sorting column
      setSortColumn(column);
      setSortOrder('asc'); // Set the initial sorting order for the new column
    }
  };

  const exerciseList = () => {
    // Sort the exercises based on the sorting criteria
    let sortedExercises = [...exercises];
    sortedExercises.sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      
      if (aValue < bValue) {
        return sortOrder === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return sortOrder === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });

    // Filter the exercises based on the display mode
    const filteredExercises = displayAll
      ? sortedExercises
      : sortedExercises.reduce((acc, currentExercise) => {
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

  const getSortIndicator = (column) => {
    if (column === sortColumn) {
      return sortOrder === 'asc' ? '↑' : '↓'; // Up or down arrow
    }
    return '';
  };

  return (
    <div>
      <h3>Logged Exercises</h3>
      <button onClick={toggleDisplayMode}>
        {displayAll ? 'Show Highest Weight Only' : 'Show All Stats'}
      </button>
      <table className='table'>
        <thead className='thead-light'>
          <tr>
            <th onClick={() => handleSort('description')}>
              Lift Description {getSortIndicator('description')}
            </th>
            <th onClick={() => handleSort('duration')}>
              Weight (in lb) {getSortIndicator('duration')}
            </th>
            <th onClick={() => handleSort('date')}>
              Date {getSortIndicator('date')}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{exerciseList()}</tbody>
      </table>
    </div>
  );
};

export default Home;
