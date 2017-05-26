import { Component } from '@angular/core'
import { Router } from '@angular/router'

import { Key } from '../../shared/data/key'
import { keys } from './keyboard'
import { Storage } from '../../shared/storage.service'

declare const $: any;

@Component({
    selector: 'choice-table',
    templateUrl: 'choice-table.component.html',
    styleUrls: ['choice-table.component.scss'],
})
export class ChoiceTable {

    constructor(private router: Router, private storage: Storage) {}

    private keyboard: Key[] = keys;
    private tableView: string = '';
    private tableNum: number;
    private isValidTable: boolean = true;

    private onKeyClick(key: Key): void {
        if (key.add) {
            this.isValidTable = true;
            if (key.value == '' || this.tableView.length == 4) return;
            this.tableView += key.value;
        } else {
            this.tableView = this.tableView.slice(0,-1);
        }
    }

    private onChoiceClick(): void {
        if (!this.tableView.length) {
            this.isValidTable = false;
        } else {
            this.tableNum = parseInt(this.tableView);
            this.storage.setAppData('table', this.tableNum);
            this.router.navigate(['/home']);
        }
    }
    
}