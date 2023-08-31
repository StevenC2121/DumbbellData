import React, { useState, useEffect } from 'react';
import LineChart from './linechart';
import axios from 'axios';
import { useUser } from '../UserContext';

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
              durations: [], // Add durations field
            };
          }

          exerciseChartData[exercise.description].timestamps.push(
            exercise.date.substring(0, 10)
          );
          exerciseChartData[exercise.description].weights.push(exercise.weight);
          exerciseChartData[exercise.description].durations.push(exercise.duration); // Add duration
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
        <LineChart exerciseData={exerciseData[selectedExercise]} />
      )}
    </div>
  );
};

export default StatsWeightlifting;
