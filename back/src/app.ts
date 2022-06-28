import 'reflect-metadata';
import express from 'express';
import UserRouter from './user/user.router';

const app = express();
const port = 4000;

app.use(express.json());
app.use("/users", UserRouter);

app.listen(port, () =>
{
	console.log(`Server started successfully on port ${port} !`);
})