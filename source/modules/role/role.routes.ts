import express, { Application } from 'express';
import { Role } from '../../enums';
import RoleController from "../role/role.controller";
import AuthMiddleware from "../../core/middleware/auth.middleware";
import { RouteConfig } from '../../framework/route.config';

export class RoleRoutes extends RouteConfig {

    constructor(app: Application) {
        super(app, "RoleRoutes", "role")
    }

    public configureRoutes() {

        this.app.route(`/${this.baseUrl}/:status_id`).get([AuthMiddleware.verifyToken([Role.Administrator]), RoleController.getRoleBystatus]);
        this.app.route(`/${this.baseUrl}/role`).post([AuthMiddleware.verifyToken([Role.Administrator]), RoleController.addNewRole])
        this.app.route(`/${this.baseUrl}/:id`).put([AuthMiddleware.verifyToken([Role.Administrator]), RoleController.updateRole])
        this.app.route(`/${this.baseUrl}/getrole/:id`).get([RoleController.getRoleById]);
        this.app.route(`/${this.baseUrl}/updatebyid/:id`).put([AuthMiddleware.verifyToken([Role.Administrator]), RoleController.updateById])
        this.app.route(`/${this.baseUrl}/delete/:id`).delete([AuthMiddleware.verifyToken([Role.Administrator]), RoleController.deleteById])
        this.app.route(`/${this.baseUrl}/push/:id`).delete([AuthMiddleware.verifyToken([Role.Administrator]), RoleController.pushById])
       
        return this.app;
    }
}