// require and set up dependencies 
const express = require('express');
const todosRouter = express.Router(); 
const Todo = require('../models/todo');


// Index
todosRouter.get('/', (req, res) => {
	Todo.find({}, (error, allTodos) => {
		res.render('index.ejs', {
			todos: allTodos,
		});
	});
});

// New Route
todosRouter.get('/new', (req, res) => {
	res.render('new.ejs');
});

// Delete Route
todosRouter.delete('/:id', (req, res) => {
	Todo.findByIdAndDelete(req.params.id, (error, deletedTodo) => {
		res.redirect('/todos');
	});
});

// Update
todosRouter.put('/:id', (req, res) => {
	if (req.body.readyToEat === 'on') {
		req.body.readyToEat = true;
	} else {
		req.body.readyToEat = false;
	}
	Todo.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedTodo) => {
		res.redirect(`/todos/${req.params.id}`);
	});
});

// Create
todosRouter.post('/', (req, res) => {
	if (req.body.completed === 'on') {
		req.body.completed = true;
	} else {
		req.body.completed = false;
	}
        Todo.create(req.body, (error, createdTodo) => {
        res.redirect(`/todos/${createdTodo._id}`);
	});
});

// Edit
todosRouter.get('/:id/edit', (req, res) => {
	Todo.findById(req.params.id, (error, foundTodo) => {
		res.render('edit.ejs', {
			todo: foundTodo
		});
	});
});

// Show
todosRouter.get('/:id', (req, res) => {
	Todo.findById(req.params.id, (err, foundTodo) => {
		res.render('show.ejs', {
			todo: foundTodo,
		});
	});
});


// export functionality 
module.exports = todosRouter;