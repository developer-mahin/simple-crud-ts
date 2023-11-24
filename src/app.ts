/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import express, { Application, NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import cors from 'cors';
import { userRouter } from './app/Modules/user.route';
const app: Application = express();

// build in middleware
app.use(express.json());
app.use(cors());

// routers
app.use('/api/users', userRouter);

app.get('/', async (req: Request, res: Response) => {
  res.json({
    message: 'welcome to the server',
  });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  next(
    createError(404, 'Route not found please send request in a valid route'),
  );
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, req: Request, res: Response) => {
  res.status(err.status || 500).json({
    success: false,
    message: "User not found",
    error: {
      code: 404,
      description: "User not found!"
    }
  });
});
export default app;
