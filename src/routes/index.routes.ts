import { Router } from "express"
import { developersRouter } from "./developer.routes"
import { developersInfoRouter } from "./developerInfo.routes"

export { developersInfoRouter, developersRouter}

export const routes:Router = Router()
routes.use('/developers', developersRouter)