import express from "express";
import swaggerUi from "swagger-ui-express";
import { ENV } from "./env";
import { loadSwaggerDocument } from "./swagger";
import setupMiddlewares from "./middlewares";
import setupRoutes from "./routes";
import { setupErrorHandlers } from "@/core/http/middlewares/error-handlers";

const app = express();

if (ENV.SWAGGER_ENABLED) {
  const swaggerDocument = loadSwaggerDocument();

  app.get("/", (_req, res) => res.redirect("/api-docs"));
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} else {
  app.get("/", (_req, res) => res.status(204).end());
}

setupMiddlewares(app);
setupRoutes(app);
setupErrorHandlers(app);

export default app;
