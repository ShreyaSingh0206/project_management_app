const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// Get all tickets for a project
router.get('/project/:projectId', async (req, res) => {
  try {
    const tickets = await Ticket.find({ projectId: req.params.projectId });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});

// Update ticket status (or any field)
router.put('/:id', async (req, res) => {
  try {
    const updated = await Ticket.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update ticket' });
  }
});

module.exports = router;