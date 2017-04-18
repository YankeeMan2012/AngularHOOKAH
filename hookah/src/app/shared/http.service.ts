import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpService {
    
    constructor(private http: Http) {}
    
    public getData(url: string) {
        return this.http.get(url)
            .map((resp:Response) => {
                return resp.json();
            })
            .catch((error: any) => {
                return error;
            });
    }
}