import {moduleMetadata, storiesOf} from '@storybook/angular';
import {CharacterBoxComponent} from "./character-box.component";
import {CommonModule} from "@angular/common";

storiesOf('CharacterBox', module)
  .addDecorator(
    moduleMetadata({
      declarations: [],
      imports: [CommonModule]
    })
  )
  .add('Regular view', () => ({
      component: CharacterBoxComponent,
      props: {
          name: 'Mace Winduu',
          imageUrl: 'https://vignette.wikia.nocookie.net/starwars/images/f/fc/Mace_Windu.jpg/revision/latest?cb=20071230055326'
      }
    })
  )
  // .add('From template', () => ({
  //     template: 'a<swzf-clients-character-box></swzf-clients-character-box>A'
  //   })
  // )
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
