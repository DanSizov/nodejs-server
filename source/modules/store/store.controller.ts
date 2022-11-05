import { Request, Response, NextFunction } from 'express';
import { NON_EXISTENT_ID } from '../../constants';
import { systemError, store } from '../../entities';
import { RequestHelper } from '../../core/request.helper';
import { ResponseHelper } from '../../helpers/response.helper';
import StoreService from './store.service'
import LoggerService from '../../core/logger.srevice'
import { result } from 'underscore';

class StoreController {

    constructor() {}

    async getStoresById (req: Request, res: Response, next: NextFunction) {
        LoggerService.debug("getStoreById method start")
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)

        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                LoggerService.debug("getStoreById successful return")
                StoreService.getStoreById(numericParamOrError)
                .then((result: store) => {
                    return res.status(200).json(result);
                })
                .catch((error: systemError) => {
                    return ResponseHelper.handleError(res, error)
                })
                    
            }
            else {
                LoggerService.debug("getStoresById unhandled error")
            }
        }
        else {
            LoggerService.debug("getStoresById failure response")
            return ResponseHelper.handleError(res, numericParamOrError)
        }
    }

    async getStores (req: Request, res: Response, next: NextFunction) {
        StoreService.getStores()
            .then((result: store[]) => {
                return res.status(200).json({
                    types: result
                })
            })
            .catch((error: systemError) => {
                return ResponseHelper.handleError(res, error)
            })
    }

    async getStoreByIdAnother(req: Request, res:Response, next: NextFunction) {
        LoggerService.debug("getUserById method start")
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)

        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                LoggerService.debug("getUserById successful return")
                const result: store = await StoreService.getByIdAnother(numericParamOrError)
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

    async updateStoreById (req: Request, res:Response, next: NextFunction) {
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)
        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                const body: store = req.body;
    
    
                StoreService.updateStoreById({
                    id: numericParamOrError,
                    store_name: body.store_name,
                    store_address: body.store_address
                })
                    .then ((result: store) => { 
                        return res.status(200).json(result)
                    })
                    .catch((error: systemError) =>{
                        return ResponseHelper.handleError(res, error)
                    })
                  
            }
        }
        else {
            return ResponseHelper.handleError(res, numericParamOrError);
        }
    }

    async createNewStore(req: Request, res:Response, next: NextFunction) {
        // console.log("User data: ", (req as AuthenticatedRequest).userData);
        const body: store = req.body;
    
        StoreService.createNewStore({
            id: NON_EXISTENT_ID,
            store_name: body.store_name,
            store_address: body.store_address
        }) 
        .then((result: store) => {
            return res.status(200).json(result)
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error)
        })
    }

    async deleteStoreById (req: Request, res: Response, next: NextFunction) {
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput( req.params.id)
        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                StoreService.deleteStoreById(numericParamOrError)
                    .then(() => {
                        return res.sendStatus(200)
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

    async getHelloWorld (req: Request, res: Response, next: NextFunction) {
    
        StoreService.gethelloworld()
            .then((result: string) => {
                return res.status(200).json({
                    result
                })
            })
    }

    async getStorebyStoredProcByIdThree (req: Request, res: Response, next: Function) {
        StoreService.getStoreByStoredProc()
            .then ((result: store) => {
                return res.status(200).json({
                    types: result
                })
            })
            .catch((error:systemError) => {
                return ResponseHelper.handleError(res, error)
            })
    }

    async createNewStoreByStoreProc (req: Request, res: Response, next: NextFunction) {
        const body: store = req.body
    
        StoreService.createStoreByStoredProcInNormalWay({
            id: NON_EXISTENT_ID,
            store_name: body.store_name,
            store_address: body.store_address
        })
        .then((result: store) => {
            return res.status(200).json(result)
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error)
        })
    } 
}


export default new StoreController()