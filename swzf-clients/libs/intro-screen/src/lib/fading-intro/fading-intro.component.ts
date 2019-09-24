import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, timer} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'swzf-clients-fading-intro',
  templateUrl: './fading-intro.component.html',
  styleUrls: ['./fading-intro.component.scss']
})
export class FadingIntroComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor(private router: Router) { }

  ngOnInit() {
    this.subscription = timer(30000,1).subscribe( () => {
        this.router.navigate(['fight']);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
