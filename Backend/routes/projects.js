const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const User = require('../models/user');
const authMiddleware = require('../middleware/authMiddleware');

// Create a project
router.post('/', authMiddleware, async (req, res) => {
  console.log("Incoming request:", req.body); 
  try {
    const newProject = new Project({
      ...req.body,
      createdBy: req.user.id, // ✅ store who created it
    })
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
     console.error("Error saving to DB:", err);
    res.status(500).json({ message: err.message });
  }
});

// Get all projects
router.get('/', authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find({ createdBy: req.user.id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:projectId', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
      createdBy: req.user.id, // ✅ Only if user created it
    }).populate('teamMembers', 'username email');
    if (!project) return res.status(404).json({ error: 'Project not found' });

    res.json(project);
  } catch (err) {
    console.error('Error fetching project:', err);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

   // Add member to project team
router.post('/:projectId/team/add', authMiddleware, async (req, res) => {
  const { email } = req.body;
   const { projectId } = req.params;

  try {
    const user = await User.findOne({ email }); 
    if (!user) return res.status(404).json({ error: 'User not found' });

    const project = await Project.findOne({ _id: projectId, createdBy: req.user.id });
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const alreadyMember = project.teamMembers.some(
      (memberId) => memberId.toString() === user._id.toString()
    );

    if (!alreadyMember) {
      project.teamMembers.push(user._id);
      await project.save();
    }
  
     // ✅ Populate team for frontend
    const updatedProject = await Project.findById(req.params.projectId).populate('teamMembers', 'username email');
    res.json({ message: 'Member added', team: updatedProject.teamMembers });

  } catch (err) {
    console.error('Error adding member:', err);
    res.status(500).json({ error: 'Failed to add member' });
  }
});
module.exports = router;
