import { Router } from "express";
import { activeUserController, createUsersController, deleteUserController, listUserController, listUsersController, updateUserController } from "../../controllers/users.controllers";
import { createUserSchema, updateUserSchema } from "../../schemas/users.schemas";
import { ensureDataIsValidMiddleware } from "../../middlewares/ensureValidData.middlewares"
import ensureTokenIsValidMiddleware from "../../middlewares/ensureTokenExists.middlewares";
import { ensureUserExists } from "../../middlewares/ensureUserExists.middlewares"
import { ensureEmailExists } from "../../middlewares/ensureEmailExists.middlewares"
import { ensurePermissionAdmin } from "../../middlewares/ensurePermissionAdmin.middlewares"

const userRoutes: Router = Router()

userRoutes.post('', ensureDataIsValidMiddleware(createUserSchema), ensureEmailExists, createUsersController)
userRoutes.get('', ensureTokenIsValidMiddleware, ensurePermissionAdmin, listUsersController)
userRoutes.get('/profile', ensureTokenIsValidMiddleware, listUserController)
userRoutes.patch('/:id', ensureTokenIsValidMiddleware, ensureUserExists, ensureDataIsValidMiddleware(updateUserSchema), ensureEmailExists, updateUserController)
userRoutes.put('/:id/recover', ensureTokenIsValidMiddleware, ensureUserExists, ensurePermissionAdmin, activeUserController)
userRoutes.delete('/:id', ensureTokenIsValidMiddleware, ensureUserExists, deleteUserController)

export default userRoutes