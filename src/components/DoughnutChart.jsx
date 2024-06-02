import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.category),
    datasets: [
      {
        label: 'Alert Count by Category',
        data: data.map(d => d.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
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
    }
  };

  return <Doughnut data={chartData} options={options} />;
};

export default DoughnutChart;
