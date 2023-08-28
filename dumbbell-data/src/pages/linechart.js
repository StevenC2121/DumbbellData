import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { useUser } from '../UserContext';

const LineChart = ({ exerciseData }) => {
  return (
    <div>
      <Line
        data={{
          labels: exerciseData.timestamps,
          datasets: [
            {
              label: 'Exercise Data',
              data: exerciseData.weights,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(75, 192, 192, 1)',
              pointRadius: 5,
              pointHoverRadius: 7,
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              labels: {
                fontSize: 25,
              },
            },
          },
        }}
      />
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
          if (!exerciseChartData[exercise.description]) {
            exerciseChartData[exercise.description] = {
              timestamps: [],
              weights: [],
            };
          }

          exerciseChartData[exercise.description].timestamps.push(
            exercise.date.substring(0, 10)
          );
          exerciseChartData[exercise.description].weights.push(exercise.weight);
        });

        setExerciseData(exerciseChartData);
        setSelectedExercise(Object.keys(exerciseChartData)[0]); // Set initial exercise
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
      {selectedExercise && <LineChart exerciseData={exerciseData[selectedExercise]} />}
    </div>
  );
};

export default StatsWeightlifting;
