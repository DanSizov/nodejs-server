import express, { Express, Application, Request, Response } from "express";
import * as http from "http";
import * as dotenv from 'dotenv'
import cors from "cors";
import { RouteConfig } from "./framework/route.config";
import { UserRoutes } from './modules/user/user.routes';
//import { SchoolRoutes } from "./modules/school/school.route";
import { AuthenticationRoutes } from "./core/authentication/authentication.route";
import LoggerService from './core/logger.srevice';
import { StoreRoutes } from "./modules/store/store.routes";
import { RoleRoutes } from "./modules/role/role.routes";
import { EmployeeRoutes } from "./modules/employee/employee.routes";
import EnvironmentService from "./core/environment.service"

dotenv.config()
EnvironmentService.initialize()
LoggerService.initialize()

const routes: Array<RouteConfig> = [];
const app: Express = express();

app.use(express.json());
app.use(cors());

const PORT: number = EnvironmentService.environment.serverPort;

// if (process.env.DEBUG) {
//     process.on("unhandledRejection", function (reason) {
//         process.exit(1)
//     })
// }

routes.push(new AuthenticationRoutes(app));
routes.push(new UserRoutes(app));
routes.push(new StoreRoutes(app))
routes.push(new RoleRoutes(app))
routes.push(new EmployeeRoutes(app))
//routes.push(new SchoolRoutes(app));

const server: http.Server = http.createServer(app);

server.listen(PORT, () => {
    LoggerService.info(`Server is running on ${PORT}`);
    routes.forEach((route: RouteConfig) => {
        LoggerService.info(`Routes configured for ${route.getName()}`);
    });
});