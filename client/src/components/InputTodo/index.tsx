import React, { useState } from 'react';
import axios from 'axios';

import styles from './style.module.scss';

const InputTodo = () => {
	const [description, setDescription] = useState('');
	const [error, setError] = useState('');

	const handleFormSubmit = async () => {
		try {
			if (!description.trim()) {
				setError('Please enter a todo description');
				return;
			}

			await axios.post('http://localhost:2402/todos/addTodo', {
				description,
			});

			window.location.reload();
			setDescription('');
			setError('');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={styles.inputContainer}>
			<h1 className={styles.title}>Todo List</h1>
			<div className={styles.formWrap}>
				<form name='basic' className={styles.form} onSubmit={handleFormSubmit}>
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
