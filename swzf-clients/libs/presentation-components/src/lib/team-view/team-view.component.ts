import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {People} from "@swzf-clients/model";

@Component({
    selector: 'swzf-clients-team-view',
    templateUrl: './team-view.component.html',
    styleUrls: ['./team-view.component.scss'],
    changeDetection:  ChangeDetectionStrategy.OnPush
})
export class TeamViewComponent implements OnInit, OnChanges {

    @Input() characters: People[];

    @Input() zombies = false;

    @Input() selected: People;

    @Output() selectCharacter = new EventEmitter<People>();

    constructor() {}

    ngOnInit() {}

    ngOnChanges() {
        if ( this.zombies && (!this.selected || this.isSelectedCharacterDead()) ) {
            this.selectRandomCharacter();
        }
    }

    isSelectedCharacterDead() {
        return (this.selected && this.selected.dead === true);
    }

    getLiveCharacters(characters): People[] {
        const liveCharacters: People[] = [];
        for ( const character of this.characters) {
            if ( character.dead !== true ) {
                liveCharacters.push(character);
            }
        }
        return liveCharacters;
    }

    selectRandomCharacter() {
        if(this.characters && this.characters.length) {
            const liveCharacters = this.getLiveCharacters(this.characters);
            if ( liveCharacters.length ) {
                const randomIndex = Math.floor(Math.random() * liveCharacters.length);
                this.selectCharacter.emit(this.characters[randomIndex]);
            }
        }
    }

    onSelectCharacter(character: People) {
        this.selectCharacter.emit(character);
    }

}
