import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";
import { AppError } from "../errors";
import { iUserQueryResult } from "../interfaces/users.interfaces"


export const ensurePermissionAdmin = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const email = req.user.email

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
        values: [email]
    }

    const queryResultUserExists: iUserQueryResult = await client.query(queryConfig)

    if (!queryResultUserExists.rows[0].admin) {
        throw new AppError("Insufficient Permission", 403)
    }

    next()
}