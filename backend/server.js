import express from "express";
import dotenv from "dotenv";
import todoRoutes from "./routes/todo.route.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
// app.use(cors());

app.use("/api/todos", todoRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(
      path.join(__dirname, "Frontend", "mern-todo-app", "dist")
    )
  );

  app.get("/{*splat}", (req, res) => {
    res.sendFile(
      path.join(
        __dirname,
        "Frontend",
        "mern-todo-app",
        "dist",
        "index.html"
      )
    );
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started on port ${PORT}`);
});