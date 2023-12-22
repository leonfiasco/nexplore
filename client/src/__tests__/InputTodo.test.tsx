jest.mock('antd/lib/_util/responsiveObserver');
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import InputTodo from '../components/InputTodo';

describe('Add odo endpoiunt', () => {
	const server = setupServer(
		rest.post('http://localhost:2402/todos/addTodo', (req, res, ctx) => {
			return res(ctx.status(200), ctx.json({ success: true }));
		})
	);

	beforeAll(() => server.listen());

	afterEach(() => server.resetHandlers());

	afterAll(() => server.close());

	describe('button should render correctly', () => {
		test('should render the add button', async () => {
			render(<InputTodo />);

			const addBtn = await screen.findByRole('button', { name: /add/i });
			expect(addBtn).toBeTruthy();
		});
	});

	test('should be able to add a todo', async () => {
		render(<InputTodo />);
		const description = 'do homework';

		await act(async () => {
			fireEvent.change(screen.getByPlaceholderText(/Enter todo/i), {
				target: { value: description },
			});

			fireEvent.click(screen.getByRole('button', { name: /add/i }));
		});

		expect(screen.getByPlaceholderText(/ /i)).toHaveValue('');
	});
});
