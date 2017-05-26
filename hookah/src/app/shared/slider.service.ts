import {Injectable} from '@angular/core';

declare const $: any;
declare const glide: any;

@Injectable()
export class Slider {

    constructor() {
    }

    public glideInit(container: string): boolean {
        let slider = null;
        $(container).each(function () {
            slider = $(this).glide({
                type: "slider",
                autoplay: false,
                paddings: 80,
                touchDistance: 20
            });
            if ($(this).find('.js-slide').length === 1) {
                $(this).find('.js-slide-wrap, .js-slide').css({width: '100%'});
            }
        });
        return !!slider;
    }

    public glideDestroy(containers: string) {
        $(containers).each(function () {
            $(this).data('glide_api').destroy();
        });
    }

    public glideSwitchTile(containers: string, tile: boolean): void {
        if (tile) {
            $(containers).each(function () {
                $(this).data('glide_api').destroy();
            });
        } else {
            this.glideInit(containers);
        }
    }

}
