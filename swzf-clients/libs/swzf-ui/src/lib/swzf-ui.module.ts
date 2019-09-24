import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FightScreenModule} from "@swzf-clients/fight-screen";

const routes: Routes = [
  {
    path: 'intro',
    loadChildren: () => import('@swzf-clients/intro-screen').then(mod => mod.IntroScreenModule)
  },
  {
    path: 'fight',
    loadChildren: () => import('@swzf-clients/fight-screen').then(mod => FightScreenModule)

  },
  { path: '**', redirectTo: 'intro', pathMatch: 'full' }
];

@NgModule({
  imports: [CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class SwzfUiModule {}
