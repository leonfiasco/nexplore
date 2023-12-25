import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import ListTodos from '@/components/ListTodos';

const todoList = [
	{ todo_id: '1', description: 'Hoover house' },
	{ todo_id: '2', description: 'Water plants' },
	{ todo_id: '3', description: 'walk the dog' },
];

describe('todos should render correctly', () => {
	const server = setupServer(
		rest.get('http://localhost:2402/todos/getTodos', (req, res, ctx) => {
			return res(ctx.status(200), ctx.json(todoList));
		}),
		rest.delete(
			'http://localhost:2402/todos/deleteTodo/:todoId',
			(req, res, ctx) => {
				return res(ctx.status(200));
			}
		)
	);

	beforeAll(() => server.listen());
	afterAll(() => server.close());
	afterEach(() => server.resetHandlers());

	test('should render todos', async () => {
		render(<ListTodos todoList={todoList} setTodoList={jest.fn} />);

		for (const todo of todoList) {
			const todoElement = await screen.findByText(todo.description);
			expect(todoElement).toBeInTheDocument();
		}
		screen.debug();
		// Find the checkbox using its name
		// const checkboxes = screen.getAllByRole('checkbox', { name: 'completed-todo' });

		// // Assert that the checkbox is checked based on the completedStatus
		// expect(checkboxes[1]).toBeChecked();

		// // Simulate a change in the checkbox state
		// fireEvent.change(checkboxes[1]);
	});

	test('should render todos and delete a todo', async () => {
		const todoToDelete = todoList[0];

		server.use(
			rest.delete(
				`http://localhost:2402/todos/deleteTodo/${todoToDelete.todo_id}`,
				(req, res, ctx) => {
					return res(ctx.status(200));
				}
			)
		);

		render(<ListTodos todoList={todoList} setTodoList={jest.fn()} />);

		for (const todo of todoList) {
			const todoElement = await screen.findByText(todo.description);

			expect(todoElement).toBeInTheDocument();
		}

		const deleteBtn = await screen.getByRole('button', {
			name: `Delete ${todoToDelete.description}`,
		});

		fireEvent.click(deleteBtn);

		await waitFor(() => {
			const deletedTodoElement = screen.queryByText(todoToDelete.description);

			expect(deletedTodoElement).toBeInTheDocument();
		});
	});
	test('should render todos and delete a todo for failure response', async () => {
		const todoToDelete = todoList[0];

		server.use(
			rest.delete(
				`http://localhost:2402/todos/deleteTodo/${todoToDelete.todo_id}`,
				(req, res, ctx) => {
					return res(ctx.status(500), ctx.json({ error: 'Internal Server Error' }));
				}
			)
		);

		render(<ListTodos todoList={todoList} setTodoList={jest.fn()} />);

		for (const todo of todoList) {
			const todoElement = await screen.findByText(todo.description);

			expect(todoElement).toBeInTheDocument();
		}

		const deleteBtn = await screen.getByRole('button', {
			name: `Delete ${todoToDelete.description}`,
		});

		fireEvent.click(deleteBtn);

		await waitFor(() => {
			const deletedTodoElement = screen.queryByText(todoToDelete.description);

			expect(deletedTodoElement).toBeInTheDocument();
		});
	});

	test('handles failed todo items list fetch', async () => {
		// Set up a different handler for a failed response
		server.use(
			rest.get('http://localhost:2402/todos/getTodos', (req, res, ctx) => {
				return res(ctx.status(500), ctx.json({ error: 'Internal Server Error' }));
			})
		);

		render(<ListTodos todoList={[]} setTodoList={jest.fn} />);

		// Your test logic here to handle the failed response

		// Ensure that the component handles the failed fetch appropriately
		// await waitFor(() => {
		// Your assertions here
		// });
	});
});
