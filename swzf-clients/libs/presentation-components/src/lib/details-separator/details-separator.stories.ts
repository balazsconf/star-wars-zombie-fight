import {moduleMetadata, storiesOf} from "@storybook/angular";
import {DetailsSeparatorComponent} from "./details-separator.component";
import {CommonModule} from "@angular/common";

storiesOf('Presentation|Details separator', module)
    .addDecorator(
        moduleMetadata({
            declarations: [DetailsSeparatorComponent],
            imports: [CommonModule]
        })
    )
    .add('Standard view', () => ({
        template: '<swzf-clients-details-separator style="width: 100px; height: 100px;"></swzf-clients-details-separator>'
    }))
;
