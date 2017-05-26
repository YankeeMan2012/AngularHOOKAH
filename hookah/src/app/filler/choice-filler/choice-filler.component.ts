import {Component, OnDestroy, OnInit} from '@angular/core';
import {Slider} from '../../shared/slider.service';
import {Storage} from '../../shared/storage.service'

interface IFiller {
    additional_price: number
    // description: string;
    filler_id: number;
    model: string;
    photo: string;
    type_id: number;
    selected: boolean;
}

@Component({
    selector: 'choice-filler',
    templateUrl: './choice-filler.component.html',
    providers: [Slider]
})
export class ChoiceFiller implements OnInit, OnDestroy {

    private showSlider: boolean;
    private fillers: IFiller[] = [];
    private slideView: boolean = true;
    private selected: any = null;

    constructor(private slider: Slider, private storage: Storage) {}

    ngOnInit() {
        let oldState = this.storage.getAppData('filler');
        if (oldState) {
            this.showSlider = oldState.showSlider;
            this.fillers = oldState.fillers;
            this.selected = oldState.selected;
        } else {
            let fillers = this.storage.getData('fillers') || [];
            fillers.forEach((item) => {
                item['selected'] = false;
            });
            this.fillers = fillers;
        }
        setTimeout(() => {
            this.showSlider = this.slider.glideInit('.glide');
        }, 0);
    }

    ngOnDestroy() {
        let save = {
            showSlider: this.showSlider,
            fillers: this.fillers,
            selected: this.selected,
        };
        this.storage.setAppData('filler', save);
    }

    private choiceFiller(filler: IFiller): void {
        this.fillers.forEach((item) => {
            if (item != filler) item.selected = false;
        });
        filler.selected = !filler.selected;
        if (filler.selected) {
            this.storage.setAppData('filler', filler);
            this.selected = filler;
        } else {
            this.storage.setAppData('filler', null);
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
