import { useState } from 'react';
import axios from 'axios';
import { Button, Form, Input } from 'antd';

import styles from './style.module.scss';

const InputTodo = () => {
	const [description, setDescription] = useState('');
	const [error, setError] = useState<string | null>(null);

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
			setError(null);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={styles.inputContainer}>
			<h1 className={styles.title}>Todo List</h1>
			<div className={styles.formWrap}>
				<Form name='basic' className={styles.form} onFinish={handleFormSubmit}>
					<Form.Item>
						<Input
							placeholder='Enter Todo'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						{error && <div className={styles.error}>{error}</div>}
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 22, span: 16 }}>
						<Button
							type='primary'
							htmlType='submit'
							size='large'
							className={styles.btn}
						>
							Add
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default InputTodo;
