import express from 'express';
import controller from '../controllers/role.controller';
import { Role } from '../enums';
import middleware from '../middleware/auth.middleware';
const router = express.Router();

router.post('/role', middleware.verifyToken([Role.Administrator]), controller.addNewRole);


export default { router };