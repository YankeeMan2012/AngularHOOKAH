import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../shared/http.service";
import {Storage} from "../../shared/storage.service";
import {Router} from "@angular/router";

@Component({
    selector: 'who-choice-hookah',
    templateUrl: './who-choice-hookah.component.html',
})
export class WhoChoiceHookah implements OnInit {

    private bowl;

    constructor(private router: Router, private httpService: HttpService, private storage: Storage) {
    }

    ngOnInit() {
        this.bowl = this.storage.getAppData('bowl');
    }

    private getHookahs() {
        this.httpService.getData(`http://lviv23.hookah.loc/choice-hookah/${this.bowl.selected.item_id || 0}?get-data-as=json`).subscribe(
            data => {
                console.log(data);
                this.storage.setData('hookah', data);
                this.router.navigate(['/choice-hookah']);
            }
        );
    }

    private goBack() {
        history.back();
    }

}
