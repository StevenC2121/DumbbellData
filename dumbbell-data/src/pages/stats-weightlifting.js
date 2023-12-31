import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { useUser } from '../UserContext';

const LineChart = ({ exerciseData, selectedExercise }) => {
  const selectedExerciseData = exerciseData[selectedExercise] || [];
  // Sort the data by date
  selectedExerciseData.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Check if there's no data, and avoid rendering the chart
  if (selectedExerciseData.length === 0) {
    return <div>No data available.</div>;
  }

  // Extract timestamps and durations from selectedExerciseData
  const timestamps = selectedExerciseData.map((entry) => entry.date);
  const durations = selectedExerciseData.map((entry) => entry.duration);

  const data = {
    labels: timestamps,
    datasets: [
      {
        label: selectedExercise,
        data: durations,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Duration',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          fontSize: 25,
        },
      },
    },
  };

  return (
    <div>
      <Line data={data} height={400} width={600} options={options} />
    </div>
  );
};

const StatsWeightlifting = () => {
  const [selectedExercise, setSelectedExercise] = useState(''); // Set a default value here
  const [exerciseData, setExerciseData] = useState({});
  const [haveData, setHaveData] = useState(false); // New state for data availability

  const user = useUser();

  useEffect(() => {
    const fetchUserExerciseData = async () => {
      try {
        const response = await axios.get('https://dumbbell-data.onrender.com/exercises/');
        const userExercises = response.data.filter(
          (exercise) => exercise.email === user.currentUser
        );

        const reformattedData = {};

        userExercises.forEach((exercise) => {
          const date = exercise.date.substring(0, 10);
          if (!reformattedData[exercise.description]) {
            reformattedData[exercise.description] = [];
          }

          reformattedData[exercise.description].push({
            date,
            duration: exercise.duration,
          });
        });

        setExerciseData(reformattedData);
        setHaveData(true); // Set to true when data is available

        // Set the default selected exercise here (e.g., the first exercise in the list)
        if (Object.keys(reformattedData).length > 0) {
          setSelectedExercise(Object.keys(reformattedData)[0]);
        }
      } catch (error) {
        console.log(error);
        setHaveData(false); // Set to false on error
      }
    };

    fetchUserExerciseData();
  }, [user.currentUser]);

  return (
    <div>
      <h1>Weightlifting Stats</h1>
      <select
        value={selectedExercise}
        onChange={(e) => setSelectedExercise(e.target.value)}
      >
        {Object.keys(exerciseData).map((exercise) => (
          <option key={exercise} value={exercise}>
            {exercise}
          </option>
        ))}
      </select>
      {haveData ? ( // Conditionally render based on data availability
        <LineChart exerciseData={exerciseData} selectedExercise={selectedExercise} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};



export default StatsWeightlifting;
