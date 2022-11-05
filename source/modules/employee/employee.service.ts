import * as _ from "underscore";
import { Queries } from "../../constants";
import { systemError, entityWithId, employee, employeeid, employeeToStoreWithReationId } from "../../entities";
import { SqlHelper } from "../../core/sql.helper";
import DbService from "../../core/db.service";
import { TableNames } from "../../enums"


interface localEmployeeid {
    id: number;
}

interface IemployeeService {

    getEmployeeByStoreId(id:number): Promise<employeeid[]>,
    updateEmployeeInfoById(employee: employee): Promise<employee>,
    createEmployee(employee: employee): Promise<employee>,
    deleteEmployeeById(id:number) : Promise<void>,
    createEmpLocStore(empstorerelat: employeeToStoreWithReationId) : Promise <employeeToStoreWithReationId>
    getById(id: number): Promise<employee>

}

export class EmployeeService implements IemployeeService {

    constructor() {}

    public async getEmployeeByStoreId(id:number): Promise<employeeid[]> {
        return new Promise<employeeid[]> ((resolve, reject) => {
            const result: employeeid[] = []

            SqlHelper.executeQueryArrayResult<localEmployeeid>(Queries.employeesByStoreId, id)
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

    public async getById(id: number): Promise<employee> {
        return await DbService.getFromTableById(TableNames.Employee, id)
    }

    public async updateEmployeeInfoById(employee: employee): Promise<employee> {
        return new Promise<employee>((resolve, reject) => {
            SqlHelper.executeQueryNoResult(Queries.updateEmployeeById, false, employee.first_name, employee.last_name, employee.position, employee.id)
                .then(() => {
                    resolve(employee)
                })
                .catch((error: systemError) => {
                    reject(error)
                })
        })
    }

    public async createEmployee(employee: employee): Promise<employee> {
        return new Promise<employee> ((resolve, reject) => {
            SqlHelper.createNew(Queries.createNewEmployee, employee, employee.first_name, employee.last_name, employee.position)
                .then((result: entityWithId) => {
                    resolve(result as employee)
                })
                .catch((error: systemError) => {
                    reject(error)
                })
        })
    }

    public async createEmpLocStore(empstorerelat: employeeToStoreWithReationId) : Promise <employeeToStoreWithReationId> {
        return new Promise<employeeToStoreWithReationId> ((resolve, reject) => {
            SqlHelper.createNew(Queries.employeeToStorePosition, empstorerelat, empstorerelat.employee_id, empstorerelat.store_id, empstorerelat.employee_relat_id)
            .then((result: entityWithId) => {
                resolve(result as employeeToStoreWithReationId)
            })
            .catch((error: systemError) => {
                reject(error)
            })
        })
    }

    public async deleteEmployeeById(id:number) : Promise<void> {
        return new Promise<void> ((resolve, reject) => {
            SqlHelper.executeQueryNoResult(Queries.deleteEmployeeById, true, id)
            .then(() => {
                resolve()
            })
            .catch((error: systemError) =>{
                reject(error)
            })
        })
    }

}    
export default new EmployeeService()
