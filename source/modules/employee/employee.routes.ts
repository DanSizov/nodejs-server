import express, { Application, Request, Response } from "express";
import { Role } from '../../enums';
import { RouteConfig } from "../../framework/route.config";
import EmployeeController from "./employee.controller";
import AuthMiddleware from "../../core/middleware/auth.middleware";

export class EmployeeRoutes extends RouteConfig {

    constructor(app: Application) {
        super(app, "EmployeeRoutes", "employee")
    }

    public configureRoutes() {

        this.app.route(`/${this.baseUrl}/employeesbystore/:id`).get([EmployeeController.getEmployeeByStoreId])
        this.app.route(`/${this.baseUrl}/:id`).put([EmployeeController.updateEmployeeById])
        this.app.route(`/${this.baseUrl}/employee`).post([EmployeeController.createNewEmp])
        this.app.route(`/${this.baseUrl}/emprelatstore`).post([EmployeeController.referenceEmployeeToStore])
        this.app.route(`/${this.baseUrl}/employee/:id`).delete([EmployeeController.deleteEmployeeById])
        this.app.route(`/${this.baseUrl}/:id`).get([EmployeeController.getEmployeeById])
        
        return this.app
    }
}


