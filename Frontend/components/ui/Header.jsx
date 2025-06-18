import React, { useState, useEffect } from 'react';
import { Button } from './button';
import axios from 'axios';

const Header = ({ tasks, setFilteredTasks }) => {
  const [searchInput, setSearchInput] = useState('');
  const [message, setMessage] = useState('');

  const handleSearch = async () => {
    if (!searchInput.trim()) {
      setFilteredTasks(tasks); // show all if cleared
      setMessage('');
      return;
    }

    const filtered = tasks.filter(task =>
      task.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    if (filtered.length > 0) {
      setFilteredTasks(filtered);
      setMessage('');
    } else {
      setFilteredTasks([]);
      setMessage('No matching task found.');
    }
  };

  return (
    <header className="bg-gray-50 dark:bg-gray-900 w-full px-4 py-4 shadow-md z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 md:flex-row md:items-center ">
          {/* Search */}
          <div className="w-full md:w-2/3">
            <form className="relative w-full">
              <label htmlFor="simple-search" className="sr-only">Search</label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Search tasks..."

              />
            </form>
          </div>

          {/* Button */}
          <div className="w-full md:w-auto flex justify-center md:justify-end">
            <Button onClick={handleSearch} className="w-full md:w-auto bg-blue-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 text-white">Search</Button>
          </div>
        </div>
      </div>
    
      {message && <p className="absolute top-full mt-2 text-red-500">{message}</p>}
    </header>
  );
};

export default Header;

