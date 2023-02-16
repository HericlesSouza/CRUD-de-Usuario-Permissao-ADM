import { Router } from "express";
import { createUsersController } from "../../controllers/users.controllers";
import { createUserSchema } from "../../schemas/users.schemas";
import { ensureDataIsValidMiddleware } from "../../middlewares/checkValidData.middlewares"

const userRoutes: Router = Router()

userRoutes.post('', ensureDataIsValidMiddleware(createUserSchema), createUsersController)

export default userRoutes