import { useEffect, useState } from 'react';
import axios from 'axios';
import { Space, Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DataType } from '../../types';

import style from './style.module.scss';

const columns: ColumnsType<DataType> = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		render: (text) => <a>{text}</a>,
	},

	{
		title: 'Action',
		key: 'action',
		render: () => (
			<Space size='middle'>
				<Button
					type='primary'
					htmlType='submit'
					size='small'
					className={style.editBtn}
				>
					Edit
				</Button>

				<Button
					type='primary'
					danger
					htmlType='submit'
					size='small'
					className={style.deleteBtn}
				>
					Delete
				</Button>
			</Space>
		),
	},
];

const ListTodos = () => {
	const [todoList, setTodoList] = useState<DataType[]>([]);
	const getTodos = async () => {
		try {
			const res = await axios.get('http://localhost:2402/todos/getTodos');
			const todosWithKey = res.data.map((todo: DataType) => ({
				...todo,
				key: todo.todo_id,
			}));
			setTodoList(todosWithKey);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getTodos();
	}, []);
	return (
		<>
			<Table columns={columns} dataSource={todoList} />
		</>
	);
};

export default ListTodos;
