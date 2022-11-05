import * as _ from "underscore";
import { columnDefinition, tableDefinition} from "../db-entities";
import { employee, role, store, user } from "../entities";
import { DbTable } from "./db-table.service";
import { ColumnType, TableNames, ColumnUpdateType} from "../enums"

interface localTable<T> {
    table: tableDefinition;
    instance: DbTable<T>;
}

interface IDbService {
    getFromTableById(tableName: TableNames, id: number): Promise<any>;
    updateTableById<T>(tableName: TableNames, id: number, original: T, userId: number): Promise<void>
}

class DbService implements IDbService {

    private _tables: _.Dictionary<any> = {};

    constructor() {

        this._tables[TableNames.User] = this.addTableToContext<user>(TableNames.User, [{
            dbName: "id",
            name: "id",
            type: ColumnType.Integer,
            isForOutput: true,
            isQueriable: true,
            updateType: ColumnUpdateType.None
        }, {
            dbName: "first_name",
            name: "firstName",
            type: ColumnType.Varchar,
            isForOutput: true,
            isQueriable: true,
            updateType: ColumnUpdateType.Always
            }]);

        this._tables[TableNames.Store] = this.addTableToContext<store>(TableNames.Store, [{
            dbName: "id",
            name:"id",
            type: ColumnType.Integer,
            isForOutput: true,
            isQueriable: true,
            updateType: ColumnUpdateType.None
        }, {
            dbName: "store_name",
            name: "store_name",
            type: ColumnType.Varchar,
            isForOutput: true,
            isQueriable: true,
            updateType: ColumnUpdateType.Always
        },{
            dbName: "store_address",
            name: "store_address",
            type: ColumnType.Varchar,
            isForOutput: true,
            isQueriable: true,
            updateType: ColumnUpdateType.Always
        }])
        this._tables[TableNames.Role] = this.addTableToContext<role>(TableNames.Role, [{
            dbName: "id",
            name: "id",
            type: ColumnType.Integer,
            isForOutput: true,
            isQueriable: true,
            updateType: ColumnUpdateType.None
        }, {
            dbName: "role_name",
            name: "role_name",
            type: ColumnType.Varchar,
            isForOutput: true,
            isQueriable: true,
            updateType: ColumnUpdateType.Always
        }, {
            dbName: "create_date",
            name: "create_date",
            type: ColumnType.Date,
            isForOutput: true,
            isQueriable: true,
            updateType: ColumnUpdateType.None
        }, {    
            dbName: "update_date",
            name: "update_date",
            type: ColumnType.Date,
            isForOutput: true,
            isQueriable: true,
            updateType: ColumnUpdateType.CurrentDate
        }, {
            dbName: "create_user_id",
            name: "create_user_id",
            type: ColumnType.Integer,
            isForOutput: true,
            isQueriable: true,
            updateType: ColumnUpdateType.None
        }, {
            dbName: "update_user_id",
            name: "update_user_id",
            type: ColumnType.Integer,
            isForOutput: true,
            isQueriable: true,
            updateType: ColumnUpdateType.CurrentUser
        }, {
            dbName: "status_id",
            name: "status_id",
            type: ColumnType.Integer,
            isForOutput: true,
            isQueriable: true,
            updateType: ColumnUpdateType.None
        }])
        this._tables[TableNames.Employee] = this.addTableToContext<employee>(TableNames.Employee, [{
            dbName: "id",
            name: "id",
            type: ColumnType.Integer,
            isForOutput: true,
            isQueriable: true,
            updateType: ColumnUpdateType.None
        }, {
            dbName: "first_name",
            name: "first_name",
            type: ColumnType.Varchar,
            isForOutput: true,
            isQueriable: true,
            updateType: ColumnUpdateType.Always
        }, {
            dbName: "last_name",
            name: "last_name",
            type: ColumnType.Varchar,
            isForOutput: true,
            isQueriable: true,
            updateType: ColumnUpdateType.Always
        }, {
            dbName: "position",
            name: "position",
            type: ColumnType.Varchar,
            isForOutput: true,
            isQueriable: true,
            updateType: ColumnUpdateType.Always
        }])}

    public get tables(): _.Dictionary<tableDefinition> {
        return this._tables;
    }

    public async getFromTableById(tableName: TableNames, id: number): Promise<any> {
        const dbTableObject: localTable<any> = this._tables[tableName] as localTable<any>;

        return await dbTableObject.instance.getById(id);
    }

    public async updateTableById<T>(tableName: TableNames, id: number, original: T, userId: number): Promise<void> {
        const dbTableObject: localTable<any> = this._tables[tableName] as localTable<any>

        await dbTableObject.instance.updateById(id, original, userId)
    }

    private addTableToContext<T>(tableName: TableNames, fields: columnDefinition[]): localTable<T> {
        let tableDefinition: tableDefinition = {
            name: tableName,
            fields: fields
        };

        let tableInstance: DbTable<T> = new DbTable(tableDefinition);

        let table: localTable<T> = {
            table: tableDefinition,
            instance: tableInstance
        };

        return table;
    }
}

export default new DbService();