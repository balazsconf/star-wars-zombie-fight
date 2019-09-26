import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {BattlefieldComponent} from "./battlefield/battlefield.component";
import {PresentationComponentsModule} from "@swzf-clients/presentation-components";
import {FadingIntroComponent} from "./fading-intro/fading-intro.component";
import {FinaleComponent} from './finale/finale.component';
import { SwzfUiComponent } from './swzf-ui/swzf-ui.component';

const routes: Routes = [
    {
        path: '',
        component: SwzfUiComponent,
        children: [
            {
                path: 'intro',
                component: FadingIntroComponent
            },
            {
                path: 'fight',
                component: BattlefieldComponent

            },
            {
                path: 'gameover',
                component: FinaleComponent

            },
            {path: '**', redirectTo: 'intro', pathMatch: 'full'}
        ]
    },
    {path: '**', redirectTo: 'intro', pathMatch: 'full'}
];

@NgModule({
    imports: [CommonModule, RouterModule.forRoot(routes), PresentationComponentsModule],
    exports: [
        SwzfUiComponent
    ],
    declarations: [BattlefieldComponent, FadingIntroComponent, FinaleComponent, SwzfUiComponent]
})
export class SwzfUiModule {
}
