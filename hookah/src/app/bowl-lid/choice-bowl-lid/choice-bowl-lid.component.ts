import {Component, OnDestroy, OnInit} from '@angular/core';
import {Slider} from '../../shared/slider.service';
import {Storage} from '../../shared/storage.service';

interface IBowlLid {
    additional_price: number
    description: string;
    free: number;
    bowl_lid_id: number;
    brand: string;
    model: string;
    photo: string;
    selected: boolean;
}

@Component({
    selector: 'choice-bowl-lid',
    templateUrl: './choice-bowl-lid.component.html',
    providers: [Slider]
})
export class ChoiceBowlLid implements OnInit, OnDestroy {

    private showSlider: boolean;
    private bowlLids: IBowlLid[] = [];
    private slideView: boolean = true;
    private selected: any = null;

    constructor(private slider: Slider, private storage: Storage) {}

    ngOnInit() {
        let oldState = this.storage.getAppData('bowl-lid');
        if (oldState) {
            this.showSlider = oldState.showSlider;
            this.bowlLids = oldState.bowlLids;
            this.selected = oldState.selected;
        } else {
            let bowlLids = this.storage.getData('bowl-lid') || [];
            bowlLids.forEach((item) => {
                item['selected'] = false;
            });
            this.bowlLids = bowlLids;
        }
        setTimeout(() => {
            this.showSlider = this.slider.glideInit('.glide');
        }, 0);
    }

    ngOnDestroy() {
        let save = {
            showSlider: this.showSlider,
            bowlLids: this.bowlLids,
            selected: this.selected,
        };
        this.storage.setAppData('bowl-lid', save);
    }

    private choiceBowlLid(bowlLid: IBowlLid): void {
        this.bowlLids.forEach((item) => {
            if (item != bowlLid) item.selected = false;
        });
        bowlLid.selected = !bowlLid.selected;
        if (bowlLid.selected) {
            this.storage.setAppData('bowl-lid', bowlLid);
            this.selected = bowlLid;
        } else {
            this.storage.setAppData('bowl-lid', null);
            this.selected = null;
        }
    }

    public switchView(): void {
        this.slideView = !this.slideView;
        this.slider.glideSwitchTile('.glide', !this.slideView);
    }

    private goBack() {
        history.back();
    }

}
