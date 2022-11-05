import * as _ from "underscore";
import { Queries, StoredProcedures } from "../../constants";
import { systemError, store, entityWithId} from "../../entities";
import { SqlHelper } from "../../core/sql.helper";
import DbService from "../../core/db.service";
import { TableNames } from "../../enums";

interface IStoreService {

    getStores(): Promise<store[]>;
    getStoreById(storeId: number): Promise<store>;
    updateStoreById(store: store): Promise<store>;
    createNewStore(store: store): Promise<store>;
    deleteStoreById(id:number): Promise<void>;
    getStoreByStoredProc(): Promise<store>
    createStoreByStoredProc(store: store): Promise<store>
    createStoreByStoredProcInNormalWay(store: store):Promise<store>

}

export class StoreService implements IStoreService {

    constructor() {}

    public async getStores(): Promise<store[]> {
        return new Promise<store[]>((resolve, reject) => {
            const result: store[] = [];

            SqlHelper.executeQueryArrayResult<store>(Queries.stores)
            .then((queryResult: store[]) => {
                queryResult.forEach((store: store) => {
                    result.push(store);
                })

                resolve(result)
            })
            .catch((error: systemError) => {
                reject(error);
            })
        })
    }

    public async getStoreById(id: number): Promise<store> {
        return new Promise<store>((resolve, reject) => {    
            
            SqlHelper.executeQuerySingleResult<store>(Queries.storesById, id)
            .then((queryResult: store) => {
                resolve(this.parseLocalStores(queryResult))
            })
            .catch((error: systemError) => reject(error));
        });
    }

    public async getByIdAnother(id: number): Promise<store> {
        return await DbService.getFromTableById(TableNames.Store, id)
    }
  
    public async updateStoreById(store: store): Promise<store> {
        return new Promise<store>((resolve, reject) => {
            SqlHelper.executeQueryNoResult(Queries.updateStoreById, false, store.store_name, store.store_address, store.id)
                .then(() => {
                    resolve(store)
                })
                .catch((error: systemError) => {
                    reject(error)
                })
        })
    }

    public async createNewStore(store: store): Promise<store> {
        return new Promise<store> ((resolve, reject) => {
            SqlHelper.createNew(Queries.createNewStore, store, store.store_name, store.store_address)
                .then((result: entityWithId) => {
                    resolve(result as store)
                })
                .catch((error: systemError) => {
                    reject(error)
                })
        })
    }

    public async deleteStoreById(id:number): Promise<void> {
        return new Promise<void> ((resolve, reject) => {
            SqlHelper.executeQueryNoResult(Queries.deleteStoreById, true, id)
                .then(() => {
                    resolve();
                })
                .catch((error: systemError) => {
                    reject(error);
                })
        })
    }

    public async gethelloworld(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const result: string = 'hello world';

            resolve(result)

            })
        }

    public async getStoreByStoredProc(): Promise<store> {
        return new Promise<store>((resolve, reject) => {
            SqlHelper.executeQuerySingleResult<store>(StoredProcedures.getStoreById3StoredProc)
            .then((queryResult: store) => {
                resolve(queryResult)
            })
            .catch((error: systemError) => {
                reject(error)
            })
        })
    }

    public async createStoreByStoredProc(store: store): Promise<store> {
        return new Promise<store> ((resolve, reject) => {
            SqlHelper.executeQuerySingleResult(StoredProcedures.createStoreByStoredProc, store.store_name, store.store_address)
            .then(() => {
                resolve(store)
            })
            .catch((error: systemError) => {
                reject(error)
            })
        })
    }

    public async createStoreByStoredProcInNormalWay(store: store):Promise<store> {
        return new Promise<store> ((resolve, reject) => {
            SqlHelper.executeStoredProcedureCreateNew(StoredProcedures.createStoreByStoredProc,store, store.store_name, store.store_address)
            .then(() => {
                resolve(store)
            })
            .catch((error: systemError) => {
                reject(error)
            })
        })
    }

    private parseLocalStores(local: store): store {
        return {
            id: local.id,
            store_name: local.store_name,
            store_address: local.store_address
        };
    }

}
export default new StoreService()
