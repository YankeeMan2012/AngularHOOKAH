import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    // private isLoad: boolean = false;
    private isLoad: boolean = true; // false - Чтобы включить прелоадер
    private animate: boolean = false;
    private percent: number = 0;

    private animatePreloader() {
        var interval = setInterval(() => {
            this.animate = true;
            this.percent++;
            if(this.percent >= 100) {
                clearInterval(interval);
                this.isLoad = true;
            }
        }, 30);
    }

    ngOnInit() {
        this.animatePreloader();
    }
}
