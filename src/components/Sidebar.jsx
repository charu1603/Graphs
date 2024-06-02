import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div>
      <button className="md:hidden text-white text-2xl p-4" onClick={toggleSidebar}>
        &#9776;
      </button>
      <div className={`fixed md:relative bg-[#1e1e1ee2] text-white h-full  p-4 px-6 ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
        <ul className="flex flex-col gap-4 text-xm pt-6">
          <li>
            <Link className='bg-[#ff638433] py-1 px-3 rounded-sm' to="/bar">Bar Chart</Link>
          </li>
          <li>
            <Link className='bg-[#36a2eb33] py-1 px-3 rounded-sm' to="/pie">Pie Chart</Link>
          </li>
          <li>
            <Link className="bg-[#ffce5633] py-1 px-3 rounded-sm" to="/line">Line Chart</Link>
          </li>
          <li>
            <Link className='bg-[#4bc0c033] py-1 px-3 rounded-sm' to="/doughnut">Doughnut Chart</Link>
          </li>
          <li>
            <Link className='bg-[#9966ff33] py-1 px-3 rounded-sm' to="/radar">Radar Chart</Link>
          </li>
          <li>
            <Link className='bg-[#ff9f4033] py-1 px-3 rounded-sm' to="/">Show All</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

