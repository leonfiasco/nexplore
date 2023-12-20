import { useState } from 'react';
import './App.css';
import InputTodo from './components/InputTodo';
import ListTodos from './components/ListTodos';

function App() {
	return (
		<>
			<InputTodo />
			<ListTodos />
		</>
	);
}

export default App;
