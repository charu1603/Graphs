import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import LineChart from '../components/LineChart';
import DoughnutChart from '../components/DoughnutChart';
import RadarChart from '../components/RadarChart';
import data from '../data/eve.json';
import 'chartjs-adapter-date-fns';
import Sidebar from '../components/Sidebar';
import '../App.css';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, TimeScale, RadialLinearScale, Filler } from 'chart.js';
import { HeadingIcon } from 'lucide-react';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
        { category: key, count: categoryCounts[key] }
      )));
      setTimeData(Object.keys(timeCounts).map(key => (
        { timestamp: key, count: timeCounts[key] }
      )));
    };

    fetchData();
  }, []);

  return (
    <Router>
      <div className="flex h-screen w-full">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 p-4 ">
          <Routes>
            <Route path="/" element={
          <>
           <div className="flex gap-2 h-screen flex-wrap md:flex-nowrap p-4">
        <div className="flex flex-col flex-1">
          <div className=" lg:h-[650px] lg:w-[500px] mb-4 md:mb-0">
            <BarChart data={portData} />
          </div>
          <div className=" lg:h-[650px] w-full lg:w-[500px]">
            <LineChart data={timeData} />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className=" md:h-[330px] w-full md:w-[250px] mb-4 md:mb-0">
            <PieChart data={categoryData} />
          </div>
          <div className=" md:h-[330px] w-[250px] md:w-[250px]">
            <RadarChart data={categoryData} />
          </div>
        </div>
        <div className=" md:h-[550px] w-full md:w-[250px]">
          <DoughnutChart data={categoryData} />
        </div>
      </div>
                
              </>
            }></Route>
            <Route path="/bar" element={<BarChart data={portData} />} />
            <Route path="/pie" element={<PieChart data={categoryData} />} />
            <Route path="/line" element={<LineChart data={timeData} />} />
            <Route path="/doughnut" element={<DoughnutChart data={categoryData} />} />
            <Route path="/radar" element={<RadarChart data={categoryData} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Analytics;
