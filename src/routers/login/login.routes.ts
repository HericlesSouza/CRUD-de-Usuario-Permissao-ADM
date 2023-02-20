import { Router } from "express";
import { loginSchema } from "../../schemas/login.schemas";
import { ensureDataIsValidMiddleware } from "../../middlewares/ensureValidData.middlewares"
import { loginController } from "../../controllers/login.controllers";

const loginRoutes: Router = Router()

loginRoutes.post('', ensureDataIsValidMiddleware(loginSchema), loginController)

export default loginRoutes