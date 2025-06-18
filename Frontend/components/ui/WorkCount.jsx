import React, {useEffect, useState} from 'react'
import axios from 'axios';
import DashboardCards from './DashboardCards';


const WorkCount = () => {

    const [counts, setCounts] = useState({
    projectCount: 0,
    taskCount: 0,
    todoCount: 0,
    inProgressCount: 0,
    doneCount: 0,
    dueDateBreakdown: [],
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/dashboard-counts', { withCredentials: true}); // Replace with your actual API
        const data = response.data;

        setCounts({
          projectCount: data.projectCount,
          taskCount: data.taskCount,
          todoCount: data.todoCount,
          inProgressCount: data.inProgressCount,
          doneCount: data.doneCount,
          dueDateBreakdown: data.dueDateBreakdown || [],
        });
      } catch (error) {
        console.error('Error fetching dashboard counts:', error);
      }
    };

    fetchCounts();
  }, []);


  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold p-6">Project Overview</h1>
      <DashboardCards {...counts} 
       />
    </div>
  )
}

export default WorkCount
