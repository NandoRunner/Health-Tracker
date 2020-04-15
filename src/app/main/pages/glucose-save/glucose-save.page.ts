import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { take } from 'rxjs/operators';

import { OverlayService } from 'src/app/core/services/overlay.service';
import { GlucoseService } from '../../services/glucose.service';

@Component({
  selector: 'app-glucose-save',
  templateUrl: './glucose-save.page.html',
  styleUrls: ['./glucose-save.page.scss'],
})
export class GlucoseSavePage implements OnInit {
  formGroup: FormGroup;
  myDate: Date = new Date();
  pageTitle = '...';
  listId: string = undefined;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private route: ActivatedRoute,
    private service: GlucoseService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.init();
  }

  init(): void {
    const listId = this.route.snapshot.paramMap.get('id');
    if (!listId) {
      this.pageTitle = 'glucose.new';
      return;
    }
    this.listId = listId;
    this.pageTitle = 'glucose.edit';
    this.service
      .get(listId)
      .pipe(take(1))
      .subscribe(({ date, value }) => {
        this.formGroup.get('date').setValue(date);
        this.formGroup.get('value').setValue(value);
      });
  }

  private createForm(): void {
    this.formGroup = this.fb.group({
      id: [''],
      date: ['', [Validators.required]],
      value: ['', [Validators.required, Validators.min(1), Validators.max(600)]]
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
      this.navCtrl.navigateBack('/glucoses');
    } catch (error) {
      console.log('Error saving Glucose: ', error);
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
