import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { BaseListPage } from '../base-list.page';
import { BloodPressure } from '../../models/bloodpressure.model';
import { BloodPressureService } from '../../services/blood-pressure.service';


@Component({
  selector: 'app-blood-pressure-list',
  templateUrl: './blood-pressure-list.page.html',
  styleUrls: ['../blue.page.scss'],
})
export class BloodPressureListPage extends BaseListPage<BloodPressure> {

  constructor(
    protected navCtrl: NavController,
    protected overlayService: OverlayService,
    protected service: BloodPressureService
  ) {
    super(navCtrl, overlayService, service, 'blood-pressure');
  }
}
