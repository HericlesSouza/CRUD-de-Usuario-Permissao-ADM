import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { QueryConfig } from "pg";
import { client } from "../../database";
import { AppError } from "../../errors";
import { iLoginData } from "../../interfaces/login.interfaces";
import { iUserQueryResult } from "../../interfaces/users.interfaces";

export const login = async (dataUser: iLoginData) => {
    const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            email = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [dataUser.email]
    }

    const queryResult: iUserQueryResult = await client.query(queryConfig)

    if (!queryResult.rowCount || !queryResult.rows[0].active) {
        throw new AppError("Wrong email/password", 401)
    }

    const pwdMatch = await compare(dataUser.password, queryResult.rows[0].password)

    if (!pwdMatch) {
        throw new AppError("Wrong email/password", 401)
    }

    const token = sign(
        { email: dataUser.email },
        String(process.env.SECRET_KEY),
        {
            expiresIn: '24h',
            subject: queryResult.rows[0].id.toString()
        }
    )

    return token
}