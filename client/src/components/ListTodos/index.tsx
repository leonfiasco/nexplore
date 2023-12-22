import React, { useEffect, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { Space, Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import EditTodo from '../EditTodo';
import { Duty } from '../../types';

import style from './style.module.scss';

type props = {
	todoList: Duty[];
	setTodoList: Dispatch<SetStateAction<Duty[]>>;
};

const ListTodos = ({ todoList, setTodoList }: props) => {
	const getTodos = async () => {
		try {
			const res = await axios.get('http://localhost:2402/todos/getTodos');
			if (Array.isArray(res.data)) {
				const todosWithKey = res.data.map((todo: Duty) => ({
					...todo,
					key: todo.todo_id,
				}));
				setTodoList(todosWithKey);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getTodos();
	}, []);

	const columns: ColumnsType<Duty> = [
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
			render: (text) => <h4>{text}</h4>,
		},
		{
			title: 'Action',
			key: 'action',
			render: (record) => (
				<Space size='middle'>
					<Button
						type='primary'
						htmlType='submit'
						size='small'
						className={style.editBtn}
					>
						<EditTodo key={record.todo_id} todo={record} />
					</Button>
					<Button
						type='primary'
						danger
						htmlType='submit'
						size='small'
						onClick={() => handleDelete(record.todo_id)}
						className={style.deleteBtn}
					>
						Delete
					</Button>
				</Space>
			),
		},
	];

	const handleDelete = async (todoId: string) => {
		try {
			await axios.delete(`http://localhost:2402/todos/deleteTodo/${todoId}`);
			setTodoList((prevTodoList: Duty[]) =>
				prevTodoList.filter((todo: Duty) => todo.todo_id !== todoId)
			);
		} catch (error) {
			console.log(error);
		}
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
									<h3>{todo.description}</h3>
								</td>
								<td>
									<div className={style.buttonGroup}>
										<button type='button' className={`${style.editBtn} ${style.button}`}>
											<EditTodo key={todo.todo_id} todo={todo} />
										</button>
										<button
											type='button'
											className={`${style.deleteBtn} ${style.button}`}
											onClick={() => handleDelete(todo.todo_id)}
										>
											Delete
										</button>
									</div>
								</td>
								<td>
									<input type='checkbox' name='completed-todo' id='' />
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
