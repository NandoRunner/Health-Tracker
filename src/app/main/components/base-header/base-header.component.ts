import { Component,  Input } from '@angular/core';

@Component({
  selector: 'app-base-header',
  templateUrl: './base-header.component.html',
  styleUrls: ['./base-header.component.scss'],
})
export class BaseHeaderComponent {

  @Input() title: string;
  @Input() isSave: boolean;
  @Input() cssName: string;
}
