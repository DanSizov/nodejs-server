import { Request, Response, NextFunction, response } from 'express';
import { NON_EXISTENT_ID } from '../../constants';
import { systemError, employee, employeeid, employeeToStoreWithReationId } from '../../entities';
import { RequestHelper } from '../../core/request.helper';
import { ResponseHelper } from '../../framework/response.helper';
import  EmployeeService  from './employee.service';
import LoggerService from '../../core/logger.srevice'

class EmployeeController {

    constructor() {}

    async getEmployeeByStoreId (req: Request, res: Response, next: NextFunction) {
        LoggerService.debug("getEmployeeByStoreId method start")
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)

        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                LoggerService.debug("getEmployeeByStoreId successful return")   
                EmployeeService.getEmployeeByStoreId(numericParamOrError)
                .then((result: employeeid[]) => {
                    return res.status(200).json({
                        employeesId: result
                    })
                })
                .catch((error: systemError) => {
                    return ResponseHelper.handleError(res, error)
                })
            }        else {
            LoggerService.debug("getEmployeeByStoreId unhandled error")
        }
        }
        else {
            LoggerService.debug("getEmployeeByStoreId failure response") 
        }
    }

    async getEmployeeById(req: Request, res: Response, next: NextFunction) {
        LoggerService.debug("getEmployeeById method start")
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)

        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                LoggerService.debug("getEmployeeById successful return")
                const result: employee = await EmployeeService.getById(numericParamOrError)
                return res.status(200).json(result)
            }
            else {
                LoggerService.debug("getEmployeeById unhandled error")
            }
        }        
        else {
            LoggerService.debug("getEmployeeById failure response")
            return ResponseHelper.handleError(res, numericParamOrError)
        }
        LoggerService.debug("getEmployeeById method end")
    }

    async updateEmployeeById (req: Request, res: Response, next: NextFunction) {
        LoggerService.debug("updateEmployeeById method start")
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)
        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                const body: employee = req.body;
    
                EmployeeService.updateEmployeeInfoById({
                    id: numericParamOrError,
                    first_name: body.first_name,
                    last_name: body.last_name,
                    position: body.position
                })
                    .then((result: employee) => {
                        LoggerService.debug("updateEmployeeById successful return")
                        return res.status(200).json(result)
                    })
                    .catch((error: systemError) => {
                        return ResponseHelper.handleError(res, error)
                    })
            }            
            else {
                LoggerService.debug("updateEmployeeById unhandled error")
            }
        }
        else {
            LoggerService.debug("updateEmployeeById failure response")
            return ResponseHelper.handleError(res, numericParamOrError)
        }
        LoggerService.debug("updateEmployeeById method end")
    }

    async createNewEmp (req: Request, res: Response, next: NextFunction) {
        LoggerService.debug("createNewEmp method start")
        const body: employee = req.body;
    
        EmployeeService.createEmployee({
            id: NON_EXISTENT_ID,
            first_name: body.first_name,
            last_name: body.last_name,
            position: body.position
        })
        .then((result: employee) => {
            LoggerService.debug("createNewEmp successful return")
            return res.status(200).json(result)
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error)
        })
        LoggerService.debug("createNewEmp method end")
    }

    async referenceEmployeeToStore (req: Request, res:Response, next: NextFunction) {
        LoggerService.debug("referenceEmployeeToStore method start")
        const body: employeeToStoreWithReationId = req.body
    
        EmployeeService.createEmpLocStore({
            id: NON_EXISTENT_ID,
            employee_id: body.employee_id,
            store_id: body.store_id,
            employee_relat_id: body.employee_relat_id
        })
        .then((result: employeeToStoreWithReationId) => {
            LoggerService.debug("referenceEmployeeToStore successful return")
            return res.status(200).json(result)
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error)
        })
        LoggerService.debug("referenceEmployeeToStore method end")
    }

    async deleteEmployeeById (req:Request, res: Response, next: NextFunction) {
        LoggerService.debug("deleteEmployeeById method start")
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)
        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                EmployeeService.deleteEmployeeById(numericParamOrError)
                    .then(() => {
                        LoggerService.debug("deleteEmployeeById successful return")
                        return res.sendStatus(200)
                    })
                    .catch((error: systemError) => {
                        return ResponseHelper.handleError(res, error)
                    })
            }           
            else {
                LoggerService.debug("deleteEmployeeById unhandled error")
            }
        }
        else {
            LoggerService.debug("deleteEmployeeById failure response")
            return ResponseHelper.handleError(res, numericParamOrError)
        }
        LoggerService.debug("deleteEmployeeById method end")
    }
}

export default new EmployeeController()