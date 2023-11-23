import express from "express"
import { userCollection } from "./user.collection"
const router = express.Router()


router.post("/", userCollection.createUser)
router.get("/", userCollection.getALlUser)
router.get("/:userId", userCollection.getSingleUser)
router.put("/:userId", userCollection.updateUser)
router.delete("/:userId", userCollection.deleteUser)
router.put("/:userId/orders", userCollection.createOrder)
router.get("/:userId/orders", userCollection.getOrderForSpecificUser)



export const userRouter = router