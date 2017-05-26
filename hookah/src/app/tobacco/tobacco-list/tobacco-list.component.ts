import {Component, OnDestroy, OnInit} from '@angular/core';
import { Storage } from '../../shared/storage.service'
import { Handler } from '../../shared/handler.service'

@Component({
  selector: 'tobacco-list',
  templateUrl: './tobacco-list.component.html',
  styleUrls: ['./tobacco-list.component.scss']
})
export class TobaccoList implements OnInit, OnDestroy {

    private tobaccos: any = [];
    private priceCategories: any;
    private isPopular: boolean;
    private search: boolean = false;
    private selectedCounter: number = 0;
    private enableSellingByPriceCategory: boolean = false;  // потянуть с базы

    constructor(private storage: Storage, private handler: Handler) {}

    ngOnInit() {
        this.priceCategories = this.storage.getData('priceCategory');
        let oldState = this.storage.getAppData('tobaccoListSection');
        if (oldState) {
            this.tobaccos = oldState.tobaccos;
            this.isPopular = oldState.isPopular;
            this.selectedCounter = oldState.selectedCounter;
            return;
        }

        let data = this.storage.getAppData('filterSection');
        this.isPopular = data.popular;
        if (data.popular) {
            data.filters.tobaccos.forEach((item) => {
                if (data.filters.popularTobaccos.indexOf(item.tobacco_id) !== -1) {
                    this.tobaccos.push(item);
                }
            });
        } else {
            this.tobaccos = data.showTobacco;
        }

        this.tobaccos.forEach((item) => {
            item['dropHeight'] = 0;
            item['open'] = false;
            item['selected'] = false;
            item['filtration'] = false;
        });
    }

    ngOnDestroy() {
        let save = {tobaccos: this.tobaccos, isPopular: this.isPopular, selectedCounter: this.selectedCounter};
        this.storage.setAppData('tobaccoListSection', save);
    }

    private selectTobacco(e, tobacco): void {
        e.stopPropagation();
        if (this.selectedCounter < 4 || tobacco.selected) {
            this.storage.setAppData('tobaccoRatio', null); // При изменении состояния табаков очищаем соотношение
            tobacco.selected = !tobacco.selected;
            tobacco.selected ? this.selectedCounter++ : this.selectedCounter--;
        } else {
            this.handler.showMessage('Нельзя выбрать больше 4 табаков.');
        }
    }

    private dropDown(li, tobacco) {
        tobacco.open = !tobacco.open;
        tobacco.dropHeight = tobacco.dropHeight ? 0 : li.scrollHeight;
    }

    private searchListVal(val) {
        let value = val.toLowerCase();
        this.tobaccos.forEach((item) => {
            let exist = true;
            let fullName = (item.br_name + ' ' + item.model + ' ' + item.fl_name + ' ' + item.tags).toLowerCase();
            if ( fullName.indexOf(value) === -1 && exist ) exist = false;
            item.filtration = !exist;
        });
    }

    private goBack() {
        history.back();
    }
}
