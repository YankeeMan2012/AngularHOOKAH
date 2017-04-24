import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { Storage } from '../../shared/storage.service'


@Component({
    selector: 'who-choice-tobacco',
    templateUrl: 'who-choice-tobacco.component.html',
})
export class WhoChoiceTobacco implements OnInit {

    private mixes: boolean = false;

    constructor(private storage: Storage) {}


    ngOnInit() {
        let mixes = this.storage.getData('mixes');
        this.mixes = !!Object.keys(mixes).length;
    }

    private goBack() {
        history.back();
    }

}