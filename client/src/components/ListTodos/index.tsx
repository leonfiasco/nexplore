import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import EditTodo from '../EditTodo';
import { Duty } from '../../types';

import style from './style.module.scss';

type props = {
	todoList: Duty[];
	setTodoList: Dispatch<SetStateAction<Duty[]>>;
};

export const getTodos = (setTodoList: Dispatch<SetStateAction<Duty[]>>) => {
	// eslint-disable-next-line no-async-promise-executor
	return new Promise<void>(async (resolve, reject) => {
		try {
			const res = await axios.get('http://localhost:2402/todos/getTodos');
			if (Array.isArray(res.data)) {
				const todosWithKey = res.data.map((todo: Duty) => ({
					...todo,
					key: todo.todo_id,
				}));
				setTodoList(todosWithKey);
				resolve();
			}
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

export const handleDelete = async (
	todoId: string,
	setTodoList: Dispatch<SetStateAction<Duty[]>>
) => {
	try {
		await axios.delete(`http://localhost:2402/todos/deleteTodo/${todoId}`);
		setTodoList((prevTodoList: Duty[]) =>
			prevTodoList.filter((todo: Duty) => todo.todo_id !== todoId)
		);
	} catch (error) {
		console.log(error);
	}
};

const ListTodos = ({ todoList, setTodoList }: props) => {
	const [completedStatus, setCompletedStatus] = useState<{
		[key: string]: boolean;
	}>({});

	useEffect(() => {
		getTodos(setTodoList);
	}, [setTodoList]);

	const handleComplete = (id: string) => {
		setCompletedStatus((prevStatus) => ({
			...prevStatus,
			[id]: !prevStatus[id],
		}));
	};

	const sortedTodoList = todoList.sort((todoA, todoB) => {
		const idA = Number(todoA.todo_id);
		const idB = Number(todoB.todo_id);

		return idB - idA;
	});

	return (
		<>
			{!todoList.length ? (
				<h1>Add a todo</h1>
			) : (
				<table className={style.table}>
					<thead>
						<tr>
							<th>Description</th>
							<th>Action</th>
							<th>Completed</th>
						</tr>
					</thead>
					<tbody>
						{sortedTodoList.map((todo) => (
							<tr key={todo.todo_id}>
								<td>
									<h3 className={`${completedStatus[todo.todo_id] && style.completed}`}>
										{todo.description}
									</h3>
								</td>
								<td>
									<div className={style.buttonGroup}>
										<button type='button' className={`${style.editBtn} ${style.button}`}>
											<EditTodo key={todo.todo_id} todo={todo} />
										</button>
										<button
											type='button'
											className={`${style.deleteBtn} ${style.button}`}
											onClick={() => handleDelete(todo.todo_id, setTodoList)}
										>
											Delete
										</button>
									</div>
								</td>
								<td>
									<input
										type='checkbox'
										name='completed-todo'
										className={style.checkbox}
										checked={completedStatus[todo.todo_id] || false}
										onChange={() => handleComplete(todo.todo_id)}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</>
	);
};

export default ListTodos;
