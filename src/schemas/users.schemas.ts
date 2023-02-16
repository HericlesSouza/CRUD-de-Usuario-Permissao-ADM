import { z } from "zod";

export const createUserSchema  = z.object ({
    name: z.string().max(20),
    password: z.string().max(120),
    email: z.string().email(),
})

export const queryResultUser = createUserSchema.extend({
    id: z.number(),
    admin: z.boolean(),
    active: z.boolean()
})

export const userOmitPassword = queryResultUser.omit({password: true})
