import { Component, OnInit } from '@angular/core';
import { HttpService } from './shared/http.service'
import { Router } from '@angular/router'

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

    private showInfo: boolean = true;

    constructor(private httpService: HttpService, private router: Router) {}

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
        this.router.navigate(['/']);
        this.animatePreloader();
        this.httpService.getStaticAppData();
    }

    private showInfoMsg(params) {
        console.log(111);
        console.log(params);
    }
}
