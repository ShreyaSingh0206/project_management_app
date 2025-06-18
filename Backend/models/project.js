const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: String,
  description: String,
  assignee: String,
  dueDate: Date,
  status: String,
  teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
}
});

module.exports = mongoose.model('Project', projectSchema);
