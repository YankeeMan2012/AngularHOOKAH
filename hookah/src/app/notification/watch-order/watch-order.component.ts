import {Component, OnInit} from '@angular/core';

import { Storage } from '../../shared/storage.service'

@Component({
    selector: 'watch-order',
    templateUrl: './watch-order.component.html',
    styleUrls: ['watch-order.component.scss'],
})
export class WatchOrder implements OnInit {

    tableNum: number;
    tobaccos: any[];

    constructor(private storage: Storage) {
    }

    ngOnInit() {
        this.tableNum = this.storage.getAppData('table');
        let tobaccoData = this.storage.getAppData('tobaccoRatio');
        this.tobaccos = tobaccoData.tobaccos;
    }

    private goBack() {
        history.back();
    }

}
