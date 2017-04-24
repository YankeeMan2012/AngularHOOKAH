import { Component, OnInit } from '@angular/core'

import { Storage } from '../../shared/storage.service'

interface IReview {
    date_added: string;
    domain_id: string;
    rating: string;
    review_id: string;
    status: string;
    text: string;
    user_name: string;
}

interface IStar {
    active: boolean;
    value: number;
}

@Component({
    selector: 'recall',
    templateUrl: 'recall.component.html',
    styleUrls: ['recall.component.scss'],
})
export class Recall implements OnInit {

    private reviews: IReview[] = [];
    private rating: IStar[] = [
        {
            active: false,
            value: 1
        },
        {
            active: false,
            value: 2
        },
        {
            active: false,
            value: 3
        },
        {
            active: false,
            value: 4
        },
        {
            active: true,
            value: 5
        },
    ];
    
    constructor(private storage: Storage) {}

    ngOnInit() {
        this.reviews = this.storage.getData('recall');
    }

    buildRating(star): void {
        this.rating.forEach((item) => {
            item.active = false;
        });
        star.active = true;
    }
}