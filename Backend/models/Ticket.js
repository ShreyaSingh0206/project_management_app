const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
  status: {
    type: String,
    enum: ['Todo', 'inProgress', 'Done'],
    default: 'Todo'
  },
  assignee: { type: String },
  reporter: { type: String },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);