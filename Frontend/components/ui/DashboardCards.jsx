import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,

} from 'recharts';



const DashboardCards = ({ projectCount, taskCount, todoCount, inProgressCount, doneCount, dueDateBreakdown = [] }) => {
  const cardData = [
    { title: 'Total Projects', count: projectCount, color: 'bg-blue-100 text-blue-700' },
    { title: 'Total Tasks', count: taskCount, color: 'bg-gray-100 text-gray-800' },
    { title: 'Todo Tasks', count: todoCount, color: 'bg-yellow-100 text-yellow-700' },
    { title: 'In Progress Tasks', count: inProgressCount, color: 'bg-purple-100 text-purple-700' },
    { title: 'Done Tasks', count: doneCount, color: 'bg-green-100 text-green-700' },
  ];

  // Sample data for the pie chart
  const data = [
    { name: 'To Do', value: todoCount },
    { name: 'In Progress', value: inProgressCount },
    { name: 'Done', value: doneCount },
  ];
  // Colors for the pie chart
  const COLORS = ['#0080ff', '#e94504', '#17a6b1'];


  // Sample data for the line chart
  const lineData = dueDateBreakdown.map(entry => ({
  date: new Date(entry._id).toISOString().split('T')[0], // Format the date
  tasksDue: entry.tasksDue
}));

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-6">
        {cardData.map((card, index) => (
          <div key={index} className={`rounded-2xl shadow p-4 ${card.color}`}>
            <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
            <p className="text-3xl font-bold">{card.count}</p>
          </div>
        ))}




      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-5">

        {/* pie chart */}
        <div className='w-125 h-72 box-border  bg-white m-5 rounded-2xl shadow-md '>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>


        {/* line chart */}
        <div className="w-175 h-72 bg-white m-5 rounded-2xl shadow-md  pb-15 pr-5 ">
          <h2 className="text-lg font-semibold ml-6 mt-5 mb-2">Tasks Due Over Time</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="tasksDue"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
