
import React, { useEffect, useState } from 'react';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import LineChart from '../components/LineChart';
import DoughnutChart from '../components/DoughnutChart';
import RadarChart from '../components/RadarChart';
import data from '../data/eve.json';
import 'chartjs-adapter-date-fns';
import '../App.css'

import { Chart as ChartJS,CategoryScale,LinearScale,BarElement,PointElement,LineElement,ArcElement,Title, Tooltip, Legend, TimeScale,RadialLinearScale, Filler} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  RadialLinearScale,
  Filler
);

const Analytics = () => {
  const [portData, setPortData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [timeData, setTimeData] = useState([]);
  const [visibleChart, setVisibleChart] = useState('all'); 
  
  useEffect(() => {
    const fetchData = async () => {
      const parsedData = data;

      const portCounts = {};
      const categoryCounts = {};
      const timeCounts = {};

      parsedData.forEach(alert => {
        portCounts[alert.dest_port] = (portCounts[alert.dest_port] || 0) + 1;
        if (alert.alert && alert.alert.category) {
          categoryCounts[alert.alert.category] = (categoryCounts[alert.alert.category] || 0) + 1;
        }
        const timestamp = new Date(alert.timestamp).toISOString().split(':')[0];
        timeCounts[timestamp] = (timeCounts[timestamp] || 0) + 1;
      });

      setPortData(Object.keys(portCounts).map(key => (
        { dest_port: Number(key), count: portCounts[key] }
      )));
      setCategoryData(Object.keys(categoryCounts).map(key => (
        { category: key, count: categoryCounts[key] 

        })));
      setTimeData(Object.keys(timeCounts).map(key => (
        { timestamp: key, count: timeCounts[key] }
      )));
    };

    fetchData();
  }, []);

  return (
    <div className="App text-center w-full p-[20px]">
       
       <nav className='flex justify-center h-[5rem] md:h-[3rem]'>
        <ul className='flex md:gap-4 justify-center fixed'>
          <li ><button className='bg-[#ff638433] md:px-3 py-1 px-2 rounded-sm' onClick={() => setVisibleChart('bar')}>Bar Chart</button></li>
          <li><button className='bg-[#36a2eb33] md:px-3 py-1 px-2 rounded-sm' onClick={() => setVisibleChart('pie')}>Pie Chart</button></li>
          <li><button className="bg-[#ffce5633] md:px-3 py-1 px-2 rounded-sm" onClick={() => setVisibleChart('line')}>Line Chart</button></li>
          <li><button className='bg-[#4bc0c033] md:px-3 py-1 px-2 rounded-sm' onClick={() => setVisibleChart('doughnut')}>Doughnut Chart</button></li>
          <li><button className='bg-[#9966ff33] md:px-3 py-1 px-2 rounded-sm' onClick={() => setVisibleChart('radar')}>Radar Chart</button></li>
          <li><button className='bg-[#ff9f4033] md:px-3 py-1 px-2 rounded-sm' onClick={() => setVisibleChart('all')}>Show All</button></li>
        </ul>
      </nav>
      <div className="chart-container">
        {(visibleChart === 'all' || visibleChart === 'bar') && <BarChart data={portData} />}
        {(visibleChart === 'all' || visibleChart === 'pie') && <PieChart data={categoryData} />}
        {(visibleChart === 'all' || visibleChart === 'line') && <LineChart data={timeData} />}
       
        {(visibleChart === 'all' || visibleChart === 'doughnut') && <DoughnutChart data={categoryData} />}
        {(visibleChart === 'all' || visibleChart === 'radar') && <RadarChart data={categoryData} />}
    
      </div>
    </div>
  );
};

export default Analytics;
