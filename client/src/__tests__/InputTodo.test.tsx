import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import InputTodo from '../components/InputTodo';
import userEvent from '@testing-library/user-event';

describe('Add todo endpoiunt', () => {
	const server = setupServer(
		rest.post('http://localhost:2402/todos/addTodo', (req, res, ctx) => {
			return res(ctx.status(200), ctx.json({ status: 200, todo: 'eat food' }));
		})
	);

	beforeAll(() => server.listen());

	afterAll(() => server.close());

	afterEach(() => {
		server.resetHandlers();
	});

	test('should render the add button', async () => {
		render(<InputTodo handleAddTodo={jest.fn()} />);

		const addBtn = await screen.findByRole('button', { name: /add/i });
		expect(addBtn).toBeTruthy();
	});
	test('should render the add button and click add button', async () => {
		render(<InputTodo handleAddTodo={jest.fn()} />);

		const inputField = screen.getByPlaceholderText('Enter Todo');

		userEvent.type(inputField, 'New Todo');

		fireEvent.change(inputField, { target: { value: 'New Todo' } });

		expect(inputField).toHaveValue('New Todo');

		const addBtn = await screen.findByRole('button', { name: /add/i });
		fireEvent.click(addBtn);
	});
	// });

	test('should render the add button and click add button for failure response', async () => {
		server.use(
			rest.post('http://localhost:2402/todos/addTodo', (req, res, ctx) => {
				return res(ctx.status(500), ctx.json({ error: 'Internal Server Error' }));
			})
		);

		render(<InputTodo handleAddTodo={jest.fn()} />);

		const inputField = screen.getByPlaceholderText('Enter Todo');

		userEvent.type(inputField, 'New Todo');

		fireEvent.change(inputField, { target: { value: 'New Todo2' } });

		expect(inputField).toHaveValue('New Todo2');

		const addBtn = await screen.findByRole('button', { name: /add/i });
		fireEvent.click(addBtn);
	});

	test('should not add a todo on empty form submission', async () => {
		render(<InputTodo handleAddTodo={jest.fn()} />);

		await fireEvent.click(screen.getByRole('button', { name: /add/i }));

		const getErrorMsg = await screen.findByText(
			/please enter a todo description/i
		);

		expect(getErrorMsg).toBeTruthy();
	});
});
