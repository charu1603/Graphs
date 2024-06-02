import React from 'react';
import { Radar } from 'react-chartjs-2';

const RadarChart = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.category),
    datasets: [
      {
        label: 'Alert Count by Category',
        data: data.map(d => d.count),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Alert Count by Category'
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: Math.max(...data.map(d => d.count)) + 1
      }
    }
  };

  return <Radar data={chartData} options={options} />;
};

export default RadarChart;
