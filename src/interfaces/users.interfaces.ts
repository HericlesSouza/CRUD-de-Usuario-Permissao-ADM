import { QueryResult } from "pg"
import { z } from "zod/lib"
import {createUserSchema, queryResultUser, userOmitPassword} from "../schemas/users.schemas"

export type iUser = z.infer<typeof createUserSchema>
export type resultUser = z.infer<typeof queryResultUser>
export type returnUserOmitPassword = z.infer<typeof userOmitPassword>

export type iUserQueryResult = QueryResult<resultUser>

