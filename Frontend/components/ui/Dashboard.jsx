import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import CreateForm from './CreateForm';
import CreateTask from './CreateTask';
import ProjectList from './ProjectList';
import UpdateForm from './UpdateForm';
import axios from 'axios';
import TeamModal from './TeamModal';
import WorkCount from './WorkCount'; 

export default function Dashboard() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showUpdateForm, setshowUpdateForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState([]);
   const [viewMode, setViewMode] = useState('dashboard');
  const [projectRefreshFlag, setProjectRefreshFlag] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);

  const handleSelectProject = (project) => {
  setSelectedProject(project);
  setViewMode('project');
  fetchTasks(project._id);
};
const handleProjectCreated = () => {
  setProjectRefreshFlag(prev => !prev);
};


  const fetchTasks = async (projectId) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/tasks?projectId=${projectId}`,
        { withCredentials: true }
      );
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };
  const handleTaskCreated = (newTask) => {
  setTasks(prevTasks => [...prevTasks, newTask]);
};

   
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar onOpenCreateForm={() => setShowCreateForm(true)}
      selectedProject={selectedProject}
      onSelectProject={handleSelectProject}
      projectRefreshFlag={projectRefreshFlag}
      onOpenTeamModal={() => setShowTeamModal(true)}
      onOpenDashboard={() => setViewMode('dashboard')}
      viewMode={viewMode} 
       />
       

      {/* Main content area */}
      <div className="relative flex flex-1 flex-col overflow-y-auto">
        <Header 
        tasks={tasks} 
        setFilteredTasks={setTasks} 
        />

        <main className={`flex-1 overflow-y-auto  transition-all duration-300 ${showCreateForm ? 'blur-sm pointer-events-none' : ''}`}>
      {viewMode === 'dashboard' && <WorkCount />}     
   {viewMode === 'project' && selectedProject && (
          <ProjectList 
            onOpenCreateTask={() => setShowCreateTask(true)}
            selectedProject={selectedProject} 
            tasks={tasks}
            setTasks={setTasks}
            onOpenUpdateForm={() => setshowUpdateForm(true)}
            
          />
   )}


        </main>
      </div>

      {/* Modal Overlay */}
     <CreateForm 
  show={showCreateForm} 
  onClose={() => setShowCreateForm(false)} 
  onProjectCreated={handleProjectCreated}
/>

{showCreateTask && selectedProject && (
         <CreateTask
    onClose={() => setShowCreateTask(false)}
    projectId={selectedProject._id}
    onTaskCreated={handleTaskCreated}
  />
)}
{showTeamModal && selectedProject && (
  <TeamModal
    projectId={selectedProject._id}
    onClose={() => setShowTeamModal(false)}
  />
)}
         
    </div>
  );
}
