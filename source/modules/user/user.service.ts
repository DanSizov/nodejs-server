import * as _ from "underscore";
import { TableNames } from "../../enums";
import { systemError, user, entityWithId } from "../../entities";
import DbService from "../../core/db.service";
import { Queries } from "../../constants";
import { DateHelper } from "../../framework/date.helper";
import { Status, Role } from "../../enums";
import { SqlHelper } from "../../core/sql.helper";

interface IUserService {
    updateById(user: user, userId: number): Promise<user>;
    add(user: user, userId: number): Promise<user>;
    deleteById(id: number, userId: number): Promise<void>;
    getUsers(): Promise<user[]>
    getById(userId: number): Promise<user>
    getUsersTwo():Promise<user[]>
    updateByIdVersionTwo(user: user, userId: number): Promise<user> 
    addVersionTwo(user: user, userId: number): Promise<user>
    deleteByIdVersionTwo(id: number, userId: number): Promise<void>
}

    class UserService implements IUserService {
        private _serviceTable: TableNames = TableNames.User

    constructor() { }

    public async getById(userId: number): Promise<user> {
        return await DbService.getFromTableById(TableNames.User, userId)
    }

    public async getUsers():Promise<user[]> {
        return new Promise<user[]>((resolve, reject) => {
            const result: user[] = []

            SqlHelper.executeQueryArrayResult<user>(Queries.getUsers)
            .then((queryResult: user[]) => {
                queryResult.forEach((user:user) => {
                    result.push(user)
                })
                resolve(result)
            })
            .catch((error: systemError) => {
                reject(error)
            })
        })
    }

    public async getUsersTwo(): Promise<user[]>{
        try {
            const result: user[] = []
            const queryResult: user[] = await SqlHelper.executeQueryArrayResult(Queries.getUsers)
            queryResult.forEach((user: user) => 
        {
                result.push(user)
        })
            return result
            }
        catch (error: any) 
        {
                throw (error as systemError);
        }
    }

    public async updateById(user: user, userId: number): Promise<user> {
        return new Promise<user>((resolve, reject) => {
            const updateDate: Date = new Date();
            SqlHelper.executeQueryNoResult(Queries.UpdateUserById, false, user.firstName, user.lastName, DateHelper.dateToString(updateDate), userId, user.id, Status.Active)
                .then(() => {
                    resolve(user);
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public async updateByIdVersionTwo(user: user, userId: number): Promise<user> {
        
        try {
            const updateDate: Date = new Date()
            await SqlHelper.executeQueryNoResult(Queries.UpdateUserById, false, user.firstName, user.lastName, DateHelper.dateToString(updateDate), userId, user.id, Status.Active)
            return user
        }
        catch (error: any) 
        {
            throw (error as systemError);
        }
    }

    public async updateByIdAnother(user: user, userId: number): Promise<user> {

        try{
            await DbService.updateTableById(this._serviceTable, user.id, user, userId)
            return user
        }
        catch (error: any) {
            throw (error as systemError)
        }
    }

    public async add(user: user, userId: number): Promise<user> {
        return new Promise<user>((resolve, reject) => {
            const createDate: string = DateHelper.dateToString(new Date());
            SqlHelper.createNew(Queries.AddUser, user, user.firstName, user.lastName, user.login as string, user.password as string, Role.RegularUser, createDate, createDate, userId, userId, Status.Active)
                .then((result: entityWithId) => {
                    resolve(result as user);
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public async addVersionTwo(user: user, userId: number): Promise<user> {
        try {
            const createDate: string = DateHelper.dateToString(new Date());
            let result: entityWithId = await SqlHelper.createNew(Queries.AddUser, user, user.firstName, user.lastName, user.login as string, user.password as string, Role.RegularUser, createDate, createDate, userId, userId, Status.Active)
                return result as user
            }
            catch (error: any) 
            {
                throw (error as systemError);
            }
    };

    public async deleteById(id: number, userId: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const updateDate: Date = new Date();
            SqlHelper.executeQueryNoResult(Queries.DeleteUserById, true, DateHelper.dateToString(updateDate), userId, Status.NotActive, id, Status.Active)
                .then(() => {
                    resolve();
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public async deleteByIdVersionTwo(id: number, userId: number): Promise<void> {
            try {
            const updateDate: Date = new Date();
            await SqlHelper.executeQueryNoResult(Queries.DeleteUserById, true, DateHelper.dateToString(updateDate), userId, Status.NotActive, id, Status.Active)
            }
            catch (error: any) 
            {
                throw (error as systemError);
            }
    }
}
export default new UserService()