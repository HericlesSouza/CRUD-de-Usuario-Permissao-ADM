import { client } from "../../database";
import { allUsersQueryResult, returnAllUsers } from "../../interfaces/users.interfaces"
import { allUsers } from "../../schemas/users.schemas";

export const listUsersService = async (): Promise<returnAllUsers> => {
    const queryString: string = `
        SELECT
            *
        FROM
            users;
    `

    const queryResult: allUsersQueryResult = await client.query(queryString)

    const formatData = allUsers.parse(queryResult.rows)

    return formatData
}