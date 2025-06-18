const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const Task = require('../models/Task');
const authenticateUser = require('../middleware/authMiddleware');

// GET /api/dashboard-counts
router.get('/dashboard-counts', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;

    // Count only projects created by this user
    const projectCount = await Project.countDocuments({ createdBy: userId });

    // Count tasks created by or assigned to the user
    const taskCount = await Task.countDocuments({
      $or: [
        { createdBy: userId },
        { assignee: userId }
      ]
    });

    const todoCount = await Task.countDocuments({
      status: 'Todo',
      $or: [
        { createdBy: userId },
        { assignee: userId }
      ]
    });

    const inProgressCount = await Task.countDocuments({
      status: 'InProgress',
      $or: [
        { createdBy: userId },
        { assignee: userId }
      ]
    });

    const doneCount = await Task.countDocuments({
      status: 'Done',
      $or: [
        { createdBy: userId },
        { assignee: userId }
      ]
    });

    const dueDateBreakdown = await Task.aggregate([
      {
        $match: {
          $or: [{ createdBy: userId }, { assignee: userId }]
        }
      },
      {
        $group: {
          _id: '$dueDate',
          tasksDue: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }  // Sort ascending by dueDate
      }
    ]);

    res.json({
      projectCount,
      taskCount,
      todoCount,
      inProgressCount,
      doneCount,
      dueDateBreakdown
    });
  } catch (error) {
    console.error('Error fetching dashboard counts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
