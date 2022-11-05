import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import { RequestHelper } from "../../core/request.helper";
import { AuthenticatedRequest, systemError, user } from "../../entities";
import { ResponseHelper } from "../../framework/response.helper";
import UserService from './user.service'
import LoggerService from '../../core/logger.srevice'
import { NON_EXISTENT_ID } from "../../constants";

class UserController {

    constructor() {}

    async getUserById(req: Request, res:Response, next: NextFunction) {
        LoggerService.debug("getUserById method start")
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)

        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                LoggerService.debug("getUserById successful return")
                const result: user = await UserService.getById(numericParamOrError)
                return res.status(200).json(result)
            }
            else {
                LoggerService.debug("getUserById unhandled error")
            }
        }
        else {
            LoggerService.debug("getUserById failure response")
            return ResponseHelper.handleError(res, numericParamOrError)
        }
        LoggerService.debug("getUserById method end")
    }

    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        LoggerService.debug("getAllUsers method start")
        UserService.getUsers()
        .then((result: user[]) => {
            LoggerService.debug("getAllUsers successful return")
            return res.status(200).json({
                result
            })
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error)
        })
        LoggerService.debug("getAllUsers method end")
    }

    async getAllUsersVersionTwo(req: Request, res: Response, next: NextFunction) {

        let result: user[] = await UserService.getUsersTwo()
         return res.status(200).json({result})
               
    }

    async updateById(req: Request, res: Response, next: NextFunction) {
        LoggerService.debug("updateById method start")
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)
       
        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                LoggerService.debug("updateById successful return")
                const body: user = req.body;
    
                UserService.updateById({
                    id: numericParamOrError,
                    firstName: body.firstName,
                    lastName: body.lastName
                }, (req as AuthenticatedRequest).userData.userId)
                    .then((result: user) => {
                        return res.status(200).json(result);
                    })
                    .catch((error: systemError) => {
                        return ResponseHelper.handleError(res, error);
                    });
            }
            else {
                LoggerService.debug("updateById unhandled error")
            }
        }
        else {
            LoggerService.debug("updateById failure response")
            return ResponseHelper.handleError(res, numericParamOrError);
        }
        LoggerService.debug("updateById method end")
    };

    async updateByIdVersionTwo(req: Request, res: Response, next: NextFunction) {

        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)
       
        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {

                const body: user = req.body;
    
                let result : user = await UserService.updateByIdVersionTwo({
                    id: numericParamOrError,
                    firstName: body.firstName,
                    lastName: body.lastName
                }, (req as AuthenticatedRequest).userData.userId)

                    return res.status(200).json(result);
                }

            }
    }

    async updateByIdAnother(req:Request, res:Response, next: NextFunction) {
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)

        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                const body: user = req.body;

                UserService.updateById({
                    id: numericParamOrError,
                    firstName: body.firstName,
                    lastName: body.lastName
                }, (req as AuthenticatedRequest).userData.userId)
                    .then((result: user) => {
                        return res.status(200).json(result);
                    })
                    .catch((error: systemError) => {
                        return ResponseHelper.handleError(res, error);
                    });
            }
            else {
                // TODO: Error handling
            }
        }
        else {
            return ResponseHelper.handleError(res, numericParamOrError);
        }
    }

    async add(req: Request, res:Response, next: NextFunction) {
        LoggerService.debug("add method start")   
        const body: user = req.body
        const hashedPassword: string = bcrypt.hashSync(body.password as string)

        UserService.add({
            id: NON_EXISTENT_ID,
            firstName: body.firstName,
            lastName: body.lastName,
            login: body.login,
            password: hashedPassword
        }, (req as AuthenticatedRequest).userData.userId)
        .then((result: user) => {
            const returnedUser: user = {
                id: result.id,
                firstName: result.firstName,
                lastName: result.lastName
            }
            LoggerService.debug("add successful return")
            return res.status(200).json(returnedUser)
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error)
        })
        LoggerService.debug("add method end")
    }

    async addVersionTwo(req: Request, res:Response, next: NextFunction) { 
        const body: user = req.body
        const hashedPassword: string = bcrypt.hashSync(body.password as string)

        let result: user = await UserService.addVersionTwo({
            id: NON_EXISTENT_ID,
            firstName: body.firstName,
            lastName: body.lastName,
            login: body.login,
            password: hashedPassword
        }, (req as AuthenticatedRequest).userData.userId)
            const returnedUser: user = {
                id: result.id,
                firstName: body.firstName,
                lastName: body.lastName
            }
            return res.status(200).json(returnedUser)

}
    
    async deleteById(req: Request, res: Response, next: NextFunction) {
        LoggerService.debug("deleteById method start")   
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)

        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                LoggerService.debug("deleteById successful return")
                UserService.deleteById(numericParamOrError, (req as AuthenticatedRequest).userData.userId)
                    .then(() => {
                        return res.sendStatus(200);
                    })
                    .catch((error: systemError) => {
                        return ResponseHelper.handleError(res, error);
                    });
            }
            else {
                LoggerService.debug("deleteById unhandled error")
            }
        }
        else {
            LoggerService.debug("deleteById failure response")
            return ResponseHelper.handleError(res, numericParamOrError);
        }
        LoggerService.debug("deleteById method end")
    };
   
    async deleteByIdVersionTwo(req: Request, res: Response, next: NextFunction) {

        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)

        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {

                await UserService.deleteByIdVersionTwo(numericParamOrError, (req as AuthenticatedRequest).userData.userId)
                return res.sendStatus(200);

            }
        }
        else {
            return ResponseHelper.handleError(res, numericParamOrError);
        }
    };
}

export default new UserController()