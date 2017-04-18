import { Component } from '@angular/core';

@Component({
  selector: 'app-who-choice-bowl',
  templateUrl: './who-choice-bowl.component.html',
  styleUrls: ['./who-choice-bowl.component.css']
})
export class WhoChoiceBowl {
    private back(): void {
        history.back();
    }
}
