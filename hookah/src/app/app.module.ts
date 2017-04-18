import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ChoiceTable } from './common/choice-table/choice-table.component';
import { Home } from './common/home/home.component';
import { NotFound } from './common/not-found/not-found.component';
import { CallReason } from "./common/call-reason/call-reason.component";
import { Recall } from "./common/recall/recall.component";
import { Article } from "./common/article/article.component";
import { WhoChoiceTobacco } from "./tobacco/who-choice-tobacco/who-choice-tobacco.component";
import { ChoiceTaste } from './tobacco/choice-taste/choice-taste.component';

import { HttpService } from './shared/http.service';
import { PriceCategory } from './tobacco/price-category/price-category.component';
import { FilterTobacco } from './tobacco/filter-tobacco/filter-tobacco.component';
import { WhoChoiceBowl } from './bowl/who-choice-bowl/who-choice-bowl.component';

const appRoutes: Routes = [
    { path: '', component: ChoiceTable },
    { path: 'home', component: Home },
    { path: 'call-reason', component: CallReason },
    { path: 'recall', component: Recall },
    { path: 'article', component: Article },
    { path: 'who-choice-tobacco', component: WhoChoiceTobacco },
    { path: 'choice-taste', component: ChoiceTaste },
    { path: 'price-category', component: PriceCategory },
    { path: 'filter-tobacco', component: FilterTobacco },
    { path: 'who-choice-bowl', component: WhoChoiceBowl },
    { path: '**', component: NotFound }
];

@NgModule({
  declarations: [
    AppComponent,
    NotFound,
    ChoiceTable,
    Home,
    CallReason,
    Recall,
    Article,
    WhoChoiceTobacco,
    ChoiceTaste,
    PriceCategory,
    WhoChoiceBowl,
    FilterTobacco
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
