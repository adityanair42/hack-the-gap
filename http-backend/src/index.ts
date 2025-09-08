import express from "express";
import type { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/signup", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  res.json("Signup req received");
});

app.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  res.json("Login req received");
});

app.listen(1234);