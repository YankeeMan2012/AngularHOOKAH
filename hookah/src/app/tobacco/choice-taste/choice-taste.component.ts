import { Component, OnInit } from '@angular/core';

import { HttpService } from '../../shared/http.service'

interface ITaste {
    title: string;
    selected: boolean;
}

@Component({
  selector: 'choice-taste',
  templateUrl: 'choice-taste.component.html',
  styleUrls: ['choice-taste.component.scss']
})
export class ChoiceTaste implements OnInit {
    
    private isSelectedTaste: boolean = false;
    
    private tastes: ITaste[] = [
        {
            title: 'Сладкий',
            selected: false
        },
        {
            title: 'Горький',
            selected: false
        }
    ];
    
    constructor(private httpService: HttpService) {}

    ngOnInit() {
        // this.tastes = ['Какой то', 'Сладкий', 'Кислый', 'Горький'];
        // this.httpService.getData('http://lviv23.hookah.loc/choice-taste?get-data-as=json').subscribe(
        //     data => {
        //         console.log(data);
        //         // this.mixes = !!Object.keys(data.mixes).length;
        //     }
        // );
    }

    private isSelected(): void {
        this.isSelectedTaste = false;
        this.tastes.forEach((item: ITaste) => {
            if (item.selected) this.isSelectedTaste = true;
        })
    }
    
    private choiceTaste(taste: ITaste): void {
        taste.selected = !taste.selected;
        this.isSelected();
    }
    

}
