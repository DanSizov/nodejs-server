import express, { Application, Request, Response } from "express";
import { Role } from '../../enums';
import { RouteConfig } from "../../framework/route.config";
import UserController from "./user.controller";
import AuthMiddleware from "../../core/middleware/auth.middleware";

export class UserRoutes extends RouteConfig {

    constructor(app: Application) {
        super(app, "UserRoutes", "user");
    }

    public configureRoutes() {

        this.app.route(`/${this.baseUrl}/users`).get([AuthMiddleware.verifyToken([Role.Administrator]), UserController.getAllUsers]);
        this.app.route(`/${this.baseUrl}/:id`).get([AuthMiddleware.verifyToken([Role.Administrator]), UserController.getUserById]);
        this.app.route(`/${this.baseUrl}/:id`).put([AuthMiddleware.verifyToken([Role.Administrator]), UserController.updateById]);
        this.app.route(`/${this.baseUrl}/`).post([AuthMiddleware.verifyToken([Role.Administrator]), UserController.add])
        this.app.route(`/${this.baseUrl}/:id`).delete([AuthMiddleware.verifyToken([Role.Administrator]), UserController.deleteById]);

        this.app.route(`/${this.baseUrl}/getusers/getusers`).get(UserController.getAllUsersVersionTwo)
        this.app.route(`/${this.baseUrl}/updateuser/:id`).put([AuthMiddleware.verifyToken([Role.Administrator]), UserController.updateByIdVersionTwo]);
        this.app.route(`/${this.baseUrl}/addVersionTwo`).post([AuthMiddleware.verifyToken([Role.Administrator]), UserController.addVersionTwo])
        this.app.route(`/${this.baseUrl}/delete/:id`).delete([AuthMiddleware.verifyToken([Role.Administrator]), UserController.deleteByIdVersionTwo]);

        this.app.route(`/${this.baseUrl}/updateanother/:id`).put([AuthMiddleware.verifyToken([Role.Administrator]), UserController.updateByIdAnother])
       
        return this.app;
    }
}