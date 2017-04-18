import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared/http.service'

interface ICategories {
    title: string,
    price: string
}

@Component({
  selector: 'price-category',
  templateUrl: './price-category.component.html',
  styleUrls: ['./price-category.component.css']
})
export class PriceCategory implements OnInit {

    private currency: string = 'ГРН';
    private categories: ICategories[]= [];

    constructor(private httpService: HttpService) {}

    private choicePriceCategory(title): void {
        console.log(title);
    }

    ngOnInit() {
        this.httpService.getData('http://lviv23.hookah.loc/price-category?get-data-as=json').subscribe(
            data => {
                let isSet = false;
                for (let key in data.priceCategories) {
                    this.categories.push({title: data.priceCategories[key].category, price: data.priceCategories[key].price});
                    isSet = true;
                }
                if (!isSet) {
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
        );
    }

}
