import { QueryResult } from "pg"
import { z } from "zod/lib"
import { allUsers, createUserSchema, queryResultUser, updateUserSchema, userOmitPassword } from "../schemas/users.schemas"

export type iUser = z.infer<typeof createUserSchema>
export type resultUser = z.infer<typeof queryResultUser>
export type returnUserOmitPassword = z.infer<typeof userOmitPassword>
export type returnAllUsers = z.infer<typeof allUsers>
export type returnUserUpdate = z.infer<typeof updateUserSchema>

export type iUserQueryResult = QueryResult<resultUser>
export type allUsersQueryResult = QueryResult<returnAllUsers>
