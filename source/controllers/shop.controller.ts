import { Request, Response, NextFunction } from 'express';
import { NON_EXISTENT_ID } from '../constants';
import { AuthenticatedRequest, systemError, store } from '../entities';
import { RequestHelper } from '../helpers/request.helper';
import { ResponseHelper } from '../helpers/response.helper';
import { ErrorService } from '../services/error.service';
import { StoreService } from '../services/shop.service';

export const errorService: ErrorService = new ErrorService();
export const shopService: StoreService = new StoreService(errorService);

const getStores = async (req: Request, res: Response, next: NextFunction) => {
    console.log("User data: ", (req as AuthenticatedRequest).userData);
    shopService.getStores()
        .then((result: store[]) => {
            return res.status(200).json({
                types: result
            })
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error)
        })
}

const getStoresById = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id)
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            shopService.getStoresById(numericParamOrError)
                .then((result: store) => {
                    return res.status(200).json(result);
                })
                .catch((error: systemError) => {
                    return ResponseHelper.handleError(res, error)
                })
        }
    }
    else {
        return ResponseHelper.handleError(res, numericParamOrError);
    }
}

const updateStoreById = async (req: Request, res:Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id)
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            const body: store = req.body;


            shopService.updateStoreById({
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

const createNewStore = async (req: Request, res:Response, next: NextFunction) => {
    const body: store = req.body;

    shopService.createNewStore({
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

const deleteStoreById = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id)
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            shopService.deleteStoreById(numericParamOrError)
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

const getHelloWorld = async (req: Request, res: Response, next: NextFunction) => {
    
    shopService.gethelloworld()
        .then((result: string) => {
            return res.status(200).json({
                result
            })
        })
}

export default { getStores, getStoresById, updateStoreById, createNewStore, deleteStoreById, getHelloWorld }