import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../shared/http.service";
import {Storage} from "../../shared/storage.service";
import {Router} from "@angular/router";

@Component({
    selector: 'who-choice-bowl-lid',
    templateUrl: './who-choice-bowl-lid.component.html',
})
export class WhoChoiceBowlLid implements OnInit {

    private bowl;
    private price: number = 0;

    constructor(private router: Router, private httpService: HttpService, private storage: Storage) {
    }

    ngOnInit() {
        this.bowl = this.storage.getAppData('bowl');

        let price = this.storage.getAppData('price');
        for (let key in price) {
            this.price += price[key];
        }

    }

    private getLids() {
        this.httpService.getData(`http://lviv23.hookah.loc/choice-bowl-lid/${this.bowl.selected.item_id || 0}?get-data-as=json`).subscribe(
            data => {
                this.storage.setData('bowl-lid', data);
                this.router.navigate(['/choice-bowl-lid']);
            }
        );
    }

    private goBack() {
        history.back();
    }

}
