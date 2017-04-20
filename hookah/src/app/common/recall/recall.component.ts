import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { HttpService } from '../../shared/http.service'

interface IReview {
    date_added: string;
    domain_id: string;
    rating: string;
    review_id: string;
    status: string;
    text: string;
    user_name: string;
    stars: boolean[];
}

@Component({
    selector: 'recall',
    templateUrl: 'recall.component.html',
    styleUrls: ['recall.component.scss'],
    providers: [HttpService]
})
export class Recall implements OnInit {

    private reviews: IReview[] = [];
    
    constructor(private router: Router, private httpService: HttpService) {}

    ngOnInit() {
        this.httpService.getData('http://lviv23.hookah.loc/recall?get-data-as=json').subscribe(
            data => {
                this.reviews = data.reviews;
                for (let key in data.reviews) {
                    this.reviews[key].stars = [];
                    let rating = parseInt(data.reviews[key].rating);
                    for (let i = 1; i < 6; i++) {
                        this.reviews[key].stars.push(i <= rating);
                    }
                }
            }
        );
    }
}