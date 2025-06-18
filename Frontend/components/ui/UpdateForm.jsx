import React, { useState, useEffect } from 'react';
import { set } from 'react-hook-form';
import { RxCross1 } from 'react-icons/rx';
import axios from 'axios';

const UpdateForm = ({ task, projectId, teamMembers = [], onClose, onUpdate }) => {
    const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [assignee, setAssignee] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('');
  const [fetchedMembers, setFetchedMembers] = useState([]);
  const [assigneeList, setAssigneeList] = useState(teamMembers);


  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setSummary(task.summary);
      setAssignee(task.assignee || '');
      setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
      setStatus(task.status);
    }
  }, [task]);

 useEffect(() => {
  if (teamMembers.length === 0 && projectId) {
    axios
      .get(`http://localhost:3000/api/projects/${projectId}/team`, { withCredentials: true }) 
      .then(res => {
        setFetchedMembers(res.data.teamMembers);
        setAssigneeList(res.data.teamMembers); // ✅ update list
      })
      .catch(err => console.error("Failed to fetch team members", err));
  }
}, [projectId, teamMembers]);


   const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTask = { ...task, title, summary,  dueDate, status,
      assignee: task.assignee === '' ? null : task.assignee,
      reporter: task.reporter === '' ? null : task.reporter,
     };
    onUpdate(updatedTask);
  };

  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm">
                <div className="relative bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 w-full max-w-2xl h-[70vh] overflow-y-scroll">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Update</h2>
                    <button onClick={onClose}>
                      <RxCross1 className="text-xl text-gray-600 hover:text-black" />
                    </button>
                  </div>
          
                  <p className="mb-4 text-sm text-gray-600">Make changes to your task.</p>
                  <form onSubmit={handleSubmit} >
                  <div className="space-y-6">   
                           
          
                                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                      <div className="sm:col-span-4">
                                          <label htmlFor="project" className="block text-sm font-medium text-gray-900">
                                              Task Title
                                          </label>
                                          <div className="mt-2 flex items-center rounded-md bg-white pl-3 outline outline-1 outline-gray-300 focus-within:outline-2 focus-within:outline-indigo-600">
          
                                              <input
                                                  type="text"
                                                  value={title}
                                                  onChange={(e) => setTitle(e.target.value)}
                                                  className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                                              />
                                          </div>
                                      </div>
          
                                      <div className="sm:col-span-4">
                                          <label htmlFor="summary" className="block text-sm font-medium text-gray-900">
                                              Summary
                                          </label>
                                          <div className="mt-2 flex items-center rounded-md bg-white pl-3 outline outline-1 outline-gray-300 focus-within:outline-2 focus-within:outline-indigo-600">
          
                                              <input
                                                  type="text"
                                                  value={summary}
                                                  onChange={(e) => setSummary(e.target.value)}
                                                  className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                                                  placeholder="Enter a summary"
                                              />
                                          </div>
                                      </div>

                                      <div className="sm:col-span-4">
                                          <label htmlFor="assignee" className="block text-sm font-medium text-gray-900">
                                              Assignee
                                          </label>
                                          <div >
                                              <select
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm'
                  
             
            >
              <option value="" >None</option>
                      {assigneeList.map(member => (
                        <option key={member._id} value={member.email}>
                          {member.email} {member.username ? `(${member.username})` : ''}
                        </option>
              ))}
            </select>
                                          </div>
                                      </div>
          
          
                                      <div className="sm:col-span-4">
                                          <label htmlFor="duedate" className="block text-sm font-medium text-gray-900">
                                              Due Date
                                          </label>
                                          <div className="mt-2">
                                              <input
                                                  id="dueDate"
                                                  name="dueDate"
                                                  value={dueDate}
                                                  onChange={(e) => setDueDate(e.target.value)}
                                                  type="date"
                                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                              />
                                          </div>
                                      </div>

                                      <div className="sm:col-span-4">
                                          <label htmlFor="status" className="block text-sm font-medium text-gray-900">
                                              Status
                                          </label>
                                          <div className="mt-2">
                                              <select
                                                  value={status}
                                                  onChange={(e) => setStatus(e.target.value)}
                                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                              >
                                                  <option value="" disabled hidden>
                                                      Select status
                                                  </option>
                                                  <option value="Todo">Todo</option>
                                                  <option value="InProgress">In Progress</option>
                                                  <option value="Done">Done</option>
          
                                              </select>
                                          </div>
                                      </div>
          
          
          
                                  </div>
                              </div>
          
                              <div className="flex justify-end gap-4 mt-8">
                    <button
                      
                      type="button"
                      onClick={onClose} 
                      className="text-sm font-semibold text-gray-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      value='submit'
                      className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                    >
                      Update
                    </button>
                  </div>
                  </form>
                </div>
              </div>
  )
}

export default UpdateForm
