import supertest from 'supertest';
import app from '../app';

describe('Todos CRUD operations', () => {
	describe('add a todo', () => {
		it('should return an array containing a todo', async () => {
			const name = 'Do laundry';
			const { body, statusCode } = await supertest(app)
				.post('/todos/addTodo')
				.send({ name });
			expect(statusCode).toBe(200);
			expect(body.length).toBeGreaterThanOrEqual(1);
		});
	});

	describe('get all todos', () => {
		it('should return an array of all todos', async () => {
			const { body, statusCode } = await supertest(app).get('/todos/getTodos');

			expect(statusCode).toBe(200);
			expect(body.length).toBeGreaterThanOrEqual(1);
		});
	});

	describe('edit a todo', () => {
		it('should return an edited todo', async () => {
			const id = 11;
			const name = 'Go grocery shopping';
			const { body, statusCode } = await supertest(app)
				.put(`/todos/editTodo/${id}`)
				.send({ name });

			expect(statusCode).toBe(200);
			expect(body).toEqual({
				message: 'todo was successfully updated',
			});

			const getUpdatedTodoResponse = await supertest(app).get(
				`/todos/getTodo/${id}`
			);
			const updatedTodo = getUpdatedTodoResponse.body[0];

			expect(updatedTodo.name).toBe(name);
		});
	});

	describe('delete a todo', () => {
		it('should delete a todo', async () => {
			const id = 12;
			const { body, statusCode } = await supertest(app).delete(
				`/todos/deleteTodo/${id}`
			);
			expect(statusCode).toBe(200);
			expect(body).toEqual({
				message: 'Todo was successfully deleted',
			});

			const getDeletedTodoResponse = await supertest(app).get(
				`/todos/getTodo/${id}`
			);

			expect(getDeletedTodoResponse.body.err).toEqual('Todo not found');
			expect(getDeletedTodoResponse.status).toBe(404);
		});
	});
});
