import * as _ from "underscore";
import { Queries } from "../constants";
import { systemError, entityWithId, employee, employeeid, employeeToStoreWithReationId } from "../entities";
import { SqlHelper } from "../helpers/sql.helper";
import { ErrorService } from "./error.service";

interface localEmployeeid {
    id: number;
}

interface localEmployee {
    id: number;
    first_name: string;
    last_name: string;
    position: string;
}

interface IemployeeService {

    getEmployeeByStoreId(id:number): Promise<employeeid[]>,
    updateEmployeeInfoById(employee: employee): Promise<employee>,
    createEmployee(employee: employee): Promise<employee>,
    deleteEmployeeById(id:number) : Promise<void>

}

export class EmployeeService implements IemployeeService {

    constructor(
        private errorService: ErrorService
    ) {}

    public getEmployeeByStoreId(id:number): Promise<employeeid[]> {
        return new Promise<employeeid[]> ((resolve, reject) => {
            const result: employeeid[] = []

            SqlHelper.executeQueryArrayResult<localEmployeeid>(this.errorService, Queries.employeesByStoreId, id)
                .then((queryResult: localEmployeeid[]) => {
                    queryResult.forEach((employeeid: localEmployeeid) => {
                    result.push(employeeid)    
                    })
                    resolve(result)
                })
                .catch((error: systemError) => {
                    reject(error)
                })
        })
    }

    public updateEmployeeInfoById(employee: employee): Promise<employee> {
        return new Promise<employee>((resolve, reject) => {
            SqlHelper.executeQueryNoResult(this.errorService, Queries.updateEmployeeById, false, employee.first_name, employee.last_name, employee.position, employee.id)
                .then(() => {
                    resolve(employee)
                })
                .catch((error: systemError) => {
                    reject(error)
                })
        })
    }

    public createEmployee(employee: employee): Promise<employee> {
        return new Promise<employee> ((resolve, reject) => {
            SqlHelper.createNew(this.errorService, Queries.createNewEmployee, employee, employee.first_name, employee.last_name, employee.position)
                .then((result: entityWithId) => {
                    resolve(result as employee)
                })
                .catch((error: systemError) => {
                    reject(error)
                })
        })
    }

    public createEmpLocStore(empstorerelat: employeeToStoreWithReationId) : Promise <employeeToStoreWithReationId> {
        return new Promise<employeeToStoreWithReationId> ((resolve, reject) => {
            SqlHelper.createNew(this.errorService, Queries.employeeToStorePosition, empstorerelat, empstorerelat.employee_id, empstorerelat.store_id, empstorerelat.employee_relat_id)
            .then((result: entityWithId) => {
                resolve(result as employeeToStoreWithReationId)
            })
            .catch((error: systemError) => {
                reject(error)
            })
        })
    }

    public deleteEmployeeById(id:number) : Promise<void> {
        return new Promise<void> ((resolve, reject) => {
            SqlHelper.executeQueryNoResult(this.errorService, Queries.deleteEmployeeById, true, id)
            .then(() => {
                resolve()
            })
            .catch((error: systemError) =>{
                reject(error)
            })
        })
    }

    private parseLocalEmployees(local: localEmployee): employee {
        return {
            id: local.id,
            first_name: local.first_name,
            last_name: local.last_name,
            position: local.position
        };
    }
}    
