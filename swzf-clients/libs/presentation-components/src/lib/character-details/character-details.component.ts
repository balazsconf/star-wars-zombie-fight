import {Component, HostBinding, Input} from '@angular/core';
import {People} from "@swzf-clients/model";

@Component({
    selector: 'swzf-clients-character-details',
    templateUrl: './character-details.component.html',
    styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent {

    @HostBinding('class.zombie') @Input() zombie = false;
    @Input() character: People;

    constructor() {
    }
}
