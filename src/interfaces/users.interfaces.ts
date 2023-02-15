import { QueryResult } from "pg"

export interface iUserData {
    id?: number,
    name: string,
    email: string,
    password: string,
    admin: boolean,
    active: boolean
}

export type iUserResponseData = Omit<iUserData, 'password'>
export type iUserResult = QueryResult<iUserResponseData>