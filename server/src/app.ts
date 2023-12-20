import express from 'express';
import http from 'http';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';

const app = express();

const todoRoutes = require('./routes/todos');

app.use(compression());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/todos', todoRoutes);

const server = http.createServer(app);

server.listen(2402, () => {
	console.log(`Server running on port: 2402`);
});

export default app;
