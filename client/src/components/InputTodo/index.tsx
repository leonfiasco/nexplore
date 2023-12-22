import React, { useState } from 'react';
import axios from 'axios';
import { Duty } from '@/types';

import styles from './style.module.scss';

type props = {
	handleAddTodo: (newTodo: Duty) => void;
};

const InputTodo = ({ handleAddTodo }: props) => {
	const [description, setDescription] = useState('');
	const [error, setError] = useState('');

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			if (!description.trim()) {
				setError('Please enter a todo description');
				return;
			}

			const res = await axios.post('http://localhost:2402/todos/addTodo', {
				description,
			});
			if (res.status === 200) {
				handleAddTodo(res.data);
				setDescription('');
				setError('');
			}
		} catch (error) {
			console.log(error);

			setError('An error occurred while adding the todo.');
		}
	};

	return (
		<div className={styles.inputContainer}>
			<h1 className={styles.title}>Todo List</h1>
			<div className={styles.formWrap}>
				<form
					name='basic'
					className={styles.form}
					onSubmit={(e) => handleFormSubmit(e)}
				>
					<input
						placeholder='Enter Todo'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					{error && <div className={styles.error}>{error}</div>}

					<button className={styles.btn}>Add</button>
				</form>
			</div>
		</div>
	);
};

export default InputTodo;
