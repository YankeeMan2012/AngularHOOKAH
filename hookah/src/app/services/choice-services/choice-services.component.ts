import {Component, OnDestroy, OnInit} from '@angular/core';
import {Slider} from '../../shared/slider.service';
import {Storage} from '../../shared/storage.service'

interface IService{
    additional_price: number
    description: string;
    item_id: number;
    model: string;
    photo: string;
    type_id: number;
    selected: boolean;
}

@Component({
    selector: 'choice-services',
    templateUrl: './choice-services.component.html',
    providers: [Slider]
})
export class ChoiceServices implements OnInit, OnDestroy {

    private showSlider: boolean;
    private services: IService[] = [];
    private slideView: boolean = true;

    constructor(private slider: Slider, private storage: Storage) {
    }

    ngOnInit() {
        let oldState = this.storage.getAppData('service');
        if (oldState) {
            this.showSlider = oldState.showSlider;
            this.services = oldState.services;
        } else {
            let services = this.storage.getData('services') || [];
            services.forEach((item) => {
                item['selected'] = false;
            });
            this.services = services;
        }
        setTimeout(() => {
            this.showSlider = this.slider.glideInit('.glide');
        }, 0);
    }

    ngOnDestroy() {
        let save = {
            showSlider: this.showSlider,
            services: this.services,
        };
        this.storage.setAppData('service', save);
    }

    private choiceServices(service: IService): void {
        if (service.type_id == 6) {
            this.services.forEach((item) => {
                if (item != service && item.type_id == 6) item.selected = false;
            });
        }
        service.selected = !service.selected;
        if (service.selected) {
            this.storage.setAppData('service', service);
        } else {
            this.storage.setAppData('service', null);
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

