/** source/server.ts */
import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
// import demoRoutes from './routes/demo.routes';
// import storeRoutes from './modules/store/store.routes';
// import schoolRoutes from './modules/school/school.routes';
// import employeeRoutes from './modules/employee/employee.routes';
// import authenticationRoutes from './routes/authentication.routes';
// //import userRoutes from './routes/user.routes';
// import roleRoutes from './routes/role.routes';


const router: Express = express();

/** Logging */
router.use(morgan('dev'));
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());

/** RULES OF OUR API */
router.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

/** Routes */
// router.use('/demo/', demoRoutes.router);
// router.use('/general/', schoolRoutes.router);
// router.use('/general/', storeRoutes.router);
// router.use('/general/', employeeRoutes.router);
// router.use('/auth/', authenticationRoutes.router);
// //router.use('/user/', userRoutes.router);
// router.use('/role', roleRoutes.router)

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6666;
httpServer.listen(
    PORT,
    () => {
        console.log(`The server is running on port ${PORT}`);
    });