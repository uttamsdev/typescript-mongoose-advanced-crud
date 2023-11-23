import express from 'express'
import { UserControllers } from './user.controller';
const router = express.Router();

router.post("/", UserControllers.createUser);
router.get("/", UserControllers.getAllUsers)

export const UserRoutes = router;