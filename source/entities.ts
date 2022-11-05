import { Request } from 'express';
import { AppError, Role } from "./enums";

export interface entityWithId {
    id: number;
}

export interface whiteBoardType extends entityWithId {
    type: string;
}


export interface systemError {
    key: AppError;
    code: number;
    message: string;
}

export interface sqlParameter {
    name: string;
    type: any;
    value: string | number;
}

export interface authenticationToken {
    userData: jwtUserData;
}

export interface jwtUserData {
    userId: number;
    roleId: Role;
}

export interface AuthenticatedRequest extends Request, authenticationToken { }

export interface user extends entityWithId {
    firstName: string;
    lastName: string;
    login?: string;
    password?: string;
}

// HOMEWORK
export interface store extends entityWithId {
    store_name: string;
    store_address: string;
}

export interface employeeid {
    id : number

}

export interface employeeToStoreWithReationId extends entityWithId {
    employee_id: number,
    store_id: number,
    employee_relat_id: number
}

export interface employee extends entityWithId {
    first_name: string;
    last_name: string;
    position: string
}

export interface role extends entityWithId {

    role_name: string;
}

export interface environment {
    dbConnectionString: string
    tokenSecret: string
    logsFolder: string
    serverPort: number
}

