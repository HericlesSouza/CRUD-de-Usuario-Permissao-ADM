import { z } from "zod/lib"
import { loginSchema } from "../schemas/login.schemas"

export type iLoginData = z.infer<typeof loginSchema>
