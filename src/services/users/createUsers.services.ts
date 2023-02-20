import { QueryConfig } from "pg";
import format from "pg-format";
import { client } from "../../database";
import { AppError } from "../../errors";
import { iUser, iUserQueryResult, returnUserOmitPassword } from "../../interfaces/users.interfaces";
import { userOmitPassword } from "../../schemas/users.schemas";

export const createUsersService = async (userData: iUser): Promise<returnUserOmitPassword> => {
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

    return newUser
}