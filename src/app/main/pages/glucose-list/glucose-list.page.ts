import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { BaseListPage } from '../base-list.page';
import { GlucoseService } from '../../services/glucose.service';
import { Glucose } from '../../models/glucose.model';

@Component({
  selector: 'app-glucose-list',
  templateUrl: './glucose-list.page.html',
  styleUrls: ['../orange.page.scss']
})
export class GlucoseListPage extends BaseListPage<Glucose> {

  constructor(
    protected navCtrl: NavController,
    protected overlayService: OverlayService,
    protected service: GlucoseService
  ) {
    super(navCtrl, overlayService, service, "glucose");
  }
}