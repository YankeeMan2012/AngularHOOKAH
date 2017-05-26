import {Component} from '@angular/core';

@Component({
    selector: 'who-choice-bowl',
    templateUrl: './who-choice-filler.component.html',
})
export class WhoChoiceFiller {

    private goBack(): void {
        history.back();
    }
}
