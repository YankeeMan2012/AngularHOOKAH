import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Storage } from './storage.service'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpService {
    
    constructor(private http: Http, private storage: Storage) {}
    
    public getData(url: string) {
        return this.http.get(url)
            .map((resp:Response) => {
                return resp.json();
            })
            .catch((error: any) => {
                return error;
            });
    }

    public getStaticAppData() {

        this.getData('http://lviv23.hookah.loc/home?get-data-as=json').subscribe(
            data => {
                this.storage.setData('home', data);
            }
        );

        this.getData('http://lviv23.hookah.loc/filter-tobacco?get-data-as=json').subscribe(
            data => {
                this.storage.setData('filter', data);
            }
        );

        this.getData('http://lviv23.hookah.loc/tobacco-mixes?get-data-as=json').subscribe(
            data => {
                this.storage.setData('mixes', data.mixes);
            }
        );

        this.getData('http://lviv23.hookah.loc/price-category?get-data-as=json').subscribe(
            data => {
                this.storage.setData('priceCategory', data.priceCategories);
            }
        );


    }

}