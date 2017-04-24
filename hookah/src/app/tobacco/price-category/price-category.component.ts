import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared/http.service'
import { Storage } from '../../shared/storage.service'

interface ICategories {
    title: string,
    price: string
}

@Component({
  selector: 'price-category',
  templateUrl: './price-category.component.html',
  styleUrls: ['./price-category.component.scss']
})
export class PriceCategory implements OnInit {

    private currency: string = 'ГРН';
    private categories: ICategories[]= [];

    constructor(private httpService: HttpService, private storage: Storage) {}

    ngOnInit() {
        let categories = this.storage.getData('priceCategory');
        if (categories) {
            for (let key in categories) {
                this.categories.push({title: categories[key].category, price: categories[key].price});
            }
        } else {
            this.categories = [
                {
                    title: 'Недорогой',
                    price: ''
                },
                {
                    title: 'Стандарт',
                    price: ''
                },
                {
                    title: 'Премиум',
                    price: ''
                }
            ];
        }
    }

    private goBack() {
        history.back();
    }

}
