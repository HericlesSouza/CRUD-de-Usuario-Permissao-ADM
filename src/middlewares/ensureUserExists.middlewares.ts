import { NextFunction, Request, Response } from 'express'
import 'dotenv/config'
import { QueryConfig } from 'pg'
import client from '../database/config'

export const ensureUserExists = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const id = req.params.id

    const queryString = `
        SELECT
            *
        FROM
            users
        WHERE
            id = $1
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    const queryResult = await client.query(queryConfig)

    if (!queryResult.rows[0]) {
        return res.status(404).json({
            "message": "Developer not found"
        })
    }

    return next()
}

export default ensureUserExists