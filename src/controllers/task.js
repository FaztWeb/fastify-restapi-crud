let { tasks } = require("../data");
const { v4: uuid } = require("uuid");

const getTask = (req, reply) => {
  const { id } = req.params;

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    reply.code(404);
    return "Task Not found";
  }

  reply.code(200);
  return task;
};

const getTasks = (req, reply) => {
  reply.code(200);
  reply.send(tasks);
};

const saveTask = (req, reply) => {
  const { title } = req.body;
  const newTask = {
    id: uuid(),
    title,
    done: false,
  };

  tasks.push(newTask);

  reply.code(201).send(newTask);
};

const deleteTask = (req, reply) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id !== id);
  return `The task with id: ${id} was removed`;
};

const updateTask = (req, reply) => {
  const { id } = req.params;
  const { title, done } = req.body;

  console.log(req.body);

  tasks = tasks.map((task) =>
    task.id === id
      ? {
          id,
          title: title ? title : task.title,
          done: typeof done != "undefined" ? done : task.done,
        }
      : task
  );

  const taskUpdated = tasks.find((task) => task.id === id);

  return taskUpdated;
};

module.exports = { getTask, getTasks, saveTask, deleteTask, updateTask };
