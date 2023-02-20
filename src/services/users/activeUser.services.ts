import { QueryConfig } from "pg";
import { client } from "../../database";
import { AppError } from "../../errors";
import { iUserQueryResult, returnUserOmitPassword } from "../../interfaces/users.interfaces";
import { userOmitPassword } from "../../schemas/users.schemas";

export const activeUserService = async (id: Number, idParam: Number): Promise<returnUserOmitPassword> => {
    let queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            id = $1
    `

    let queryConfig: QueryConfig = {
        text: queryString,
        values: [idParam]
    }

    const queryResultUser = await client.query(queryConfig)

    if (id !== idParam && !queryResultUser.rows[0].admin) {
        throw new AppError("Insufficient Permission", 403)
    }

    queryString = `
        UPDATE users
        SET ("active") = ROW ('true')
        WHERE
            id = $1
        RETURNING *;
    `

    queryConfig = {
        text: queryString,
        values: [id]
    }

    const queryResult: iUserQueryResult = await client.query(queryConfig)

    const formattedUser = userOmitPassword.parse(queryResult.rows[0])

    return formattedUser
}