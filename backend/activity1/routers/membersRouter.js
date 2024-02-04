// routers/membersRouter.js

const express = require('express');
const membersController = require('../controllers/membersController');
const router = express.Router();

// Get All Members
router.get('/', membersController.getAllMembers);

// Get Single Member by ID
router.get('/:id', membersController.getMemberById);

// Create a New Member
router.post('/', membersController.createMember);

// Update Member by ID
router.put('/:id', membersController.updateMember);

// Delete Member by ID
router.delete('/:id', membersController.deleteMember);

module.exports = router;