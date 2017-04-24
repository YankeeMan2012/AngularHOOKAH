import { Component, OnInit } from '@angular/core';
import { HttpService } from './shared/http.service'
import { Router } from '@angular/router'
import { Handler } from './shared/handler.service'

interface IMessage {
    title: string;
    show: boolean;
}

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

    private message: IMessage = {
        title: '',
        show: false
    };

    constructor(private httpService: HttpService, private router: Router, private handler: Handler) {
        handler.onMessage.subscribe(
            msg => {
                this.showMsg(msg);
            }
        )
    }

    private showMsg(msg): void {
        this.message.title = msg;
        this.message.show = true;
    }

    private animatePreloader(): void {
        let interval = setInterval(() => {
            this.animate = true;
            this.percent++;
            if(this.percent >= 100) {
                clearInterval(interval);
                this.isLoad = true;
            }
        }, 30);
    }

    ngOnInit() {
        // this.router.navigate(['/']);
        this.animatePreloader();
        this.httpService.getStaticAppData();
    }
}
