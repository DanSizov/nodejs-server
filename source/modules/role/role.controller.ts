import { Request, Response, NextFunction } from 'express';
import { NON_EXISTENT_ID } from '../../constants';
import { AuthenticatedRequest, role, systemError } from '../../entities';
import { RequestHelper } from '../../core/request.helper';
import { ResponseHelper } from '../../framework/response.helper';
import LoggerService from "../../core/logger.srevice"
import RoleService from "../role/role.service"

class RoleController {

    constructor () {}

    async getRoleBystatus(req: Request, res: Response, next: Function) {
        LoggerService.debug("getRoleBystatus method start")
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.status_id)

        if(typeof numericParamOrError === "number") {
          if (numericParamOrError > 0) {
                RoleService.getRoleBystatus(numericParamOrError)
        .then((result: role[]) => {
            LoggerService.debug("getRoleBystatus successful return")
            return res.status(200).json(result)
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error)
        })
        }    
    }
    LoggerService.debug("getRoleBystatus method end")
    }

    async getRoleById(req: Request, res:Response, next: NextFunction) {
        LoggerService.debug("getRoleById method start")
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)

        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                LoggerService.debug("getRoleById successful return")
                const result: role = await RoleService.getRoleById(numericParamOrError)
                return res.status(200).json(result)
            }
            else {
                LoggerService.debug("getRoleById unhandled error")
            }
        }
        else {
            LoggerService.debug("getRoleById failure response")
            return ResponseHelper.handleError(res, numericParamOrError)
        }
        LoggerService.debug("getRoleById method end")
    }

    async addNewRole (req:Request, res:Response, next: Function) {
        LoggerService.debug("addNewRole method start")   
        const body: role = req.body
    
        RoleService.addNewRole ({
            id: NON_EXISTENT_ID,
            role_name: body.role_name,
        }, (req as AuthenticatedRequest).userData.userId)
        .then((result: role) => {
            const returnedRole : role = {
                id: result.id,
                role_name: result.role_name
            }
            LoggerService.debug("addNewRole successful return")
            return res.status(200).json(returnedRole)
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error)
        })
        LoggerService.debug("addNewRole method end")
    }

    async updateRole (req: Request, res: Response, next: NextFunction) {
        LoggerService.debug("updateRole method start")   
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)
        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                const body: role = req.body
    
                RoleService.updateRole({
                    id : numericParamOrError,
                    role_name: body.role_name
                }, (req as AuthenticatedRequest).userData.userId)
                    .then((result: role) => {
                        LoggerService.debug("updateRole successful return")
                        return res.status(200).json(result)
                    })
                    .catch((error: systemError) => {
                        return ResponseHelper.handleError(res, error)
                    })
            }
        }
        LoggerService.debug("updateRole method end")
    }

    async updateById(req: Request, res: Response, next: NextFunction) {
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)

        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                const body: role = req.body

                RoleService.updateById({
                    id: numericParamOrError,
                    role_name: body.role_name
                }, (req as AuthenticatedRequest).userData.userId)
                .then((result: role) => {
                    return res.status(200).json(result) 
                })
                .catch((error: systemError) => {
                    return ResponseHelper.handleError(res, error)
                })
            }
        }
        else {
            return ResponseHelper.handleError(res, numericParamOrError)
        }
    }

    async deleteById(req: Request, res: Response, next: NextFunction) {
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)

        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                await RoleService.deleteRoleById(numericParamOrError, (req as AuthenticatedRequest).userData.userId)
                return res.sendStatus(200)
            }
        }
        else {
            return ResponseHelper.handleError(res, numericParamOrError)
        }
    }

    async pushById(req: Request, res: Response, next: NextFunction) {
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)

        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                await RoleService.pushRoleById(numericParamOrError, (req as AuthenticatedRequest).userData.userId)
                return res.sendStatus(200)
            }
        }
        else {
            return ResponseHelper.handleError(res, numericParamOrError)
        }
    }
}

export default new RoleController()