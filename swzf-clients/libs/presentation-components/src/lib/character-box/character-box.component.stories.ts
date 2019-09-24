import {moduleMetadata, storiesOf} from '@storybook/angular';
import {CharacterBoxComponent} from "./character-box.component";
import {CommonModule} from "@angular/common";

const props = {
    name: 'Mace Windu',
    imageUrl: 'https://vignette.wikia.nocookie.net/starwars/images/f/fc/Mace_Windu.jpg/revision/latest?cb=20071230055326'
};

const template = `<swzf-clients-character-box 
    [name]="name"
    [imageUrl]="imageUrl"
    [selected]="selected"
    [zombie]="zombie"></swzf-clients-character-box>`;

storiesOf('CharacterBox', module)
    .addDecorator(
        moduleMetadata({
            declarations: [CharacterBoxComponent],
            imports: [CommonModule]
        })
    )
    .add('Renegade view', () => ({
            component: CharacterBoxComponent,
            props: props
        })
    )
    .add('Selected renegade view', () => ({
            template,
            props: {
                ...props,
                selected: true
            }
        })
    )
    .add('Zombie view', () => ({
        template,
            props: {
                ...props,
                zombie: true
            }
        })
    )
    .add('Selected zombie view', () => ({
        template,
            props: {
                ...props,
                zombie: true,
                selected: true
            }
        })
    )
;




/*


<style>
    .myform {margin: 16px;}
    .myform-label {
        display: inline-block;
        width: 150px;
    }
    .myform-name {
        font-size: 18px;
        font-weight: bold;
    }
    sup {
        color: red;
    }
    label {
    margin-top: 10px;
    }
    input[type=reset], input[type=submit] {
        margin-right: 10px;
    }
    input[type=reset] {
        padding: 6px;
        font-size: 16px;
        background-color: lightgray;
    }
    input[type=submit] {
        padding: 6px;
        font-size: 16px;
        background-color: lightblue;
    }
    .legend {
        font-style: italic;
        color: gray;
    }
    .error {
        display: inline-block;
        padding-top: 10px;
        color: red;
    }
</style>

<div class="myform">
    <form>
        <span class="myform-name">Registration</span><br/>
        <span class="legend">Fields marked with <sup>*</sup> are mandatory</span><br/>
        <label class="myform-label">Full name:</label><input type="text" siize="20"><sup class="mandatory">*</sup><br/>
        <label class="myform-label">Login:</label><input type="text" size="12"><sup class="mandatory">*</sup><br/>
        <label class="myform-label">Password:</label><input type="password" size="16"><sup class="mandatory">*</sup><br/>
        <label class="myform-label">Re-type password:</label><input type="password" size="16"><sup class="mandatory">*</sup><br/>
        <label class="myform-label">E-mail address:</label><input type="password" size="32"><br/>
        <span class="error">Passwords don't match!</span><br/>
        <br/>
        <input type="reset">
        <input type="submit">
    </form>
</div>


 */
