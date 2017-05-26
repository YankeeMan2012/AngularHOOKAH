import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {Routes, RouterModule} from '@angular/router';

import {HttpService} from './shared/http.service';
import {Storage} from './shared/storage.service';
import {Handler} from './shared/handler.service';

import {AppComponent} from './app.component';
import {ChoiceTable} from './common/choice-table/choice-table.component';
import {Home} from './common/home/home.component';
import {NotFound} from './common/not-found/not-found.component';
import {CallReason} from "./common/call-reason/call-reason.component";
import {Recall} from "./common/recall/recall.component";
import {Article} from "./common/article/article.component";
import {WhoChoiceTobacco} from "./tobacco/who-choice-tobacco/who-choice-tobacco.component";
import {ChoiceTaste} from './tobacco/choice-taste/choice-taste.component';
import {PriceCategory} from './tobacco/price-category/price-category.component';
import {FilterTobacco} from './tobacco/filter-tobacco/filter-tobacco.component';
import {TobaccoList} from './tobacco/tobacco-list/tobacco-list.component';
import {TobaccoRatio} from './tobacco/tobacco-ratio/tobacco-ratio.component';
import {TobaccoMixes} from './tobacco/tobacco-mixes/tobacco-mixes.component';
import {WhoChoiceBowl} from './bowl/who-choice-bowl/who-choice-bowl.component';
import {ChoiceBowl} from './bowl/choice-bowl/choice-bowl.component';
import {WhoChoiceBowlLid} from './bowl-lid/who-choice-bowl-lid/who-choice-bowl-lid.component';
import {ChoiceBowlLid} from './bowl-lid/choice-bowl-lid/choice-bowl-lid.component';
import {WhoChoiceHookah} from './hookah/who-choice-hookah/who-choice-hookah.component';
import {ChoiceHookah} from './hookah/choice-hookah/choice-hookah.component';
import {WhoChoiceFiller} from './filler/who-choice-filler/who-choice-filler.component';
import {ChoiceFiller} from './filler/choice-filler/choice-filler.component';
import {ChoiceServices} from './services/choice-services/choice-services.component';
import { WatchOrder } from './notification/watch-order/watch-order.component';

const appRoutes: Routes = [
    {path: '', component: ChoiceTable},
    {path: 'home', component: Home},
    {path: 'call-reason', component: CallReason},
    {path: 'recall', component: Recall},
    {path: 'article', component: Article},
    {path: 'who-choice-tobacco', component: WhoChoiceTobacco},
    {path: 'choice-taste', component: ChoiceTaste},
    {path: 'price-category', component: PriceCategory},
    {path: 'filter-tobacco', component: FilterTobacco},
    {path: 'tobacco-list', component: TobaccoList},
    {path: 'tobacco-ratio', component: TobaccoRatio},
    {path: 'tobacco-mixes', component: TobaccoMixes},
    {path: 'who-choice-bowl', component: WhoChoiceBowl},
    {path: 'choice-bowl', component: ChoiceBowl},
    {path: 'who-choice-bowl-lid', component: WhoChoiceBowlLid},
    {path: 'choice-bowl-lid', component: ChoiceBowlLid},
    {path: 'who-choice-hookah', component: WhoChoiceHookah},
    {path: 'choice-hookah', component: ChoiceHookah},
    {path: 'who-choice-filler', component: WhoChoiceFiller},
    {path: 'choice-filler', component: ChoiceFiller},
    {path: 'choice-services', component: ChoiceServices},
    {path: 'watch-order', component: WatchOrder},
    {path: '**', component: NotFound}
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
        FilterTobacco,
        TobaccoList,
        TobaccoRatio,
        ChoiceBowl,
        TobaccoMixes,
        WhoChoiceBowlLid,
        ChoiceBowlLid,
        WhoChoiceHookah,
        ChoiceHookah,
        WhoChoiceFiller,
        ChoiceFiller,
        ChoiceServices,
        WatchOrder
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [HttpService, Storage, Handler],
    bootstrap: [AppComponent]
})
export class AppModule {
}
