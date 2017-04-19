import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Storage } from '../../shared/storage.service'

@Component({
  selector: 'filter-tobacco',
  templateUrl: './filter-tobacco.component.html',
  styleUrls: ['./filter-tobacco.component.css']
})
export class FilterTobacco implements OnInit {

    private filters: any = {
        brands: [],
        flavours: [],
        priceCategories: [],
        popularTobaccos: [],
        tobaccos: []
    };

    private show = {
        brand: {},
        taste: {},
        priceCat: {}
    };

    private showTobacco: number[] = [];
    private enablePriceCat: boolean = true; // Подтянуть с базы!

    constructor(private storage: Storage, private router: Router) {}

    ngOnInit() {
        let oldState = this.storage.getAppData('filterSection');
        if (oldState) {
            this.filters = oldState.filters;
            this.show = oldState.show;
            this.showTobacco = oldState.showTobacco;
            return;
        }
        let data = this.storage.getData('filter');
        for (let brand in data.brands) {
            this.filters.brands.push({title: data.brands[brand], id: brand, selected: false});
        }
        for (let flavour in data.flavours) {
            this.filters.flavours.push({title: data.flavours[flavour], id: flavour, selected: false});
        }
        for (let category in data.priceCategories) {
            this.filters.priceCategories.push({title: data.priceCategories[category].category,
                id: data.priceCategories[category].category_id, price: data.priceCategories[category].price,
                selected: false});
        }
        this.filters.tobaccos = data.tobaccos;
        this.filters.popularTobaccos = data.popularTobaccos;
        this.showTobacco = this.filters.tobaccos
    }

    private addFilter(e, filter, type): void {
        e.stopPropagation();
        // APP.tobacco = {};  // Если изменилось состояние фильтра очищаем выбранные табаки

        filter.selected = !filter.selected;
        filter.selected ? this.show[type][filter.id] = filter.id : delete this.show[type][filter.id];

        this.showTobacco = [];
        for (let t = 0; t < this.filters.tobaccos.length; t++) {
            let isBrand = this.filters.tobaccos[t].brand_id in this.show.brand || !Object.keys(this.show.brand).length;
            let isFlavour = this.filters.tobaccos[t].flavour_id in this.show.taste || !Object.keys(this.show.taste).length;
            let isCategory = this.filters.tobaccos[t].category_id in this.show.priceCat || !Object.keys(this.show.priceCat).length;
            if(isBrand && isFlavour && isCategory) {
                this.showTobacco.push(this.filters.tobaccos[t]);
            }

        }
    }

    private showTobaccoList(flag): void {
        let save = {filters: this.filters, show: this.show, showTobacco: this.showTobacco};
        save['popular'] = flag === 'POPULAR';
        this.storage.setAppData('filterSection', save);

        if (this.showTobacco.length) {
            this.router.navigate(['/tobacco-list']);
        }
    }



}
