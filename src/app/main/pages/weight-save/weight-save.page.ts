import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { BaseSavePage } from '../base-save.page';
import { TranslateService } from '@ngx-translate/core';
import { WeightService } from '../../services/weight.service';
import { Weight } from '../../models/weight.model';


@Component({
  selector: 'app-weight-save',
  templateUrl: './weight-save.page.html',
  styleUrls: ['../green.page.scss'],
})
export class WeightSavePage extends BaseSavePage<Weight> {

  constructor(
    protected fb: FormBuilder,
    protected navCtrl: NavController,
    protected overlayService: OverlayService,
    protected route: ActivatedRoute,
    protected service: WeightService,
    protected translate: TranslateService
  ) {
    super(fb, navCtrl, overlayService, service, translate, 'weight');
  }

  ngOnInit(): void {
    this.createForm();
    this.formGroup.addControl('value', this.fb.control('', [Validators.min(1), Validators.max(200)]));
    this.init(this.route.snapshot.paramMap.get('id'));
  }
}
