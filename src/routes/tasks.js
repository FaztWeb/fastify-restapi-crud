const {
  getTask,
  getTasks,
  saveTask,
  deleteTask,
  updateTask,
} = require("../controllers/task");

const Task = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    done: { type: "boolean" },
  },
};

const getTasksOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: Task,
      },
    },
  },
  handler: getTasks,
};

const getTaskOpts = {
  schema: {
    response: {
      200: Task,
    },
  },
  handler: getTask,
};

const deleteTaskOpts = {
  schema: {
    response: {
      200: Task,
    },
  },
  handler: deleteTask,
};

const postTasksOpts = {
  schema: {
    body: {
      type: "object",
      required: ["title"],
      properties: {
        title: { type: "string" },
      },
    },
    response: {
      201: Task,
    },
  },
  handler: saveTask,
};

const updateTaskOpts = {
  schema: {
    response: {
      200: Task,
    },
  },
  handler: updateTask,
};

function tasksRoutes(fastify, options, done) {
  fastify.get("/tasks", getTasksOpts);

  fastify.get("/tasks/:id", getTaskOpts);

  fastify.post("/tasks", postTasksOpts);

  fastify.delete("/tasks/:id", deleteTaskOpts);

  fastify.put("/tasks/:id", updateTaskOpts);

  done();
}

module.exports = tasksRoutes;
