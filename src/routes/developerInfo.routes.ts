import { Router } from "express"
import { developersInfoControllers } from "../controllers"

const developersInfoRouter: Router = Router()

developersInfoRouter.post("/", developersInfoControllers.create)

export { developersInfoRouter }