import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { GlucoseService } from '../../services/glucose.service';
import { BasePage } from '../base-save';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-glucose-save',
  templateUrl: './glucose-save.page.html',
  styleUrls: ['./glucose-save.page.scss'],
})

export class GlucoseSavePage extends BasePage {

  constructor(
    protected fb: FormBuilder,
    protected navCtrl: NavController,
    protected overlayService: OverlayService,
    protected route: ActivatedRoute,
    protected service: GlucoseService,
    protected translate: TranslateService
     ) {
       super(fb, navCtrl, overlayService, service);
       
       this.page.titleNew = 'glucose.new';
       this.page.titleEdit = 'glucose.edit';

       this.page.navBack = '/glucoses';
       
       this.translate.get('page').subscribe(translation => {
        this.page.error = translation.errorSaving;
        this.page.saving = translation.saving;
      });
     }

  ngOnInit(): void {
    this.createForm();
    this.init(this.route.snapshot.paramMap.get('id'));
  }
}
