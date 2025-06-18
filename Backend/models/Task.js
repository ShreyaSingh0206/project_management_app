const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  assignee: String,
  dueDate: Date,
  reporter: String,
  status: String,
  assignee: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: false,
  default: null
},
  projectId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Project',
  required: true
},
createdBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
}
}, {
  timestamps: true // Automatically manage createdAt and updatedAt fields
});

module.exports = mongoose.model('Task', taskSchema);
