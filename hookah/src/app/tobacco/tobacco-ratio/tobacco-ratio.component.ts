import {Component, OnInit} from '@angular/core';
import {Storage} from '../../shared/storage.service'
import {tick} from "@angular/core/testing";

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
export class TobaccoRatio implements OnInit {

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
        console.log(this.tobaccos);
        this.ratioSliderInit();
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
        let tL = this.tobaccos.length;
        let array: number[];
        switch (tL) {
            case 1: array = [100]; break;
            case 2: array = [50, 100]; break;
            case 3: array = [35, 70, 100]; break;
            case 4: array = [25, 50, 75, 100]; break;
            default: return;
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
                var realVal = ui.value;
                var prev = ui.values[ui.handleIndex - 1] || 0;
                var next = ui.values[ui.handleIndex + 1] || 100;
                if (ui.value <= prev || ui.value < 5) {
                    event.preventDefault();
                    realVal = prev + 5;
                } else if (ui.value >= next) {
                    event.preventDefault();
                    realVal = next - 5;
                }
                var realArray = ui.values;
                realArray[ui.handleIndex] = realVal;
                self.buildRatio(realArray);
            },
            create: function ( event ) {
                var point = $(event.target).find('span').html('<span class="ui-point"></span>');
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


        // for (var i = 0; i < arr.length; i++) {
        //
        //     var iTobacco = tobacco.eq(i);
        //     var nameLength = iTobacco.find('.name').text().length;
        //     iTobacco.css({height: arr[i] - prev + '%', bottom: prev + '%'});
        //     iTobacco.find('.percentValue span').text(arr[i] - prev);
        //     if (arr[i] - prev === 5 && nameLength > 16) {
        //         iTobacco.find('.brand').hide();
        //     } else {
        //         iTobacco.find('.brand').show();
        //     }
        //     ORDER.tobacco[iTobacco.attr('_id')] = arr[i] - prev;
        // }
    }
    private showHidePercent(index, isShowPercent): void {
        console.log(isShowPercent);
        this.tobaccos[index].showPercent = isShowPercent;
        this.tobaccos[index + 1].showPercent = isShowPercent;
        // console.log(index);
        // var activeTobacco = tobacco.eq(index).add(tobacco.eq(index + 1));
        // var percentValue = activeTobacco.find('.percentValue');
        // var name = activeTobacco.find('.name');
        // if (isShowPercent) {
        //     percentValue.show();
        //     name.hide();
        // } else {
        //     percentValue.hide();
        //     name.show();
        // }
    }

}
