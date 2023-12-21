import { useEffect, useState } from 'react';
import axios from 'axios';
import { Space, Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import EditTodo from '../EditTodo';
import { Duty } from '../../types';

import style from './style.module.scss';

const ListTodos = () => {
	const [todoList, setTodoList] = useState<Duty[]>([]);

	useEffect(() => {
		getTodos();
	}, []);

	const columns: ColumnsType<Duty> = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
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

	const getTodos = async () => {
		try {
			const res = await axios.get('http://localhost:2402/todos/getTodos');
			const todosWithKey = res.data.map((todo: Duty) => ({
				...todo,
				key: todo.todo_id,
			}));
			setTodoList(todosWithKey);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async (todoId: string) => {
		try {
			await axios.delete(`http://localhost:2402/todos/deleteTodo/${todoId}`);
			setTodoList(todoList.filter((todo) => todo.todo_id !== todoId));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{!todoList.length ? (
				<h1>Add a todo</h1>
			) : (
				<Table
					columns={columns}
					dataSource={todoList}
					pagination={{
						pageSize: 5,
					}}
				/>
			)}
		</>
	);
};

export default ListTodos;
