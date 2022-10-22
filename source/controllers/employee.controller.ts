import { Request, Response, NextFunction, response } from 'express';
import { NON_EXISTENT_ID } from '../constants';
import { systemError, employee, employeeid, employeeToStoreWithReationId } from '../entities';
import { RequestHelper } from '../helpers/request.helper';
import { ResponseHelper } from '../helpers/response.helper';
import { ErrorService } from '../services/error.service';
import { EmployeeService } from '../services/employee.service';


export const errorService: ErrorService = new ErrorService();
export const employeeService: EmployeeService = new EmployeeService(errorService);

const getEmployeeByStoreId = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id)
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            employeeService.getEmployeeByStoreId(numericParamOrError)
            .then((result: employeeid[]) => {
                return res.status(200).json({
                    employeesId: result
                })
            })
            .catch((error: systemError) => {
                return ResponseHelper.handleError(res, error)
            })
        }
    }
    else {
        return ResponseHelper.handleError(res, numericParamOrError)
    }
}

const updateEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id)
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            const body: employee = req.body;

            employeeService.updateEmployeeInfoById({
                id: numericParamOrError,
                first_name: body.first_name,
                last_name: body.last_name,
                position: body.position
            })
                .then((result: employee) => {
                    return res.status(200).json(result)
                })
                .catch((error: systemError) => {
                    return ResponseHelper.handleError(res, error)
                })
        }
    }
    else {
        return ResponseHelper.handleError(res, numericParamOrError)
    }
}

const createNewEmp = async (req: Request, res: Response, next: NextFunction) => {
    const body: employee = req.body;

    employeeService.createEmployee({
        id: NON_EXISTENT_ID,
        first_name: body.first_name,
        last_name: body.last_name,
        position: body.position
    })
    .then((result: employee) => {
        return res.status(200).json(result)
    })
    .catch((error: systemError) => {
        return ResponseHelper.handleError(res, error)
    })
}

const referenceEmployeeToStore = async (req: Request, res:Response, next: NextFunction) => {
    const body: employeeToStoreWithReationId = req.body

    employeeService.createEmpLocStore({
        id: NON_EXISTENT_ID,
        employee_id: body.employee_id,
        store_id: body.store_id,
        employee_relat_id: body.employee_relat_id
    })
    .then((result: employeeToStoreWithReationId) => {
        return res.status(200).json(result)
    })
    .catch((error: systemError) => {
        return ResponseHelper.handleError(res, error)
    })
}

const deleteEmployeeById = async (req:Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id)
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            employeeService.deleteEmployeeById(numericParamOrError)
                .then(() => {
                    return res.sendStatus(200)
                })
                .catch((error: systemError) => {
                    return ResponseHelper.handleError(res, error)
                })
        }
    }
    else {
        return ResponseHelper.handleError(res, numericParamOrError)
    }
}

export default { getEmployeeByStoreId , updateEmployeeById, createNewEmp, referenceEmployeeToStore, deleteEmployeeById }