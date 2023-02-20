import format from "pg-format"
import { returnUserUpdate } from "../../interfaces/users.interfaces"
import client from "../../database/config"
import { userOmitPassword } from "../../schemas/users.schemas"
import { AppError } from "../../errors"
import { QueryConfig } from "pg"

export const updateUser = async (id: Number, idParam: Number, userData: returnUserUpdate) => {
    const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            id = $1
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [idParam]
    }

    const queryResultUser = await client.query(queryConfig)

    if (id !== idParam && !queryResultUser.rows[0].admin) {
        throw new AppError("Insufficient Permission", 403)
    }

    const queryTemplate = format(`
        UPDATE users
        SET (%I) = ROW (%L)
        WHERE
            id = %s
        RETURNING *;
    `,
        Object.keys(userData),
        Object.values(userData),
        id
    )

    const queryResult = await client.query(queryTemplate)

    const formattedUser = userOmitPassword.parse(queryResult.rows[0])

    return formattedUser
}