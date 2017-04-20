import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { HttpService } from '../../shared/http.service'

interface IArticles {
    article_id: string;
    create_time: string;
    image: string;
    text: string;
    title: string;
    update_time: string;
    isOpen: boolean
}

@Component({
    selector: 'article',
    templateUrl: 'article.component.html',
    styleUrls: ['article.component.scss'],
    providers: [HttpService]
})
export class Article implements OnInit {

    private articles: IArticles[] = [];

    constructor(private router: Router, private httpService: HttpService) {}

    private read(article: IArticles): void {
        article.isOpen = !article.isOpen;
    }


    ngOnInit() {
        this.httpService.getData('http://lviv23.hookah.loc/article?get-data-as=json').subscribe(
            data => {
                this.articles = data.articles;
                for (let key in this.articles) {
                    this.articles[key].isOpen = false;
                    // this.articles[key].text = this.articles[key].text.replace('\n', '<br />')
                }
            }
        );
    }

    // this.router.navigate(['/home']);

}