import { Component } from '@angular/core';

@Component({
  selector: 'app-who-choice-bowl',
  templateUrl: './who-choice-bowl.component.html',
})
export class WhoChoiceBowl {
    private goBack(): void {
        history.back();
    }
}
