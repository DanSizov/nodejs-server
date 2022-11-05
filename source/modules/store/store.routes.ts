import express, { Application, Request, Response } from "express";
import { Role } from '../../enums';
import storeController from "./store.controller";
import AuthMiddleware from "../../core/middleware/auth.middleware";
import { RouteConfig } from "../../framework/route.config";


export class StoreRoutes extends RouteConfig {

    constructor(app: Application) {
        super(app, "StoreRoutes", "store")  
    }

    public configureRoutes() {
        
        this.app.route(`/${this.baseUrl}/stores`).get([AuthMiddleware.verifyToken([Role.Administrator,Role.RegularUser]), storeController.getStores])
        this.app.route(`/${this.baseUrl}/:id`).get([AuthMiddleware.verifyToken([Role.Administrator,Role.RegularUser]), storeController.getStoresById])
        this.app.route(`/${this.baseUrl}/:id`).put([AuthMiddleware.verifyToken([Role.Administrator]), storeController.updateStoreById])
        this.app.route(`/${this.baseUrl}`).post([AuthMiddleware.verifyToken([Role.Administrator]), storeController.createNewStore])
        this.app.route(`/${this.baseUrl}/:id`).delete([AuthMiddleware.verifyToken([Role.Administrator]), storeController.deleteStoreById])

        this.app.route(`/helloworld`).get([AuthMiddleware.verifyToken([Role.Administrator]), storeController.getHelloWorld])
        this.app.route(`/getStorebyStoredProcByIdThree`).get([AuthMiddleware.verifyToken([Role.Administrator]), storeController.getStorebyStoredProcByIdThree])
        this.app.route(`/${this.baseUrl}/storeByStoresProc`).post([AuthMiddleware.verifyToken([Role.Administrator]), storeController.createNewStoreByStoreProc])
        
        this.app.route(`/${this.baseUrl}/another/:id`).get(storeController.getStoreByIdAnother)

        return this.app
    }
}
