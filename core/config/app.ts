import { setupErrorHandlers } from "@/core/http/middlewares/error-handlers";
import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { ENV } from "./env";
import setupMiddlewares from "./middlewares";
import { resolveRuntimePath } from "./paths";
import setupRoutes from "./routes";

const app = express();

if (ENV.SWAGGER_ENABLED) {
  const swaggerFile = resolveRuntimePath("docs/swagger/swagger.yaml");
  const swaggerDocument = YAML.load(swaggerFile);
  app.get("/", (_req, res) => res.redirect("/api-docs"));
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} else {
  app.get("/", (_req, res) => res.status(204).end());
}

setupMiddlewares(app);
setupRoutes(app);
setupErrorHandlers(app);

export default app;
