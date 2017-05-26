import {Component, OnDestroy, OnInit} from '@angular/core';
import {URLSearchParams} from '@angular/http';
import {Slider} from '../../shared/slider.service';
import {Storage} from '../../shared/storage.service'
import {HttpService} from "../../shared/http.service";
import {Router} from "@angular/router";

interface IBowl {
    additional_price: number;
    description: string;
    free: number;
    is_fruit: number;
    item_id: number;
    model: string;
    name: string;
    photo: string;
    type_id: number;
    selected: boolean;
}

@Component({
    selector: 'choice-bowl',
    templateUrl: './choice-bowl.component.html',
    providers: [Slider]
})
export class ChoiceBowl implements OnInit, OnDestroy {

    private showSlider: boolean;
    private bowls: IBowl[] = [];
    private fruits: IBowl[] = [];
    private slideView: boolean = true;
    private bowlView: boolean = true;
    private fruitView: boolean = true;
    private selected: any = null;
    private tobacco: any;

    constructor(private slider: Slider, private storage: Storage, private httpService: HttpService, private router: Router) {}

    ngOnInit() {
        let oldState = this.storage.getAppData('bowl');
        if (oldState) {
            this.showSlider = oldState.showSlider;
            this.bowls = oldState.bowls;
            this.fruits = oldState.fruits;
            this.selected = oldState.selected;
        } else {
            let bowls = this.storage.getData('bowls');
            bowls.forEach((item) => {
                item['selected'] = false;
                if (item.is_fruit == 0) {
                    this.bowls.push(item);
                } else {
                    this.fruits.push(item);
                }
            });
        }
        setTimeout(() => {
            this.showSlider = this.slider.glideInit('.glide');
            if (this.bowls.length) {
                this.fruitView = false;
            } else {
                this.bowlView = false;
            }
        }, 0);
        this.tobacco = this.storage.getAppData('tobaccoRatio');
    }

    ngOnDestroy() {
        let save = {
            showSlider: this.showSlider,
            bowls: this.bowls,
            fruits: this.fruits,
            selected: this.selected,
        };
        this.storage.setAppData('bowl', save);
    }

    private choiceBowl(bowl: IBowl): void {
        this.bowls.concat(this.fruits).forEach((item) => {
            if (item != bowl) item.selected = false;
        });
        bowl.selected = !bowl.selected;
        if (bowl.selected) {
            this.storage.setAppData('bowl', bowl);
            this.storage.setAppData('price', {bowl: +bowl.additional_price});
            this.selected = bowl;

            // if (!AppJS.enablePriceCat) {
            //     if (this.tobacco && this.tobacco.tobaccos.length) {
            //         let sp = new URLSearchParams();
            //         let tobacco = {};
            //         this.tobacco.tobaccos.forEach((item) => {
            //             sp.set('tobacco[]', item.id + ':' + item.percent);
            //         });
            //         sp.set('bowlId', bowl.item_id + '');
            //         this.tobacco.strengths.forEach((item) => {
            //             if (item.selected) sp.set('filling', item.strength_id);
            //         });
            //         sp.set('ajReqMeth', 'calculateTobaccos');
            //         this.httpService.postData('http://lviv23.hookah.loc/filtration', sp).subscribe(
            //             data => {
            //                 this.storage.setAppData('price', {tobacco: data, bowl: +bowl.additional_price});
            //             });
            //
            //         // Rqst.post({data: sp, url: '/filtration', success:function(res) {
            //         //     if(res && res.backData && res.backData.tobaccoPrice){
            //         //         APP.prices.tobacco = Number(res.backData.tobaccoPrice);
            //         //         AppJS.globalPriceToApp();
            //         //     }
            //         // }});
            //     } else {
            //         console.warn('Цена по граммам не посчиталась. Не выбран табак!');
            //     }
            // }

        } else {
            this.storage.setAppData('bowl', null);
            this.selected = null;
        }
    }

    private next() {

        // if (!AppJS.enablePriceCat) {
        if (this.tobacco && this.tobacco.tobaccos.length) {
            let sp = new URLSearchParams();
            let tobacco = {};
            this.tobacco.tobaccos.forEach((item) => {
                sp.set('tobacco[]', item.id + ':' + item.percent);
            });
            sp.set('bowlId', this.selected.item_id + '');
            this.tobacco.strengths.forEach((item) => {
                if (item.selected) sp.set('filling', item.strength_id);
            });
            sp.set('ajReqMeth', 'calculateTobaccos');
            this.httpService.postData('http://lviv23.hookah.loc/filtration', sp).subscribe(
                data => {
                    this.storage.setAppData('price', {tobacco: data, bowl: +this.selected.additional_price});
                    this.router.navigate(['/who-choice-bowl-lid']);
                });

            // Rqst.post({data: sp, url: '/filtration', success:function(res) {
            //     if(res && res.backData && res.backData.tobaccoPrice){
            //         APP.prices.tobacco = Number(res.backData.tobaccoPrice);
            //         AppJS.globalPriceToApp();
            //     }
            // }});
        } else {
            console.warn('Цена по граммам не посчиталась. Не выбран табак!');
            this.router.navigate(['/who-choice-bowl-lid']);
        }
        // }
    }

    private switchView(): void {
        this.slideView = !this.slideView;
        this.slider.glideSwitchTile('.glide', !this.slideView);
    }

    private goBack() {
        history.back();
    }

}
