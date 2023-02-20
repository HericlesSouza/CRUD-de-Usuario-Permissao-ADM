import { Request, Response } from "express";
import { iUser } from "../interfaces/users.interfaces";
import { createUsersService } from "../services/users/createUsers.services";
import { listUsersService } from "../services/users/listUsers.services"
import { listUserProfile } from "../services/users/listUserProfile.services"
import { updateUser } from "../services/users/updateUser.service"
import { deleteUserService } from "../services/users/deleteUser.services"
import { activeUserService } from "../services/users/activeUser.services"

export const createUsersController = async (req: Request, res: Response): Promise<Response> => {
    const userData: iUser = req.body

    const newUser = await createUsersService(userData)

    return res.status(201).json(newUser)
}

export const listUsersController = async (req: Request, res: Response): Promise<Response> => {

    const allUsers = await listUsersService()

    return res.status(200).json(allUsers)
}

export const listUserController = async (req: Request, res: Response): Promise<Response> => {
    const idUser = req.user.id

    const userProfile = await listUserProfile(idUser)

    return res.status(200).json(userProfile)
}

export const updateUserController = async (req: Request, res: Response): Promise<Response> => {
    const idUser = parseInt(req.params.id)
    const idParam = req.user.id
    const dataUser = req.body

    const newUser = await updateUser(idUser, idParam, dataUser)

    return res.status(200).json(newUser)
}

export const deleteUserController = async (req: Request, res: Response): Promise<Response> => {
    const idUser = parseInt(req.params.id)

    await deleteUserService(idUser)

    return res.status(204).send()
}

export const activeUserController = async (req: Request, res: Response): Promise<Response> => {
    const idUser = parseInt(req.params.id)
    const idParam = req.user.id

    const userActive = await activeUserService(idUser, idParam)

    return res.status(200).json(userActive)
}