import { Component, OnInit } from '@angular/core';
import {  } from '@angular/animations';
import { HttpService } from '../../shared/http.service'

@Component({
  selector: 'filter-tobacco',
  templateUrl: './filter-tobacco.component.html',
  styleUrls: ['./filter-tobacco.component.css']
})
export class FilterTobacco implements OnInit {

    private filters = {
        brands: [],
        flavours: [],
        popularTobaccos: [],
        priceCategories: {},
        tobaccos: []
    };



    private isSetTobacco: boolean = false;

    private isSetTaste: boolean = false;
    private isSetPrice: boolean = false;

    private isOpenBrand: boolean = false;
    private isOpenTaste: boolean = false;

    constructor(private httpService: HttpService) {}


    ngOnInit() {
        this.httpService.getData('http://lviv23.hookah.loc/filter-tobacco?get-data-as=json').subscribe(
            data => {
                for(let brand in data.brands){
                    this.filters.brands.push({title: data.brands[brand], id: brand, selected: false});
                }
                for(let flavours in data.flavours){
                    this.filters.flavours.push({title: data.flavours[flavours], id: flavours, selected: false});
                }
                // this.filters = data;
                this.isSetTobacco = !!this.filters.tobaccos.length;

                this.isSetPrice = !!Object.keys(this.filters.priceCategories).length;
                console.log(data);
            }
        );
    }

}
