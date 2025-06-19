import React from 'react';
import { useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import axios from 'axios';

const DraggableTask = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
    data: { task }, // Pass task in drag data
  });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={`p-4 rounded-xl shadow-md hover:shadow-lg transition ${
        {
          Todo: 'bg-blue-100',
          InProgress: 'bg-red-100',
          Done: 'bg-green-100',
        }[task.status]
      }`}
    >
      <h4 className="font-semibold text-blue-700">{task.title}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{task.summary}</p>
      <p className="text-xs text-red-500 mt-2">Status: {task.status}</p>
    </div>
  );
};

const DroppableColumn = ({ status, children }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 min-w-[250px] rounded-xl p-2 ${
        {
          Todo: 'bg-blue-200',
          InProgress: 'bg-red-200',
          Done: 'bg-green-200',
        }[status]
      } ${isOver ? 'ring-2 ring-black' : ''}`}
    >
      <h3
        className={`text-lg font-bold text-center pt-4 pb-2 ${
          {
            Todo: 'text-indigo-800',
            InProgress: 'text-rose-800',
            Done: 'text-lime-900',
          }[status]
        }`}
      >
        {status}
      </h3>
      <div className="space-y-4 w-3/4 mx-auto">{children}</div>
    </div>
  );
};

const KanbanBoard = ({ projectId, tasks = [], setTasks }) => {
  const columns = {
    Todo: tasks.filter((task) => task.status === 'Todo'),
    InProgress: tasks.filter((task) => task.status === 'InProgress'),
    Done: tasks.filter((task) => task.status === 'Done'),
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over || !active || active.id === over.id) return;

    const taskId = active.id;
    const newStatus = over.id;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );

    try {
      await axios.put(`/api/tickets/${taskId}`, { status: newStatus }, {
        withCredentials: true,
      });
      console.log("Task status updated successfully");
    } catch (err) {
      console.error("Failed to update task status:", err);
    }
  };
   const fetchTasks = async () => {
    try {
      const res = await axios.get(`/api/tasks?projectId=${projectId}`, {
        withCredentials: true,
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex space-x-4 px-6 py-4 overflow-x-auto">
        {Object.entries(columns).map(([status, taskList]) => (
          <DroppableColumn key={status} status={status}>
            {taskList.map((task) => (
              <DraggableTask key={task._id} task={task} />
            ))}
            {taskList.length === 0 && (
              <p className="text-sm text-gray-500 text-center dark:text-gray-400">
                No tasks
              </p>
            )}
          </DroppableColumn>
        ))}
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
