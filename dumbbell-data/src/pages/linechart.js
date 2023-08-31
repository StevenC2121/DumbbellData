import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ exerciseData }) => {
  const { timestamps, weights, durations } = exerciseData;

  if (!timestamps || !weights || !durations) {
    return null;
  }

  return (
    <div>
      <Line
        data={{
          labels: timestamps,
          datasets: [
            {
              label: 'Exercise Data',
              data: weights,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(75, 192, 192, 1)',
              pointRadius: 5,
              pointHoverRadius: 7,
            },
            {
              label: 'Exercise Duration',
              data: durations,
              borderColor: 'rgba(192, 75, 75, 1)',
              backgroundColor: 'rgba(192, 75, 75, 0.2)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(192, 75, 75, 1)',
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

export default LineChart;
