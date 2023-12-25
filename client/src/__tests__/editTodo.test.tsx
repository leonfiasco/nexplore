import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import EditTodo from '../components/EditTodo';

describe('Add todo endpoiunt', () => {
	const newDuty = {
		todo_id: '123',
		description: 'make bed',
	};
	const server = setupServer(
		rest.put(
			`http://localhost:2402/todos/editTodo/${newDuty.todo_id}`,
			(req, res, ctx) => {
				return res(ctx.status(200), ctx.json({ status: 200, todo: 'eat food' }));
			}
		)
	);

	beforeAll(() => server.listen());

	afterAll(() => server.close());

	afterEach(() => {
		server.resetHandlers();
	});
	describe('button should render correctly', () => {
		test('should render the add button', async () => {
			const newDuty = {
				todo_id: '123',
				description: 'make bed',
			};
			render(<EditTodo todo={newDuty} />);

			const editLink = screen.getByText('Edit');

			expect(editLink).toBeInTheDocument();
		});

		test('open edit modal on click edit, click cancel button', async () => {
			const newDuty = {
				todo_id: '123',
				description: 'hello',
			};
			render(<EditTodo todo={newDuty} />);

			const editBtn = screen.getByText('Edit');

			fireEvent.click(editBtn);

			const cancelBtn = screen.getByText('Cancel');
			fireEvent.click(cancelBtn);
		});
		test('open edit modal on click edit, click ok button', async () => {
			const newDuty = {
				todo_id: '123',
				description: 'make bed',
			};
			server.use(
				rest.put(
					`http://localhost:2402/todos/editTodo/${newDuty.todo_id}`,
					(req, res, ctx) => {
						return res(ctx.status(500), ctx.json({ error: 'Internal Server Error' }));
					}
				)
			);

			render(<EditTodo todo={newDuty} />);

			const editBtn = screen.getByText('Edit');

			fireEvent.click(editBtn);

			const inputField = screen.getByTestId('myinput');

			fireEvent.change(inputField, { target: { value: 'New Todo2' } });

			expect(inputField).toHaveValue('New Todo2');

			const editBtn2 = screen.getAllByText('Edit');
			fireEvent.click(editBtn2[1]);
		});
	});
});
