import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { BaseListPage } from '../base-list.page';
import { WeightService } from '../../services/weight.service';
import { Weight } from '../../models/weight.model';

@Component({
  selector: 'app-weight-list',
  templateUrl: './weight-list.page.html',
  styleUrls: ['../green.page.scss'],
})
export class WeightListPage extends BaseListPage<Weight> {

  constructor(
    protected navCtrl: NavController,
    protected overlayService: OverlayService,
    protected service: WeightService
  ) {
    super(navCtrl, overlayService, service, "weight");
  }
}