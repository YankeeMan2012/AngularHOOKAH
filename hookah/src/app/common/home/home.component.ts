import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

// import { HttpService } from '../../shared/http.service'
import { Storage } from '../../shared/storage.service'

declare const Swiper: any;
declare const $: any;

interface IHome {
    bar_enabled: boolean,
    empty: string,
    enableReviews: string,
    hookah_bar: string
}

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
    // providers: [HttpService]
})
export class Home implements OnInit {
    
    showSlider: boolean = false;
    
    userId: boolean = false;
    checkHookahMan: boolean = true;
    demoDomain: boolean = true;
    
    
    home: IHome = {
        bar_enabled: false,
        empty: '',
        enableReviews: '1',
        hookah_bar: ''
    };
    
    menu = {
        hookah: {
            href: this.home.empty ? '/empty-stuff' : '/who-choice-tobacco',
            down: false,
        },
        call: {
            href: '/call-reason',
            down: false,
        },
        bar: {
            href: '/bar',
            down: false,
        },
        recall: {
            href: '/recall',
            down: false,
        },
        article: {
            href: '/article',
            down: false,
        }
    };

    // constructor(private router: Router, private httpService: HttpService) {}
    constructor(private router: Router, private storage: Storage) {}

    private sliderInit(): void {
        new Swiper('.main-swiper', {
            pagination: '.swiper-pagination',
            slidesPerView: 1.4,
            centeredSlides: true,
            paginationClickable: true,
            spaceBetween: 20
        });
        setTimeout(() => {
            this.showSlider = true;
        }, 300);
    }

    ngOnInit() {
        this.home = this.storage.getData('home');
        setTimeout(() => {
            this.sliderInit();
        }, 0);

        // this.httpService.getData('http://lviv23.hookah.loc/home?get-data-as=json').subscribe(
        //     data => {
        //         this.home = data;
        //         setTimeout(() => {
        //             this.sliderInit();
        //         }, 0);
        //     }
        // );
    }

}