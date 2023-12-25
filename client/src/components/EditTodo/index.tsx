import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Input } from 'antd';
import { Duty } from '../../types';

type props = {
	todo: Duty;
};

const EditTodo = ({ todo }: props) => {
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [description, setDescription] = useState(todo.description);

	const showModal = () => {
		setOpen(true);
	};

	const editDescription = async () => {
		try {
			const res = await axios.put(
				`http://localhost:2402/todos/editTodo/${todo.todo_id}`,
				{ description: description }
			);
			if (res.status === 200) {
				window.location.reload();
			}
		} catch (error) {
			console.log('===>', error);
		}
	};

	const handleOk = () => {
		setConfirmLoading(true);
		editDescription();
		setOpen(false);
		setConfirmLoading(false);
	};

	const handleCancel = () => {
		setOpen(false);
		setDescription(todo.description);
	};

	return (
		<>
			<a onClick={showModal}>Edit</a>
			<Modal
				title='Edit Todo'
				open={open}
				onOk={handleOk}
				okText='Edit'
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
			>
				<Input
					value={`${description}`}
					data-testid='myinput'
					onChange={(e) => setDescription(e.target.value)}
				/>
			</Modal>
		</>
	);
};

export default EditTodo;
