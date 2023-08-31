import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ exerciseData }) => {
  const { timestamps, weights, durations } = exerciseData;

  // Sort timestamps in chronological order
  const sortedTimestamps = timestamps.slice().sort((a, b) => new Date(a) - new Date(b));

  const data = {
    labels: sortedTimestamps,
    datasets: [
      {
        label: 'Weight (in lb)',
        data: weights,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: 'Duration (in min)',
        data: durations,
        borderColor: 'rgba(192, 75, 75, 1)',
        backgroundColor: 'rgba(192, 75, 75, 0.2)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(192, 75, 75, 1)',
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time', // Use time scale for x-axis
        time: {
          unit: 'day', // Display unit as day
          displayFormats: {
            day: 'YYYY-MM-DD', // Format for display
          },
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
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
  };

  return (
    <div>
      <Line data={data} height={400} width={600} options={options} />
    </div>
  );
};

export default LineChart;
