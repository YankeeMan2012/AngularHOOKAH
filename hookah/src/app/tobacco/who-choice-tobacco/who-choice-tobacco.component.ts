import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { HttpService } from '../../shared/http.service'


@Component({
    selector: 'who-choice-tobacco',
    templateUrl: 'who-choice-tobacco.component.html',
    styleUrls: ['who-choice-tobacco.component.css'],
    providers: [HttpService]
})
export class WhoChoiceTobacco implements OnInit {

    private mixes: boolean = false;
    
    constructor(private router: Router, private httpService: HttpService) {}


    ngOnInit() {
        this.httpService.getData('http://lviv23.hookah.loc/who-choice-tobacco?get-data-as=json').subscribe(
            data => {
                this.mixes = !!Object.keys(data.mixes).length;
            }
        );
    }

    // this.router.navigate(['/home']);

}