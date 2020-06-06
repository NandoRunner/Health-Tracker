import { Component  } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { BaseSavePage } from '../base-save.page';
import { TranslateService } from '@ngx-translate/core';
import { BloodPressureService } from '../../services/blood-pressure.service';
import { BloodPressure } from '../../models/bloodpressure.model';

@Component({
  selector: 'app-blood-pressure-save',
  templateUrl: './blood-pressure-save.page.html',
  styleUrls: ['../blue.page.scss']
})
export class BloodPressureSavePage extends BaseSavePage<BloodPressure> {

  constructor(
    protected fb: FormBuilder,
    protected navCtrl: NavController,
    protected overlayService: OverlayService,
    protected route: ActivatedRoute,
    protected service: BloodPressureService,
    protected translate: TranslateService
  ) {
    super(fb, navCtrl, overlayService, service, translate, 'blood-pressure');
  }

  ngOnInit(): void {
    this.createForm();
    this.formGroup.addControl('value', this.fb.control('', [Validators.min(1), Validators.max(250)]));
    this.formGroup.addControl('value2', this.fb.control('', [Validators.min(1), Validators.max(150)]));
    this.formGroup.addControl('value3', this.fb.control('', [Validators.min(1), Validators.max(250)]));
    this.init(this.route.snapshot.paramMap.get('id'));
  }
}
