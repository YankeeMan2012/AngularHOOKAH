import { Injectable } from '@angular/core';

@Injectable()
export class Storage {

    private _storage: any = {};
    private _app: any = {};

    public getData(data: string): any {
        return this._storage[data];
    }
    public setData(key: string, data: any): void {
        this._storage[key] = data;
    }

    public getAppData(data: string): any {
        return this._app[data];
    }
    public setAppData(key: string, data: any): void {
        this._app[key] = data;
    }

}