import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";
import { processFile } from "../streams/stream-csv-parse.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const users = database.select("users");
      return res.end(JSON.stringify(users));
    },
  },

  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const {
        title,
        description,
        completedAt = null,
        createdAt = new Date(),
        updatedAt = new Date(),
      } = req.body;

      if (!!title && !!description) {
        const task = {
          id: randomUUID(),
          title,
          description,
          updatedAt,
          createdAt,
          completedAt,
        };

        database.insert("users", task);

        return res.writeHead(201).end();
      }

      res.writeHead(422, { "Content-Type": "application/json" });
      const errorResponse = {
        error: "Unprocessable Entity",
        message:
          'Fields "title" and "description" are mandatory and cannot be empty.',
      };
      return res.end(JSON.stringify(errorResponse));
    },
  },

  {
    method: "POST",
    path: buildRoutePath("/tasks/import"),
    handler: async (req, res) => {
      try {
        const csvData = await processFile();

        console.log(csvData);

        for (let i = 1; i < csvData.length; i++) {
          const [title, description] = csvData[i];

          const task = {
            id: randomUUID(),
            title,
            description,
            updatedAt: new Date(),
            createdAt: new Date(),
            completedAt: null,
          };

          database.insert("users", task);
        }

        res.writeHead(201).end();
      } catch (error) {
        console.error("Error processing CSV data:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        const errorResponse = {
          error: "Internal Server Error",
          message: "An error occurred during CSV processing.",
        };
        res.end(JSON.stringify(errorResponse));
      }
    },
  },

  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description, updatedAt = new Date() } = req.body;

      const existingTask = database
        .select("users")
        .find((task) => task.id === id);

      if (existingTask) {
        if (!!title && !!description) {
          const taskUpdated = {
            title,
            description,
            updatedAt,
          };

          database.update("users", id, taskUpdated);

          return res.writeHead(204).end();
        }

        res.writeHead(422, { "Content-Type": "application/json" });
        const errorResponse = {
          error: "Unprocessable Entity",
          message:
            'Fields "title" and "description" are mandatory and cannot be empty.',
        };
        return res.end(JSON.stringify(errorResponse));
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        const errorResponse = {
          error: "Not found",
          message: "There's no task with the informed ID",
        };
        return res.end(JSON.stringify(errorResponse));
      }
    },
  },

  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      const existingTask = database
        .select("users")
        .find((task) => task.id === id);

      if (existingTask) {
        database.delete("users", id);
        return res.writeHead(204).end();
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        const errorResponse = {
          error: "Not found",
          message: "There's no task with the informed ID",
        };
        return res.end(JSON.stringify(errorResponse));
      }
    },
  },

  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;

      database.markAsComplete("users", id);
      return res.writeHead(204).end();
    },
  },
];
