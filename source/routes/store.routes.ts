import express from 'express';
import controller from '../controllers/shop.controller';
import { Role } from '../enums';
import middleware from '../middleware/auth.middleware';
const router = express.Router();


router.get('/stores',middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.getStores)
router.get('/store/:id',middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.getStoresById)
router.put('/store/:id',middleware.verifyToken([Role.Administrator]), controller.updateStoreById);
router.post('/store',middleware.verifyToken([Role.Administrator]), controller.createNewStore);
router.delete('/store/:id',middleware.verifyToken([Role.Administrator]), controller.deleteStoreById);

router.get('/helloworld', controller.getHelloWorld)

export default { router };