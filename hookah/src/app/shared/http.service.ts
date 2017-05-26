import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Storage } from './storage.service'
import {Observable} from "rxjs/Observable";
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

    public postData(url: string, body: any) {

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

        return this.http.post(url, body.toString(), {headers: headers})
            .map((resp:Response) => {
                return resp.json();
            })
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public getStaticAppData(): void {

        this.getData('http://lviv23.hookah.loc/home?get-data-as=json').subscribe(
            data => {
                this.storage.setData('home', data);
            }
        );

        this.getData('http://lviv23.hookah.loc/recall?get-data-as=json').subscribe(
            data => {
                this.storage.setData('recall', data.reviews);
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

        this.getData('http://lviv23.hookah.loc/tobacco-ratio?get-data-as=json').subscribe(
            data => {
                this.storage.setData('tobaccoRatio', data.strengths);
            }
        );

        this.getData('http://lviv23.hookah.loc/choice-bowl?get-data-as=json').subscribe(
            data => {
                this.storage.setData('bowls', data.bowls);
            }
        );

        this.getData('http://lviv23.hookah.loc/choice-filler?get-data-as=json').subscribe(
            data => {
                this.storage.setData('fillers', data.fillers);
            }
        );

        this.getData('http://lviv23.hookah.loc/choice-services?get-data-as=json').subscribe(
            data => {
                this.storage.setData('services', data.addServices);
            }
        );

    }

}