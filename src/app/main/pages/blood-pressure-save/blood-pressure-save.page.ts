import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { take } from 'rxjs/operators';

import { OverlayService } from 'src/app/core/services/overlay.service';
import { BloodPressureService } from '../../services/blood-pressure.service';
import { PageModel } from '../../models/page.model';

@Component({
  selector: 'app-blood-pressure-save',
  templateUrl: './blood-pressure-save.page.html',
  styleUrls: ['./blood-pressure-save.page.scss'],
})
export class BloodPressureSavePage implements OnInit {
  myDate: Date = new Date();
  pageTitle = '...';
  formGroup: FormGroup;
  protected page: PageModel = new PageModel();
  private baseId: string = undefined;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private route: ActivatedRoute,
    private service: BloodPressureService
  ) {
    this.page.titleNew = 'blood-pressure.new';
    this.page.titleEdit = 'blood-pressure.edit';
    this.page.saving = 'Saving...';
    this.page.error = 'Error saving Blood Pressure: ';
    this.page.navBack = '/bloodpressures';
  }

  ngOnInit(): void {
    this.createForm();
    this.init();
  }

  init(): void {
    const itemId = this.route.snapshot.paramMap.get('id');
    if (!itemId) {
      this.pageTitle = 'blood-pressure.new';
      return;
    }
    this.baseId = itemId;
    this.pageTitle = 'blood-pressure.edit';
    this.service
      .get(itemId)
      .pipe(take(1))
      .subscribe(({ date, valueMax, valueMin, heartRate }) => {
        this.formGroup.get('id').setValue(itemId);
        this.formGroup.get('date').setValue(date.toDate().toISOString());
        this.formGroup.get('valueMax').setValue(valueMax);
        this.formGroup.get('valueMin').setValue(valueMin);
        this.formGroup.get('heartRate').setValue(heartRate);
      });
  }

  private createForm(): void {
    this.formGroup = this.fb.group({
      id: [''],
      date: ['', [Validators.required]],
      valueMax: ['', [Validators.required, Validators.min(1), Validators.max(25)]],
      valueMin: ['', [Validators.required, Validators.min(1), Validators.max(15)]],
      heartRate: ['', [Validators.required, Validators.min(1), Validators.max(220)]]
    });
  }

  async onSubmit(): Promise<void> {
    this.formGroup.get('date').setValue(this.myDate);

    const loading = await this.overlayService.loading({
      message: this.page.saving
    });
    try {
      const item = !this.baseId
        ? await this.service.create(this.formGroup.value)
        : await this.service.update({
            id: this.baseId,
            ...this.formGroup.value
          });
      this.service.deleteFieldId(item.id);
      this.navCtrl.navigateBack(this.page.navBack);
    } catch (error) {
      console.log(this.page.error, error);
      await this.overlayService.toast({
        message: error.message
      });
    } finally {
      loading.dismiss();
    }
  }

  ionViewDidEnter(): void {
    this.formGroup.get('date').setValue(this.myDate.toISOString());
  }

  changeDate(selectedValue: any): void {
    this.myDate = new Date(selectedValue);
  }
}
