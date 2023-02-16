import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";
import { AppError } from "../../errors";
import { iUser, iUserQueryResult, returnUserOmitPassword } from "../../interfaces/users.interfaces";
import { userOmitPassword } from "../../schemas/users.schemas";

export const createUsersService = async (userData: iUser): Promise<returnUserOmitPassword> => {
    console.log(userData)
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

    const queryTemplate: string = format(`
        INSERT INTO
            users (%I)
        VALUES (%L)
        RETURNING *;
    `,
        Object.keys(userData),
        Object.values(userData)
    )

    const queryResult: iUserQueryResult = await client.query(queryTemplate)
    const newUser = userOmitPassword.parse(queryResult.rows[0])
    console.log(queryResult.rows[0])
    console.log(newUser)
    
    return newUser
}