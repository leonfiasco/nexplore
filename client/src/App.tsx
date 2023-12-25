import React, { useState } from 'react';
import InputTodo from './components/InputTodo';
import ListTodos from './components/ListTodos';
import { Duty } from './types';

import './App.scss';

function App() {
	const [todoList, setTodoList] = useState<Duty[]>([]);

	const handleAddTodo = (newTodo: Duty) => {
		setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
	};
	return (
		<>
			<InputTodo handleAddTodo={handleAddTodo} />
			<ListTodos todoList={todoList} setTodoList={setTodoList} />
		</>
	);
}

export default App;
