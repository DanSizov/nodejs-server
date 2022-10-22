import express from 'express';
import controller from '../controllers/employee.controller';
import { Role } from '../enums';
import middleware from '../middleware/auth.middleware';
const router = express.Router();

router.get('/employeesbystore/:id', controller.getEmployeeByStoreId)
router.put('/employeebyid/:id', controller.updateEmployeeById)
router.post('/employee', controller.createNewEmp)
router.post('/emprelatstore', controller.referenceEmployeeToStore)
router.delete('/employee/:id', controller.deleteEmployeeById)

export default { router };