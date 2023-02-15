import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";
import { AppError } from "../../errors";
import { iUserData, iUserResponseData, iUserResult } from "../../interfaces/users.interfaces";

export const createUsersService = async (userData: iUserData): Promise<iUserResponseData> => {
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

    const queryResultUsersExists: QueryResult = await client.query(queryConfig)

    if(queryResultUsersExists.rowCount) {
        throw new AppError("E-mail already registered", 409)
    }

    const queryTemplate: string = format(`
        INSERT INTO
            users (%I)
        VALUES (%L)
        RETURNING "id", "name", "email", "admin", "active";
    `,
        Object.keys(userData),
        Object.values(userData)
    )

    const queryResult: iUserResult = await client.query(queryTemplate)

    return queryResult.rows[0]
}