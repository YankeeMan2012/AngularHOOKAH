import {Component, OnDestroy, OnInit} from '@angular/core';
import {Storage} from '../../shared/storage.service'

@Component({
    selector: 'app-tobacco-mixes',
    templateUrl: './tobacco-mixes.component.html',
    styleUrls: ['./tobacco-mixes.component.scss']
})
export class TobaccoMixes implements OnInit, OnDestroy {

    private search: boolean = false;
    private mixes: any[] = [];

    constructor(private storage: Storage) {
    }


    ngOnInit() {
        let oldState = this.storage.getAppData('mixes');
        if (oldState) {
            this.mixes = oldState;
            return;
        }
        let mixes = this.storage.getData('mixes');
        for (let key in mixes) {
            mixes[key]['selected'] = false;
            mixes[key]['open'] = false;
            mixes[key]['filtration'] = false;
            mixes[key]['dropHeight'] = 0;
            this.mixes.push(mixes[key]);
        }
    }

    ngOnDestroy() {
        this.mixes.forEach((item) => {
            item.filtration = false;
        });
        this.storage.setAppData('mixes', this.mixes);
    }

    private selectMix(e, mix): void {
        e.stopPropagation();
        if (mix.selected) {
            mix.selected = false;
            return;
        }
        this.mixes.forEach((item) => {
            item.selected = false;
        });
        mix.selected = true;
    }

    private dropDown(li, mix) {
        mix.open = !mix.open;
        mix.dropHeight = mix.dropHeight ? 0 : li.scrollHeight;
    }

    private searchListVal(val) {
        let value = val.toLowerCase();
        this.mixes.forEach((item) => {
            let exist = true;
            let fullName = item.name.toLowerCase();
            if (fullName.indexOf(value) === -1 && exist) exist = false;
            item.filtration = !exist;
        });
    }

    private goBack() {
        history.back();
    }

}
