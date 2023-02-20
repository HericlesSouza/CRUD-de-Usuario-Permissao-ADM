import { QueryConfig } from "pg"
import { client } from "../../database"
import { iUserQueryResult } from "../../interfaces/users.interfaces"
import { userOmitPassword } from "../../schemas/users.schemas"
import { returnUserOmitPassword } from "../../interfaces/users.interfaces"

export const listUserProfile = async (id: number): Promise<returnUserOmitPassword> => {
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
        values: [id]
    }

    const queryResultUser: iUserQueryResult = await client.query(queryConfig)

    const formattedUser = userOmitPassword.parse(queryResultUser.rows[0])

    return formattedUser
}