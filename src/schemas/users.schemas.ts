import { hashSync } from "bcryptjs";
import { z } from "zod";
import { AppError } from "../errors";

export const createUserSchema = z.object({
    name: z.string().max(20),
    password: z.string().max(120).transform((password) => {
        return hashSync(password, 10)
    }),
    email: z.string().email(),
    admin: z.boolean()
})

export const queryResultUser = createUserSchema.extend({
    id: z.number(),
    active: z.boolean()
})

export const userOmitPassword = queryResultUser.omit({ password: true })

export const allUsers = z.array(userOmitPassword)

export const userOmitAdmin = createUserSchema.omit({ admin: true })

export const updateUserSchema = userOmitAdmin
    .partial()
    .refine((data) => {
        const keys = Object.keys(data);
        if (keys.length === 0) {
            const fields = Object.keys(userOmitAdmin.shape).join(', ');
            throw new AppError(`At least one of the following fields is required: ${fields}`);
        }
        return true;
    });

