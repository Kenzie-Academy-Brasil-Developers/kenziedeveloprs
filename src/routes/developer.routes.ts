import { Router } from "express"
import { developersControllers } from "../controllers"
import { developerIdExists, uniqueEmail } from "../middleware"
import { developersInfoRouter } from "./developerInfo.routes"

const developersRouter: Router = Router()

developersRouter.post("/", uniqueEmail, developersControllers.create)
developersRouter.get("/", developersControllers.retrive)

// // get developer by id

developersRouter.use("/:id", developerIdExists)

developersRouter.get("/:id", developersControllers.retrive)
developersRouter.patch("/:id", developersControllers.partialUpdateId)
developersRouter.delete("/:id", developersControllers.destroy)

developersRouter.use("/:id/infos", developersInfoRouter)
export { developersRouter }