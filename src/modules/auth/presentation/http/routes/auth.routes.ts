import { Router } from "express";
import { adaptRoute } from "@/adapters/express-route-adapter";
import { LoginController } from "../controllers/login.controller";
import { RefreshTokenController } from "../controllers/refresh-token.controller";
import { LoginUseCase } from "@/modules/auth/application/use-cases/login.usecase";
import { RefreshTokenUseCase } from "@/modules/auth/application/use-cases/refresh-token.usecase";
import { JwtAuthTokenService } from "@/modules/auth/infra/jwt-auth-token.service";
import { BcryptAdapter } from "@/adapters/bcrypt-adapter";
import { SequelizeUserRepository } from "@/modules/users/infra/sequelize/sequelize-user.repository";
import { logger } from "@/core/logger"; // seu logger central (ajuste o path)

import { validateBody } from "@/core/http/middlewares/validate-body";
import { loginSchema, refreshTokenSchema } from "../validators/auth-schemas";

export function registerAuthRoutes(router: Router): void {
  // factories simples inline (se quiser, depois separa em arquivos de factory)
  const userRepo = new SequelizeUserRepository();
  const encrypter = new BcryptAdapter(12);
  const tokenService = new JwtAuthTokenService();

  const loginUseCase = new LoginUseCase(userRepo, encrypter, tokenService, logger);
  const refreshTokenUseCase = new RefreshTokenUseCase(tokenService, logger);

  const loginController = new LoginController(loginUseCase);
  const refreshTokenController = new RefreshTokenController(refreshTokenUseCase);

  router.post(
    "/login",
    validateBody(loginSchema),
    adaptRoute(loginController)
  );

  router.post(
    "/refresh-token",
    validateBody(refreshTokenSchema),
    adaptRoute(refreshTokenController)
  );
}
