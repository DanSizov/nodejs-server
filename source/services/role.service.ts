import * as _ from "underscore";
import { Queries } from "../constants";
import { entityWithId, newrole, systemError, user } from "../entities";
import { Role, Status } from "../enums";
import { DateHelper } from "../helpers/date.helper";
import { SqlHelper } from "../helpers/sql.helper";
import { ErrorService } from "./error.service";

interface IroleSrevice {

    addNewRole(role : newrole, userId: number): Promise<newrole>
}

export class RoleService implements IroleSrevice {

    constructor(
        private errorService: ErrorService
    ){}

    public addNewRole(role : newrole, userId: number): Promise<newrole> {
        return new Promise<newrole>((resolve, reject) => {
            const createDate: string = DateHelper.dateToString(new Date())
            SqlHelper.createNew(this.errorService, Queries.addNewRole, role, role.role_name, createDate, createDate, userId, userId, Status.NotActive)
                .then((result : entityWithId) => {
                    resolve(result as newrole)
                })
                .catch((error: systemError) => {
                    reject(error)
                })
        })
    }
}