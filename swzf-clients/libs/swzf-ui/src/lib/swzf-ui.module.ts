import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderBodyLayoutComponent} from './header-body-layout/header-body-layout.component';
import {HeaderComponent} from './header/header.component';
import {RouterModule, Routes} from "@angular/router";
import {FightScreenModule} from "@swzf-clients/fight-screen";

const routes: Routes = [
  {
    path: 'intro',
    loadChildren: () => import('@swzf-clients/intro-screen').then(mod => mod.IntroScreenModule)
  },
  {
    path: 'fight',
    component: HeaderBodyLayoutComponent,
    loadChildren: () => import('@swzf-clients/fight-screen').then(mod => FightScreenModule)

  },
  { path: '**', redirectTo: 'intro', pathMatch: 'full' }
];

@NgModule({
  imports: [CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    HeaderBodyLayoutComponent
  ],
  declarations: [HeaderBodyLayoutComponent, HeaderComponent]
})
export class SwzfUiModule {}
