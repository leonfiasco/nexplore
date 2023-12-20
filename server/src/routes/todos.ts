import express from 'express';
const router = express.Router();

const todosController = require('../controllers/todos');

router.post('/addTodo', todosController.add_todo);

router.get('/getTodos', todosController.get_all_todos);

router.get('/getTodo/:id', todosController.get_todo);

router.put('/editTodo/:id', todosController.edit_todo);

module.exports = router;
