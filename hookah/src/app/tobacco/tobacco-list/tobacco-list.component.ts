import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router'
import { Storage } from '../../shared/storage.service'

@Component({
  selector: 'tobacco-list',
  templateUrl: './tobacco-list.component.html',
  styleUrls: ['./tobacco-list.component.css']
})
export class TobaccoList implements OnInit {

    // @Output() onInfoMsg = new EventEmitter<any>()

    private tobaccos: any = [];
    private priceCategories: any;
    private isPopular: boolean;
    private search: boolean = false;
    private selectedCounter: number = 0;

    private enableSellingByPriceCategory: boolean = false;  // потянуть с базы

    constructor(private storage: Storage, private router: Router) {}

    ngOnInit() {
        let data = this.storage.getAppData('filterSection');
        this.priceCategories = this.storage.getData('priceCategory');
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

    private selectTobacco(e, tobacco): void {
        e.stopPropagation();
        if (this.selectedCounter < 4 || tobacco.selected) {
            tobacco.selected = !tobacco.selected;
            tobacco.selected ? this.selectedCounter++ : this.selectedCounter--;
        } else {
            console.log('notify');
            // this.onInfoMsg.emit('notify');
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
            let fullName = (item.br_name + ' ' + item.model + ' ' + item.fl_name).toLowerCase();
            if ( fullName.indexOf(value) === -1 && exist ) exist = false;
            item.filtration = !exist;
        });
    }

}
