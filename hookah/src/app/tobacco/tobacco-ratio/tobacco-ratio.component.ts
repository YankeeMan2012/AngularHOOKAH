import {Component, OnInit, OnDestroy} from '@angular/core';
import {Storage} from '../../shared/storage.service'

declare const $: any;

interface IStrength {
    coefficient: number;
    domain_id: number;
    is_standart: number
    name: string;
    status: number;
    strength_id: number;
    selected: boolean;
}

interface IMethod {
    method: string;
    title: string;
    selected: boolean;
}

interface ITobacco {
    id: number;
    percent: number;
    bottom: number;
    brand: string;
    model: string;
    taste: string;
    price: number;
    showPercent: boolean;
}

@Component({
    selector: 'tobacco-ratio',
    templateUrl: './tobacco-ratio.component.html',
    styleUrls: ['./tobacco-ratio.component.scss']
})
export class TobaccoRatio implements OnInit, OnDestroy {

    private strengths: IStrength[];
    private methods: IMethod[] = [
        {
            method: 'layer',
            title: 'Слоями',
            selected: false
        },
        {
            method: 'sector',
            title: 'Секторами',
            selected: true
        },
        {
            method: 'mix',
            title: 'Микс',
            selected: false
        }
    ];
    private tobaccos: ITobacco[] = [];
    private priceCategories;

    constructor(private storage: Storage) {}

    ngOnInit() {
        let oldState = this.storage.getAppData('tobaccoRatio');
        if (oldState) {
            this.strengths = oldState.strengths;
            this.methods = oldState.methods;
            this.tobaccos = oldState.tobaccos;
        } else {
            this.priceCategories = this.storage.getData('priceCategory');
            this.strengths = this.storage.getData('tobaccoRatio');
            this.strengths.forEach((item) => {
                item['selected'] = item.is_standart == 1;
            });

            let tobaccoList = this.storage.getAppData('tobaccoListSection');
            tobaccoList.tobaccos.forEach((item) => {
                if (item.selected) {
                    let tData: ITobacco = {
                        id: item.tobacco_id,
                        percent: 0,
                        bottom: 0,
                        brand: item.br_name,
                        model: item.model,
                        taste: item.fl_name,
                        price: this.priceCategories[item.category_id].price,
                        showPercent: false
                    };
                    this.tobaccos.push(tData);
                }
            });
        }
        this.ratioSliderInit();
    }

    ngOnDestroy() {
        let state = {tobaccos: this.tobaccos, strengths: this.strengths, methods: this.methods};
        this.storage.setAppData('tobaccoRatio', state);
    }

    private strengthClick(strength: IStrength): void {
        this.strengths.forEach((item) => {
            item.selected = false;
        });
        strength.selected = true;
    }

    private methodClick(method: IMethod): void {
        this.methods.forEach((item) => {
            item.selected = false;
        });
        method.selected = true;
    }

    private ratioSliderInit(): void {
        let self = this;
        let array: number[] = [];
        if (this.tobaccos[0].percent) {
            let temp = 0;
            for (let i = 0; i < this.tobaccos.length; i++) {
                temp += this.tobaccos[i].percent;
                array.push(temp);
            }
        } else {
            let tL = this.tobaccos.length;
            switch (tL) {
                case 1: array = [100]; break;
                case 2: array = [50, 100]; break;
                case 3: array = [35, 70, 100]; break;
                case 4: array = [25, 50, 75, 100]; break;
                default: return;
            }
        }

        let range = $('.range');
        if (!range.length) return;
        if (range.hasClass('ui-slider')) range.slider('destroy');
        range.slider({
            orientation: "vertical",
            min: 0,
            max: 100,
            step: 5,
            values: array,
            start: function (event, ui) {
                self.showHidePercent(ui.handleIndex, true);
            },
            stop: function (event, ui) {
                self.showHidePercent(ui.handleIndex, false);
            },
            slide: function( event, ui ) {
                if (ui.handleIndex == ui.values.length - 1) {
                    event.preventDefault();
                    return;
                }
                let realVal = ui.value;
                let prev = ui.values[ui.handleIndex - 1] || 0;
                let next = ui.values[ui.handleIndex + 1] || 100;
                if (ui.value <= prev || ui.value < 5) {
                    event.preventDefault();
                    realVal = prev + 5;
                } else if (ui.value >= next) {
                    event.preventDefault();
                    realVal = next - 5;
                }
                let realArray = ui.values;
                realArray[ui.handleIndex] = realVal;
                self.buildRatio(realArray);
            },
            create: function ( event ) {
                $(event.target).find('span').html('<span class="ui-point"></span>');
            }
        });
        this.buildRatio(array);
    }

    private buildRatio(arr): void {
        this.tobaccos.forEach((item, i) => {
            let prev = arr[i-1] || 0;
            item.percent = arr[i] - prev;
            item.bottom = prev;
        });
    }

    private showHidePercent(index, isShowPercent): void {
        this.tobaccos[index].showPercent = isShowPercent;
        this.tobaccos[index + 1].showPercent = isShowPercent;
    }

    private goBack() {
        history.back();
    }

}
