import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {BattlefieldComponent} from './battlefield/battlefield.component';
import {PresentationComponentsModule} from "@swzf-clients/presentation-components";

const routes: Routes = [
  {
    path: '',
    component: BattlefieldComponent
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), PresentationComponentsModule],
  declarations: [BattlefieldComponent]
})
export class FightScreenModule {}
