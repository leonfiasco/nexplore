import supertest from 'supertest';
import app from '../app';

// describe('Todos CRUD operations', () => {
// 	describe('add a todo', () => {
// 		it('should return an array containing a todo', async () => {
// 			const description = 'Do laundry';
// 			const { body, statusCode } = await supertest(app)
// 				.post('/todos/addTodo')
// 				.send({ description });
// 			expect(statusCode).toBe(200);
// 			expect(body.length).toBeGreaterThanOrEqual(1);
// 		});
// 	});

// 	describe('get all todos', () => {
// 		it('should return an array of all todos', async () => {
// 			const { body, statusCode } = await supertest(app).get('/todos/getTodos');

// 			expect(statusCode).toBe(200);
// 			expect(body.length).toBeGreaterThanOrEqual(1);
// 		});
// 	});

// 	describe('edit a todo', () => {
// 		it('should return an edited todo', async () => {
// 			const id = 52;
// 			const description = 'Go grocery shopping';
// 			const { body, statusCode } = await supertest(app)
// 				.put(`/todos/editTodo/${id}`)
// 				.send({ description });

// 			expect(statusCode).toBe(200);

// 			const getUpdatedTodoResponse = await supertest(app).get(
// 				`/todos/getTodo/${id}`
// 			);
// 			const updatedTodo = getUpdatedTodoResponse.body[0];

// 			expect(body).toEqual({
// 				message: 'Todo was successfully updated',
// 				todo: updatedTodo,
// 			});

// 			expect(updatedTodo.description).toBe(description);
// 		});
// 	});

// 	describe('delete a todo', () => {
// 		it('should delete a todo', async () => {
// 			const id = 51;
// 			const { body, statusCode } = await supertest(app).delete(
// 				`/todos/deleteTodo/${id}`
// 			);
// 			expect(statusCode).toBe(200);
// 			expect(body).toEqual({
// 				message: 'Todo was successfully deleted',
// 			});

// 			const getDeletedTodoResponse = await supertest(app).get(
// 				`/todos/getTodo/${id}`
// 			);

// 			expect(getDeletedTodoResponse.body.err).toEqual('Todo not found');
// 			expect(getDeletedTodoResponse.status).toBe(404);
// 		});
// 	});
// });
