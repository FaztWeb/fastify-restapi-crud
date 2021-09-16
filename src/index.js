const fastify = require("fastify")({ logger: true });
const PORT = 3000;

// Register Routes
fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: {title: 'fastify api docs'}
  }
})

// Routes
fastify.get("/hello", (req, reply) => {
  reply.send({ message: "Hello World" });
});

fastify.register(require("./routes/tasks"));


const start = async () => {
  try {
    await fastify.listen(PORT);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
