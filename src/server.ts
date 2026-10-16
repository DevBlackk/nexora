import Fastify, { fastify } from "fastify";

const app = Fastify({
  logger: true,
});

app.get("/health", async () => {
  return {
    status: "ok",
    service: "nexora-api",
  };
});

const start = async (): Promise<void> => {
  try {
    const port = Number(process.env.PORT ?? 3000);

    await app.listen({
      port,
      host: "127.0.0.1",
    });

  } catch (error) {
    app.log.error(error);
    process.exitCode = 1;
  }
};

void start();