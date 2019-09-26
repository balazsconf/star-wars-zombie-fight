import {moduleMetadata, storiesOf} from "@storybook/angular";
import {CharacterDetailsComponent} from "./character-details.component";
import {CommonModule} from "@angular/common";
import {characterDarthMaul, characterSebulba} from "../storybook.data";

const template = `
<div style="width: 200px;">
    <swzf-clients-character-details [character]=character [zombie]=zombie></swzf-clients-character-details>
</div>
`;


storiesOf('Presentation components/Character details', module)
    .addDecorator(
        moduleMetadata({
            declarations: [CharacterDetailsComponent],
            imports: [CommonModule]
        })
    )
    .add('Renegade view', () => ({
        template,
        props: {
            character: characterSebulba
        }
    }))
    .add('Zombie view', () => ({
        template,
        props: {
            character: characterDarthMaul,
            zombie: true
        }
    }))
;
