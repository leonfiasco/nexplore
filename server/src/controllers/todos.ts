import { Request, Response, NextFunction } from 'express';
import pool from '../db';

exports.add_todo = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { description } = req.body;
		if (!description) {
			return res.status(400).send({ error: 'Please enter todo description' });
		}
		const newTodo = await pool.query(
			'INSERT INTO todo (description) VALUES($1) RETURNING *',
			[description]
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
		const allTodos = await pool.query('SELECT * FROM todo');
		res.json(allTodos.rows);
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
		const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id]);
		if (!todo.rows.length) {
			return res.status(404).send({ error: 'Todo not found' });
		}
		res.status(200).json(todo.rows);
	} catch (err) {
		next(err);
	}
};
