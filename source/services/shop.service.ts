import * as _ from "underscore";
import { Queries } from "../constants";
import { systemError, store, entityWithId, employee } from "../entities";
import { SqlHelper } from "../helpers/sql.helper";
import { ErrorService } from "./error.service";

interface localStore {
    id: number;
    store_name: string;
    store_address: string;
}


interface IStoreService {

    getStores(): Promise<store[]>;
    getStoresById(id: number): Promise<store>;
    updateStoreById(store: store): Promise<store>;
    createNewStore(store: store): Promise<store>;
    deleteStoreById(id:number): Promise<void>;

}

export class StoreService implements IStoreService {

    constructor(
        private errorService: ErrorService
    ) {}

    public getStores(): Promise<store[]> {
        return new Promise<store[]>((resolve, reject) => {
            const result: store[] = [];

            SqlHelper.executeQueryArrayResult<localStore>(this.errorService, Queries.stores)
            .then((queryResult: localStore[]) => {
                queryResult.forEach((store: localStore) => {
                    result.push(this.parseLocalStores(store));
                })

                resolve(result)
            })
            .catch((error: systemError) => {
                reject(error);
            })
        })
    }

    public getStoresById(id: number): Promise<store> {
        return new Promise<store>((resolve, reject) => {
            SqlHelper.executeQuerySingleResult<localStore>(this.errorService, Queries.storesById, id)
            .then((queryResult: localStore) => {
                resolve(this.parseLocalStores(queryResult))
            })
            .catch((error: systemError) => {
                reject(error)
            })
        })
    }
    
    public updateStoreById(store: store): Promise<store> {
        return new Promise<store>((resolve, reject) => {
            SqlHelper.executeQueryNoResult(this.errorService, Queries.updateStoreById, false, store.store_name, store.store_address, store.id)
                .then(() => {
                    resolve(store)
                })
                .catch((error: systemError) => {
                    reject(error)
                })
        })
    }

    public createNewStore(store: store): Promise<store> {
        return new Promise<store> ((resolve, reject) => {
            SqlHelper.createNew(this.errorService, Queries.createNewStore, store, store.store_name, store.store_address)
                .then((result: entityWithId) => {
                    resolve(result as store)
                })
                .catch((error: systemError) => {
                    reject(error)
                })
        })
    }

    public deleteStoreById(id:number): Promise<void> {
        return new Promise<void> ((resolve, reject) => {
            SqlHelper.executeQueryNoResult(this.errorService, Queries.deleteStoreById, true, id)
                .then(() => {
                    resolve();
                })
                .catch((error: systemError) => {
                    reject(error);
                })
        })
    }

    private parseLocalStores(local: localStore): store {
        return {
            id: local.id,
            store_name: local.store_name,
            store_address: local.store_address
        };
    }

    public gethelloworld(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const result: string = 'hello world';

            resolve(result)

            })
        }
}
