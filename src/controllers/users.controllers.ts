import { Request, Response } from "express";
import { iUser} from "../interfaces/users.interfaces";
import { createUsersService } from "../services/users/createUsers.services";

export const createUsersController = async (req: Request, res: Response): Promise <Response> => {
    const userData: iUser = req.body
    console.log(userData)
    const newUser = await createUsersService(userData)

    return res.status(201).json(newUser)
}