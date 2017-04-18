import { Component } from '@angular/core'
import { Router } from '@angular/router'

import { HttpService } from '../../shared/http.service'

interface ICall {
    title: string;
    reason: string;
}

const reasons: ICall[] = [
    {
        title: 'Попросить счёт',
        reason: 'invoice'
    },
    {
        title: 'Заменить уголь',
        reason: 'charcoal'
    },
    {
        title: 'Другая причина',
        reason: 'other'
    },
];

@Component({
    selector: 'call-reason',
    templateUrl: 'call-reason.component.html',
    styleUrls: ['call-reason.component.css'],
    providers: [HttpService]
})
export class CallReason {
    
    reasons: ICall[] = reasons;

    constructor(private router: Router, private httpService: HttpService) {}

    private callHookahMan(reason): void {
        console.log(reason);
        this.router.navigate(['/home']);
    }


    // ngOnInit() {
    //     this.httpService.getData('http://lviv23.hookah.loc/home?get-data-as=json').subscribe(
    //         data => {
    //             // this.home = data;
    //             // console.log(data);
    //         }
    //     );
    // }

    // this.router.navigate(['/home']);

}