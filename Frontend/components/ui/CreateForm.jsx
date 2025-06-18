import React from 'react';
import { RxCross1 } from 'react-icons/rx';
import { useState } from 'react';
import axios from 'axios';

const CreateForm = ({ show, onClose, onProjectCreated }) => {
    const [formData, setFormData] = useState({
    title: '',
    summary: '',
    description: '',
    assignee: '',
    dueDate: '',
    status: '',
    
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/projects`, 
        {
        title: formData.title,
        summary: formData.summary,
        description: formData.description,
        teamMembers: formData.assignee ? [formData.assignee] : [],
      },
      { withCredentials: true }
      );
      console.log("Project created:", res.data); 
      onProjectCreated()
      onClose();
    } catch (err) {
      console.error("Error saving project:", err);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 w-full max-w-2xl h-[70vh] overflow-y-scroll">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Create</h2>
          <button onClick={onClose}>
            <RxCross1 className="text-xl text-gray-600 hover:text-black" />
          </button>
        </div>
        <div className='flex'>
           <p className="mb-4 text-sm text-gray-600">Required fiels are marked with asterick &nbsp;</p>
        <p className='text-red-500'>*</p>
        </div>
        
        <form onSubmit={handleSubmit} >
        <div className="space-y-6">   
                 

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="project" className="block text-sm flex font-medium text-gray-900">
                                    <p>Project Title</p>
                                    <p className='text-red-500'>*</p>
                                </label>
                                <div className="mt-2 flex items-center rounded-md bg-white pl-3 outline outline-1 outline-gray-300 focus-within:outline-2 focus-within:outline-indigo-600">

                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        id="project"
                                        required={true}
                                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="summary" className="block  text-sm font-medium text-gray-900">
                                    Summary
                                    
                                </label>
                                <div className="mt-2 flex items-center rounded-md bg-white pl-3 outline outline-1 outline-gray-300 focus-within:outline-2 focus-within:outline-indigo-600">

                                    <input
                                        type="text"
                                        name="summary"
                                        value={formData.summary}
                                        onChange={handleChange}
                                        id="summary"
                                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                                        placeholder="Enter a summary"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                                    Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        id="description"
                                        rows="3"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                    />
                                </div>
                                <p className="mt-3 text-sm text-gray-600">Write a brief description of the project.</p>
                            </div>

                           

                            <div className="sm:col-span-4">
                                <label htmlFor="duedate" className="block text-sm font-medium text-gray-900">
                                    Due Date
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="dueDate"
                                        name="dueDate"
                                        value={formData.dueDate}
                                        onChange={handleChange}
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
                                        id="status"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                    >
                                        <option value="" disabled hidden>
                                            Select status
                                        </option>
                                        <option value="notStarted">Todo</option>
                                        <option value="inProgress">In Progress</option>
                                        <option value="completed">Done</option>

                                    </select>
                                </div>
                            </div>



                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            type="button"
            className="text-sm font-semibold text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            value='submit'
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Save
          </button>
        </div>
        </form>
      </div>
    </div>
    
    )
}

export default CreateForm
