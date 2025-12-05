import { adaptRoute } from "@/adapters/express-route-adapter";
import { Router } from "express";

import {
  CreateUserController,
  DeleteUserController,
  GetUserByIdController,
  ListUsersController,
  UpdateUserController,
} from "../controllers"; // você já tem um index.ts aqui

import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetUserByIdUseCase,
  ListUsersUseCase,
  UpdateUserUseCase,
} from "@/modules/users/application/use-cases";

import { BcryptAdapter } from "@/adapters/bcrypt-adapter";
import { SequelizeProfileCreator } from "@/modules/users/infra/profile/profile-creator.sequelize";
import { SequelizeUserRepository } from "@/modules/users/infra/sequelize/sequelize-user.repository";

import { logger } from "@/core/logger";

import { validateBody } from "@/core/http/middlewares/validate-body";
import { createUserSchema, updateUserSchema } from "../validators/user-schemas";

import { authMiddleware } from "@/core/http/middlewares/auth-middleware";
import { authorizeRoles } from "@/core/http/middlewares/authorize-roles";

export function registerUserRoutes(router: Router): void {
  const userRepo = new SequelizeUserRepository();
  const profileCreator = new SequelizeProfileCreator();
  const encrypter = new BcryptAdapter(12);

  const createUserUseCase = new CreateUserUseCase(
    userRepo,
    userRepo, // findByEmail repo se o próprio userRepo implementa
    encrypter,
    profileCreator,
    logger
  );

  const listUsersUseCase = new ListUsersUseCase(userRepo, logger);
  const getUserByIdUseCase = new GetUserByIdUseCase(userRepo, logger);
  const updateUserUseCase = new UpdateUserUseCase(userRepo, logger);
  const deleteUserUseCase = new DeleteUserUseCase(userRepo, logger);

  const createUserController = new CreateUserController(createUserUseCase);
  const listUsersController = new ListUsersController(listUsersUseCase);
  const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);
  const updateUserController = new UpdateUserController(updateUserUseCase);
  const deleteUserController = new DeleteUserController(deleteUserUseCase);

  // rotas protegidas (exemplo)
  router.post(
    "/usuarios",
    authMiddleware,
    authorizeRoles(["Gerente"]),
    validateBody(createUserSchema),
    adaptRoute(createUserController)
  );

  router.get(
    "/usuarios",
    authMiddleware,
    authorizeRoles(["Gerente"]),
    adaptRoute(listUsersController)
  );

  router.get(
    "/usuarios/:id",
    authMiddleware,
    authorizeRoles(["Gerente"]),
    adaptRoute(getUserByIdController)
  );

  router.put(
    "/usuarios/:id",
    authMiddleware,
    authorizeRoles(["Gerente"]),
    validateBody(updateUserSchema),
    adaptRoute(updateUserController)
  );

  router.delete(
    "/usuarios/:id",
    authMiddleware,
    authorizeRoles(["Gerente"]),
    adaptRoute(deleteUserController)
  );
}
