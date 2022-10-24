
import { Request, Response, NextFunction } from 'express';
import { NON_EXISTENT_ID } from '../constants';
import { AuthenticatedRequest, newrole, systemError, user } from '../entities';
import { Role } from "../enums";
import { RequestHelper } from '../helpers/request.helper';
import { ResponseHelper } from '../helpers/response.helper';
import { ErrorService } from '../services/error.service';
import { RoleService } from "../services/role.service";

const errorService: ErrorService = new ErrorService();
const roleService: RoleService = new RoleService(errorService);

const addNewRole = async (req:Request, res:Response, next: Function) => {
    const body: newrole = req.body

    roleService.addNewRole ({
        id: NON_EXISTENT_ID,
        role_name: body.role_name
    }, (req as AuthenticatedRequest).userData.userId)
    .then((result: newrole) => {
        const returnedRole : newrole = {
            id: result.id,
            role_name: result.role_name
        }
        return res.status(200).json(returnedRole)
    })
    .catch((error: systemError) => {
        return ResponseHelper.handleError(res, error)
    })
}
export default { addNewRole };