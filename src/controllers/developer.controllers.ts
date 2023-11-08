import { Developers } from "../interfaces"
import { developerServices } from "../services"
import { Request, Response } from "express"

const create = async (req: Request, res: Response): Promise<Response> => {
    const developers: Developers = await developerServices.create(req.body)
    return res.status(201).json(developers)
}

const retrive = async (req: Request, res: Response): Promise<Response> => {
    const developers: Developers = await developerServices.retrive(req.params.id)
    return res.status(200).json(developers)
}

const partialUpdateId = async (req: Request, res: Response): Promise<Response> => {
    const {id} = req.params
    const {email, name} = req.body
    const developers = await developerServices.partialUpdate(Number(id), email, name)
    return res.status(200).json(developers)
}

const destroy = async (req: Request, res: Response): Promise<Response> => {
    await developerServices.destroy(req.params.developerID)
    return res.status(204).json()
}
export default { create, retrive, partialUpdateId , destroy }