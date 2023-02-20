import { NextFunction, Request, Response } from 'express'
import 'dotenv/config'
import { QueryConfig } from 'pg'
import client from '../database/config'
import { iUser, iUserQueryResult } from '../interfaces/users.interfaces'
import { AppError } from '../errors'

export const ensureEmailExists = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const userData: iUser = req.body

    const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            email = $1
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userData.email]
    }

    const queryResultUsersExists: iUserQueryResult = await client.query(queryConfig)

    if (queryResultUsersExists.rowCount) {
        throw new AppError("E-mail already registered", 409)
    }

    return next()
}

export default ensureEmailExists