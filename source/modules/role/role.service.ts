import * as _ from "underscore";
import { Queries } from "../../constants";
import { entityWithId, systemError, role } from "../../entities";
import { Role, Status, TableNames } from "../../enums";
import { DateHelper } from "../../helpers/date.helper";
import { SqlHelper } from "../../core/sql.helper";
import DbService from "../../core/db.service";

interface IroleSrevice {

    addNewRole(role : role, userId: number): Promise<role>
    getRoleBystatus(status_id: number): Promise<role[]>
    updateRole(role: role, userId: number): Promise<role>
    getRoleById(id: number): Promise<role>
    updateById(role: role, userId: number): Promise <role>
    pushRoleById(id: number, userId: number): Promise<void>
}

interface localRole {
    id: number,
    role_name: string,
    create_date: Date,
    update_date: Date,
    create_user_id: number,
    update_user_id: number,
    status_id: number
}

 class RoleService implements IroleSrevice {
    private _serviceTable: TableNames = TableNames.Role

    constructor(){}

    public async getRoleBystatus(status_id: number): Promise<role[]> {
        return new Promise<role[]>((resolve, reject) => {
            const result: role[] = []

            SqlHelper.executeQueryArrayResult<localRole>(Queries.getRoleByStatusId, status_id)
                .then((queryResult: localRole[]) => {
                    queryResult.forEach((role: localRole) => {
                        result.push(role)
                    })
                    resolve(result)
                })
                .catch((error: systemError) => {
                    reject(error)
                })
        })
    }

    public async getRoleById(id: number): Promise<role> {
        return await DbService.getFromTableById(TableNames.Role, id)
    }

    public async addNewRole(role : role, userId: number): Promise<role> {
        return new Promise<role>((resolve, reject) => {
            const createDate: string = DateHelper.dateToString(new Date())
            SqlHelper.createNew(Queries.addNewRole, role, role.role_name, createDate, createDate, userId, userId, Status.NotActive)
                .then((result : entityWithId) => {
                    resolve(result as role)
                })
                .catch((error: systemError) => {
                    reject(error)
                })
        })
    }

    public async updateRole(role: role, userId: number): Promise<role> {
        return new Promise<role>((resolve, reject) => {
            const updateDate: Date = new Date()
            SqlHelper.executeQueryNoResult(Queries.updateRoleById, false, role.role_name, DateHelper.dateToString(updateDate), userId, role.id)
                .then(() => {
                    resolve(role)
                })
                .catch((error: systemError) => {
                    reject(error)
                })
        })
    }

    public async updateById(role: role, userId: number): Promise <role> {

        try {
            await DbService.updateTableById(this._serviceTable, role.id, role, userId)
            return role
        }
        catch (error: any) {
            throw (error as systemError)
        }
    }

    public async deleteRoleById(id: number, userId: number): Promise<void> {
        try {
            const updateDate: Date = new Date()
            await SqlHelper.executeQueryNoResult(Queries.DeleteRoleById, true, DateHelper.dateToString(updateDate), userId, Status.NotActive, id, Status.Active)
        }
        catch (error: any)
        {
            throw (error as systemError)
        }
    }

    public async pushRoleById(id: number, userId: number): Promise<void> {
        try {
            const updateDate: Date = new Date()
            await SqlHelper.executeQueryNoResult(Queries.DeleteRoleById, true, DateHelper.dateToString(updateDate), userId, Status.Active, id, Status.NotActive)
        }
        catch (error: any)
        {
            throw (error as systemError)
        }
    }
}

export default new RoleService()