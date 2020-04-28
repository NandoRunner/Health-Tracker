import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { WeightService } from '../../services/weight.service';
import { BasePage } from '../base-save';

@Component({
  selector: 'app-weight-save',
  templateUrl: './weight-save.page.html',
  styleUrls: ['./weight-save.page.scss'],
})
export class WeightSavePage extends BasePage {

  constructor(
    protected fb: FormBuilder,
    protected navCtrl: NavController,
    protected overlayService: OverlayService,
    protected route: ActivatedRoute,
    protected service: WeightService
  ) {
       super(fb, navCtrl, overlayService, service);
       this.page.titleNew = 'weight.new';
       this.page.titleEdit = 'weight.edit';
       this.page.saving = 'Saving...';
       this.page.error = 'Error saving Weight: ';
       this.page.navBack = '/weights';
  }

  ngOnInit(): void {
    this.createForm();
    this.init(this.route.snapshot.paramMap.get('id'));
  }
}
