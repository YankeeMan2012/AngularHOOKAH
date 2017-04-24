import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { Key } from '../../shared/data/key'
import { keys } from './keyboard'
import { HttpService } from '../../shared/http.service'

declare const $: any;

@Component({
    selector: 'choice-table',
    templateUrl: 'choice-table.component.html',
    styleUrls: ['choice-table.component.scss'],
})
export class ChoiceTable implements OnInit {
    test: any;

    constructor(private router: Router, private httpService: HttpService) {}

    private keyboard: Key[] = keys;
    private tableView: string = '';
    private tableNum: number;
    private isValidTable: boolean = true;

    ngOnInit() {
        this.httpService.getData('http://lviv23.hookah.loc/filter-tobacco?get-data-as=json').subscribe(
            data => this.test = data
        );
    }

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
            // console.log(this.tableNum);
            this.router.navigate(['/home']);
        }
    }
    
}