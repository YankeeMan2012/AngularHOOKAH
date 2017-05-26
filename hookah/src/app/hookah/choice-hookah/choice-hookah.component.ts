import {Component, OnDestroy, OnInit} from '@angular/core';
import {Slider} from '../../shared/slider.service';
import {Storage} from '../../shared/storage.service';

interface IHookah{
    additional_price: number
    description: string;
    free: number;
    hookah_id: number;
    brand: string;
    model: string;
    photo: string;
    selected: boolean;
}

@Component({
    selector: 'choice-hookah',
    templateUrl: './choice-hookah.component.html',
    providers: [Slider]
})
export class ChoiceHookah implements OnInit, OnDestroy {

    private showSlider: boolean;
    private hookahs: IHookah[] = [];
    private slideView: boolean = true;
    private selected: any = null;

    constructor(private slider: Slider, private storage: Storage) {}

    ngOnInit() {
        let oldState = this.storage.getAppData('hookah');
        if (oldState) {
            this.showSlider = oldState.showSlider;
            this.hookahs = oldState.hookahs;
            this.selected = oldState.selected;
        } else {
            let hookahs = this.storage.getData('hookah') || [];
            console.log(hookahs);
            hookahs.forEach((item) => {
                item['selected'] = false;
            });
            this.hookahs = hookahs;
        }
        setTimeout(() => {
            this.showSlider = this.slider.glideInit('.glide');
        }, 0);
    }

    ngOnDestroy() {
        let save = {
            showSlider: this.showSlider,
            hookahs: this.hookahs,
            selected: this.selected,
        };
        this.storage.setAppData('hookah', save);
    }

    private choiceHookah(hookah: IHookah): void {
        this.hookahs.forEach((item) => {
            if (item != hookah) item.selected = false;
        });
        hookah.selected = !hookah.selected;
        if (hookah.selected) {
            this.storage.setAppData('hookah', hookah);
            this.selected = hookah;
        } else {
            this.storage.setAppData('hookah', null);
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
