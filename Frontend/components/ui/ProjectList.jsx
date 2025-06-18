import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from './button'
import ConfirmDialog from './ConfirmDialog'; 
import UpdateForm from './UpdateForm';
import TaskDetailModal from './TaskDetailModal';
import { IoEye } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import KanbanBoard from './KanbanBoard';

const ProjectList = ({ onOpenCreateTask, selectedProject, tasks, setTasks }) => {
  const [projects, setProjects] = useState([]);
  const [showTasks, setShowTasks] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedTaskDetail, setSelectedTaskDetail] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);



   const fetchTasks = async () => {
     if (!selectedProject?._id) return;
  try {
    const res = await axios.get(`http://localhost:3000/api/tasks?projectId=${selectedProject._id}`, {
      withCredentials: true
    });
    setTasks(res.data);
    setShowTasks(true); // show the list
  } catch (err) {
    console.error('Error fetching tasks:', err);
  }
};


const handleEditClick = (task) => {
  setEditingTask(task);
  setShowUpdateForm(true);
};

const handleTaskUpdate = async (updatedTask) => {
  try {
    const res = await axios.put(`http://localhost:3000/api/tasks/${updatedTask._id}`, updatedTask,
      {
        withCredentials: true
      }
    );
    setTasks(prev =>
      prev.map(task => task._id === updatedTask._id ? res.data : task)
    );
    setShowUpdateForm(false);
    setEditingTask(null);
  } catch (err) {
    console.error('Failed to update task:', err);
  }
};
  
   const deleteTask = async (taskId) => {
  try {
    await axios.delete(`http://localhost:3000/api/tasks/${taskId}`,
      {
        withCredentials: true
      }
    );
    setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
  } catch (err) {
    console.error('Failed to delete task:', err);
  }
};

const handleDeleteClick = (task) => {
  setTaskToDelete(task);
  setShowConfirm(true);
};

const confirmDelete = async () => {
  if (!taskToDelete) return;
  try {
    await axios.delete(`http://localhost:3000/api/tasks/${taskToDelete._id}`,
      {
        withCredentials: true
      }
    );
    setTasks(prev => prev.filter(t => t._id !== taskToDelete._id));
  } catch (err) {
    console.error('Failed to delete task:', err);
  } finally {
    setShowConfirm(false);
    setTaskToDelete(null);
  }
};

const cancelDelete = () => {
  setShowConfirm(false);
  setTaskToDelete(null);
};
const toggleView = (viewType) => {
    if (viewType === "tasks") setShowTasks(true);
    else setShowTasks(false);
  };


useEffect(() => {
    fetchTasks(); // called whenever selectedProject._id changes
  }, [selectedProject?._id]);
  
   useEffect(() => {
    axios.get('http://localhost:3000/api/projects', { withCredentials: true })
      .then(res => {
        setProjects(res.data);
      })
      .catch(err => {
        console.error("Failed to fetch projects:", err);
      });
  }, []);

  useEffect(() => {
  if (!selectedProject?._id) return;

  const fetchTeamMembers = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/projects/${selectedProject._id}`,
        { withCredentials: true }
      );
      setTeamMembers(res.data.teamMembers || []);
    } catch (err) {
      console.error("Failed to fetch team members:", err);
    }
  };

  fetchTeamMembers();
}, [selectedProject?._id]);

  
  return (
    <div>
      <section className="flex h-screen  dark:bg-gray-900">
      <div className="w-full max-w-screen-xl  mx-0 ">
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 md:rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white px-4 pt-4">
            Project: {selectedProject?.title}
          </h2>
          <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
           

            <div
              className="inline-flex flex-col w-full rounded-md shadow-sm md:w-auto md:flex-row"
              role="group"
            >
              <button
              onClick={() => toggleView("tasks")}
                type="button"
                className={`px-4 py-2 text-sm font-medium border ${
                    showTasks ? "bg-blue-500 text-white" : "bg-white text-gray-900"
                  } border-gray-200 rounded-t-lg md:rounded-tr-none md:rounded-l-lg hover:bg-gray-100 dark:bg-gray-700 dark:text-white`}>
                Task List
              </button>
              <button
                type="button"
                 onClick={() => toggleView("board")}
                  className={`px-4 py-2 text-sm font-medium border ${
                    !showTasks ? "bg-blue-500 text-white" : "bg-white text-gray-900"
                  } border-gray-200 border-x md:border-x-0 md:border-t md:border-b rounded-b-lg md:rounded-bl-none md:rounded-r-lg hover:bg-gray-100 dark:bg-gray-700 dark:text-white`}
              >
               Kanban Board
              </button>
              
            </div>
            <div className="flex items-center space-x-2">
                <Button onClick={onOpenCreateTask} className="bg-blue-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 text-white mr-6">Create task</Button>
            
            </div>
           
          </div>
        </div>

      {showTasks ? (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold dark:text-white mx-4">
                 Tasks for {selectedProject?.title || "Selected Project"}
              </h3>
              {tasks.length === 0 ? (
                <p className="text-gray-500">No tasks found.</p>
              ) : (
                <ul className="space-y-2 flex flex-col m-7 gap-2.5">
                  {tasks.map(task => (
                    <li key={task._id}
                        className="p-4 flex flex-row bg-white shadow   rounded-xl hover:scale-[1.01] transition">
                      <div className="flex flex-col gap-2">
                        <h4 className="text-md font-medium text-green-900">{task.title}</h4>
                        <p className="text-sm text-gray-600">{task.summary}</p>
                        <p className="text-xs text-orange-900">Status: {task.status}</p>
                      </div>
                      <div className="flex flex-row gap-2 ml-auto">
                        <Button
                          onClick={() => setSelectedTaskDetail(task)}
                          className="bg-gray-200 hover:bg-blue-500 hover:text-white"
                        >
                          <IoEye /> View
                        </Button>
                        <Button
                          onClick={() => handleEditClick(task)}
                          className="bg-gray-200 hover:bg-blue-500 hover:text-white"
                        >
                          <FaRegEdit /> Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteClick(task)}
                          className="bg-gray-200 hover:bg-red-500 hover:text-white"
                        >
                          <MdDelete /> Delete
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div className="mt-6 px-6">
    {selectedProject?._id && (
  <KanbanBoard
    projectId={selectedProject._id}
    tasks={tasks}
    setTasks={setTasks}
    
  />
)}
  </div>
)}

      </div>
    </section>

    {showUpdateForm && editingTask && (
  <UpdateForm
    task={editingTask}
    projectId={selectedProject?._id}
    teamMembers={teamMembers} 
    onClose={() => setShowUpdateForm(false)}
    onUpdate={handleTaskUpdate}
  />
)}

    {showConfirm && (
  <ConfirmDialog
    title="Delete Task"
    message={`Are you sure you want to delete "${taskToDelete.title}"? This action cannot be undone.`}
    onConfirm={confirmDelete}
    onCancel={cancelDelete}
  />
)}

{selectedTaskDetail && (
  <TaskDetailModal
    task={selectedTaskDetail}
    onClose={() => setSelectedTaskDetail(null)}
  />
)}
    </div>
  )
}

export default ProjectList

