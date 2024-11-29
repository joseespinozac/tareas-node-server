import express, { Application, Request, Response, Router } from "express";
import routes from "./routes";
import dbInit from './data/init';
import cors from 'cors';
import User, { UserCreationAttributes } from "./data/models/user-model.sequelize";
const port = 3000;

dbInit();

export const get = () => {
  const app: Application = express()

  app.use(cors({
    origin: 'http://localhost:4200',
  }));

  // Body parsing Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.get('/', async(_req: Request, res: Response) => {
      res.status(200).send({ message: `Welcome to the tasks manager API! \n Endpoints available at http://localhost:${port}/api/v1` })
  })
  
  app.use('/api/v1', routes)

  return app
}

export const start = () => {
  const app = get()
  try {
      app.listen(port, () => {
          console.log(`Server running on http://localhost:${port}`)
      })
  } catch (error: any) {
      console.log(`Error occurred: ${error.message}`)
  }
}

start();

