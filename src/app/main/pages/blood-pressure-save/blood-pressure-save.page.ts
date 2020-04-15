import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { take } from 'rxjs/operators';

import { OverlayService } from 'src/app/core/services/overlay.service';
import { BloodPressureService } from '../../services/blood-pressure.service';

@Component({
  selector: 'app-blood-pressure-save',
  templateUrl: './blood-pressure-save.page.html',
  styleUrls: ['./blood-pressure-save.page.scss'],
})
export class BloodPressureSavePage implements OnInit {
  formGroup: FormGroup;
  myDate: Date = new Date();
  pageTitle = '...';
  listId: string = undefined;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private route: ActivatedRoute,
    private service: BloodPressureService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.init();
  }

  init(): void {
    const listId = this.route.snapshot.paramMap.get('id');
    if (!listId) {
      this.pageTitle = 'blood-pressure.new';
      return;
    }
    this.listId = listId;
    this.pageTitle = 'blood-pressure.edit';
    this.service
      .get(listId)
      .pipe(take(1))
      .subscribe(({ date, valueMax, valueMin, heartRate }) => {
        this.formGroup.get('date').setValue(date);
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
      message: 'Saving...'
    });
    try {
      const list = !this.listId
        ? await this.service.create(this.formGroup.value)
        : await this.service.update({
            id: this.listId,
            ...this.formGroup.value
          });
      this.service.deleteFieldId(list.id);
      this.navCtrl.navigateBack('/bloodpressures');
    } catch (error) {
      console.log('Error saving Blood Pressure: ', error);
      await this.overlayService.toast({
        message: error.message
      });
    } finally {
      loading.dismiss();
    }
  }

  ionViewDidEnter(): void {
    this.formGroup.get('date').setValue(this.myDate);
  }

  changeDate(selectedValue: any): void {
    this.myDate = new Date(selectedValue);
  }
}
