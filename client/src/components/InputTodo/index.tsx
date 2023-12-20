import { FormEvent, useState } from 'react';
import axios from 'axios';
import { Button, Form, Input } from 'antd';

import styles from './style.module.scss';

const InputTodo = () => {
	const [name, setName] = useState('');

	const handleFormSubmit = async () => {
		try {
			await axios.post('http://localhost:2402/todos/addTodo', {
				name,
			});
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
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
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
