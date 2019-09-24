import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';
import {DomSanitizer, SafeStyle} from "@angular/platform-browser";

@Component({
    selector: 'swzf-clients-character-box',
    templateUrl: './character-box.component.html',
    styleUrls: ['./character-box.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterBoxComponent {

    @HostBinding('style.background-image') backgroundImage: SafeStyle;
    @HostBinding('class.zombie') @Input() zombie = false;
    @HostBinding('class.selected') @Input() selected = false;

    @Input() name: string;

    @Input() set imageUrl(imageUrl) {
        const backgroundImage = `url('${imageUrl}')`;
        this.backgroundImage = this.sanitizer.bypassSecurityTrustStyle(backgroundImage);
    }

    constructor(private sanitizer: DomSanitizer) {
    }
}

