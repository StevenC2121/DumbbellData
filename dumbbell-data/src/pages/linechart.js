import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

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
  const [selectedExercise, setSelectedExercise] = useState('Squat');


  const exerciseData = {
    Squat: {
      timestamps: ['2023-01-01', '2023-02-01','2023-03-01', '2023-04-01', '2023-05-01'],
      weights: [200, 205, 210, 225, 255],
    },
    BenchPress: {
      timestamps: ['2023-01-01', '2023-02-01','2023-03-01', '2023-04-01', '2023-05-01'],
      weights: [150, 155, 160, 160, 175],
    },
    Deadlift: {
      timestamps: ['2023-01-01', '2023-02-01','2023-03-01', '2023-04-01', '2023-05-01'],
      weights: [250, 255, 260, 260, 350],
    },
  };

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
      <LineChart exerciseData={exerciseData[selectedExercise]} />
    </div>
  );
};

export default StatsWeightlifting;
