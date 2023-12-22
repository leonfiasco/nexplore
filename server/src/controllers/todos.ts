import { Request, Response, NextFunction } from 'express';
import pool from '../db';

const handleQuery = async (query: string, value?: string[]) => {
	return await pool.query(query, value);
};

exports.add_todo = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { description } = req.body;
		if (!description) {
			return res.status(400).send({ err: 'Please enter todo description' });
		}
		const newTodo = await handleQuery(
			'INSERT INTO todo (description) VALUES($1) RETURNING *',
			[description]
		);
		res.status(200).json(newTodo.rows[0]);
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
			return res.status(200).json({ message: 'No todos found' });
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
			return res.status(404).send({ err: 'Please enter todo id' });
		}
		const todo = await handleQuery('SELECT * FROM todo WHERE todo_id = $1', [id]);
		if (!todo.rows.length) {
			return res.status(404).send({ err: 'Todo not found' });
		}
		res.status(200).json(todo.rows);
	} catch (err) {
		next(err);
	}
};

exports.edit_todo = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const { description } = req.body;

		const updateResponse = await handleQuery(
			'UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *',
			[description, id]
		);

		if (updateResponse.rows.length === 0) {
			return res.status(404).json({ error: 'Todo not found' });
		}

		const updatedTodo = updateResponse.rows[0];

		return res.status(200).json({
			message: 'Todo was successfully updated',
			todo: updatedTodo,
		});
	} catch (err) {
		next(err);
	}
};

exports.delete_todo = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params;

		await handleQuery('DELETE FROM todo WHERE todo_id = $1', [id]);
		res.status(200).json({
			message: 'Todo was successfully deleted',
		});
	} catch (err) {
		next(err);
	}
};
