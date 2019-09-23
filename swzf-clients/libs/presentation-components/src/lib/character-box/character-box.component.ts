import {ChangeDetectionStrategy, Component, HostBinding, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeStyle} from "@angular/platform-browser";

@Component({
    selector: 'swzf-clients-character-box',
    templateUrl: './character-box.component.html',
    styleUrls: ['./character-box.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterBoxComponent implements OnInit {

    @HostBinding('style.background-image')
    public backgroundImage: SafeStyle;

    @Input() name: string;

    @Input() set imageUrl(imageUrl) {
        const backgroundImage = `url('${imageUrl}')`;
        this.backgroundImage = this.sanitizer.bypassSecurityTrustStyle(backgroundImage);
    }

    constructor(private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
    }

}
