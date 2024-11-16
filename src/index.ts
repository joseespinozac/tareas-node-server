import express, { Router } from "express";
import dbInit from './data/init';
const app = express();
const port = 3000;

dbInit();

import TeamsRoute from "./routes/teams/team.route";

const api = Router().use(TeamsRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(Router().use("/api", api));

app.listen(port, () => {
  console.log(`Server taskify running in port: ${port}`);
});
