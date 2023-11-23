import express from "express"
import { userCollection } from "./user.collection"
const router = express.Router()


router.post("/", userCollection.createUser)
router.get("/", userCollection.getALlUser)
router.get("/:userId", userCollection.getALlUser)



export const userRouter = router