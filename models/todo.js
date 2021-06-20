const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
	task: { type: String, required: true },
	notes: { type: String, required: true },
	completed: Boolean,
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;