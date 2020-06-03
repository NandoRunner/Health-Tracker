import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { BaseSavePage } from '../base-save.page';
import { TranslateService } from '@ngx-translate/core';
import { GlucoseService } from '../../services/glucose.service';
import { Glucose } from '../../models/glucose.model';

@Component({
  selector: 'app-glucose-save',
  templateUrl: './glucose-save.page.html',
  styleUrls: ['../orange.page.scss'],
})

export class GlucoseSavePage extends BaseSavePage<Glucose> {

  constructor(
    protected fb: FormBuilder,
    protected navCtrl: NavController,
    protected overlayService: OverlayService,
    protected route: ActivatedRoute,
    protected service: GlucoseService,
    protected translate: TranslateService
  ) {
    super(fb, navCtrl, overlayService, service, translate, 'glucose');
  }

  ngOnInit(): void {
    this.createForm();
    this.formGroup.addControl('value', this.fb.control('', [Validators.min(1), Validators.max(600)]));
    this.formGroup.addControl('value2', this.fb.control('', [Validators.min(1), Validators.max(16)]));
    this.init(this.route.snapshot.paramMap.get('id'));
  }
}
