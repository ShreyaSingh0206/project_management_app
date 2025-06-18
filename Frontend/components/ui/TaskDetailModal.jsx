import React from 'react';
import { Button } from './button';

const TaskDetailModal = ({ task, onClose }) => {
  if (!task) return null;

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm ">
      <div className="bg-gradient-to-br from-violet-200 via-violet-100 to-white bg-opacity-70 bg-opacity-90 rounded-2xl shadow-2xl p-8 w-full max-w-lg border border-gray-200 backdrop-blur-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 text-center">📋 Task Details</h2>
        
        <div className="space-y-3 text-gray-800">
          <div><span className="font-medium text-gray-600">Title:</span> {task.title}</div>
          <div><span className="font-medium text-gray-600">Summary:</span> {task.summary}</div>
          <div><span className="font-medium text-gray-600">Status:</span> 
            <span className={`ml-1 px-2 py-0.5 rounded text-white text-sm ${
              task.status === 'Done' ? 'bg-green-500' : 
              task.status === 'In Progress' ? 'bg-yellow-500' : 
              'bg-red-500'
            }`}>
              {task.status}
            </span>
          </div>
          <div><span className="font-medium text-gray-600">Assignee:</span> {task.assignee || '—'}</div>
          <div><span className="font-medium text-gray-600">Reporter:</span> {task.reporter || '—'}</div>
          <div><span className="font-medium text-gray-600">Created At:</span> {formatDate(task.createdAt)}</div>
          <div><span className="font-medium text-gray-600">Last Updated:</span> {formatDate(task.updatedAt)}</div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button onClick={onClose} className="bg-violet-600 text-white hover:opacity-90">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;
