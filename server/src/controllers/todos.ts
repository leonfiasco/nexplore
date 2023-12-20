import { Request, Response, NextFunction } from 'express';
import pool from '../db';

const handleQuery = async (query: string, value?: string[]) => {
	return await pool.query(query, value);
};

exports.add_todo = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name } = req.body;
		if (!name) {
			return res.status(400).send({ error: 'Please enter todo description' });
		}
		const newTodo = await handleQuery(
			'INSERT INTO todo (name) VALUES($1) RETURNING *',
			[name]
		);
		res.status(200).json(newTodo.rows);
	} catch (err) {
		next(err);
	}
};

exports.get_all_todos = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const allTodos = await handleQuery('SELECT * FROM todo');
		if (!allTodos.rows.length) {
			res.status(400).send({ error: 'Please add a todo' });
		}
		res.status(200).json(allTodos.rows);
	} catch (err) {
		next(err);
	}
};

exports.get_todo = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		if (!id) {
			return res.status(404).send({ error: 'Please enter todo id' });
		}
		const todo = await handleQuery('SELECT * FROM todo WHERE todo_id = $1', [id]);
		if (!todo.rows.length) {
			return res.status(404).send({ error: 'Todo not found' });
		}
		res.status(200).json(todo.rows);
	} catch (err) {
		next(err);
	}
};

exports.edit_todo = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const { name } = req.body;
		const editTodo = await handleQuery(
			'UPDATE todo SET name = $1 WHERE todo_id = $2',
			[name, id]
		);

		res.status(200).json({
			message: 'todo was successfully update',
		});
	} catch (err) {
		next(err);
	}
};
