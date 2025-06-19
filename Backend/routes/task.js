const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');

// Create a Task
router.post('/',  authMiddleware, async (req, res) => {
  console.log("Incoming request:", req.body); 
  try {
    const newTask = new Task({
      ...req.body,
      createdBy: req.user.id // ✅ Store creator info
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
     console.error("Error saving to DB:", err);
    res.status(500).json({ message: err.message });
  }
});

// Get all Tasks
router.get('/',  authMiddleware, async (req, res) => {
  const { projectId, search } = req.query;
  let query = { createdBy: req.user.id };

  if (projectId) query.projectId = projectId;

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { summary: { $regex: search, $options: 'i' } }
    ];
  }
 try {
    const tasks = await Task.find(query);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a Task
router.put('/:id',authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, createdBy: req.user.id }, // ✅ Only allow if user created it
      req.body,
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: err.message });
  }
});


// Delete a Task
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id // ✅ Only delete own task
    });

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ message: 'Failed to delete task' });
  }
});




module.exports = router;