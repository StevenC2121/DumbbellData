import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { useUser } from '../UserContext';

const LineChart = ({ exerciseData, selectedExercise }) => {
  const selectedExerciseData = exerciseData[selectedExercise];

  if (!selectedExerciseData) {
    return null;
  }

  // Combine timestamps and durations into an array of objects
  const dataPoints = selectedExerciseData.timestamps.map((timestamp, index) => ({
    x: new Date(timestamp),
    y: selectedExerciseData.durations[index],
  }));

  // Sort dataPoints based on x (date) values
  dataPoints.sort((a, b) => a.x - b.x);

  const data = {
    datasets: [
      {
        label: selectedExercise,
        data: dataPoints,
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
  const [selectedExercise, setSelectedExercise] = useState('');
  const [exerciseData, setExerciseData] = useState({});
  const user = useUser();

  useEffect(() => {
    const fetchUserExerciseData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/exercises/');
        const userExercises = response.data.filter(
          (exercise) => exercise.email === user.currentUser
        );

        const exerciseChartData = {};

        userExercises.forEach((exercise) => {
          const date = exercise.date.substring(0, 10);
          if (!exerciseChartData[exercise.description]) {
            exerciseChartData[exercise.description] = {
              timestamps: [],
              durations: [],
            };
          }

          exerciseChartData[exercise.description].timestamps.push(date);
          exerciseChartData[exercise.description].durations.push(exercise.duration);
        });

        setExerciseData(exerciseChartData);
        setSelectedExercise(Object.keys(exerciseChartData)[0]);
      } catch (error) {
        console.log(error);
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
      {selectedExercise && (
        <LineChart exerciseData={exerciseData} selectedExercise={selectedExercise} />
      )}
    </div>
  );
};

export default StatsWeightlifting;
