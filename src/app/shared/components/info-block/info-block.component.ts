import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

import { InfoMessage } from "../../enums/info-message";

@Component({
  selector: 'app-info-block',
  templateUrl: './info-block.component.html',
  styleUrls: ['./info-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoBlockComponent {
  @Input() message: InfoMessage = InfoMessage.Loading;

  constructor() { }
}
