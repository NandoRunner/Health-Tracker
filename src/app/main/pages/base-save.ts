import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { PageModel } from '../models/page.model';
import { BaseService } from '../services/base.service';

export class BasePage implements OnInit {
    myDate: Date = new Date();
    pageTitle = '...';
    formGroup: FormGroup;
    protected page: PageModel = new PageModel();
    private baseId: string = undefined;
  
    constructor(
      protected fb: FormBuilder,
      protected navCtrl: NavController,
      protected overlayService: OverlayService,
      protected service: BaseService
    ) { }
  
    ngOnInit(): void { }
  
    protected init(itemId: any): void {
      
      if (!itemId) {
        this.pageTitle = this.page.titleNew;
        return;
      }
      this.baseId = itemId;
      this.pageTitle = this.page.titleEdit;
      this.service
        .get(itemId)
        .pipe(take(1))
        .subscribe(({ date, value }) => {
          this.formGroup.get('id').setValue(itemId);
          this.formGroup.get('date').setValue(date.toDate().toISOString());
          this.formGroup.get('value').setValue(value);
        });
    }
  
    protected createForm(): void {
      this.formGroup = this.fb.group({
        id: [''],
        date: ['', [Validators.required]],
        value: ['', [Validators.required, Validators.min(1), Validators.max(600)]]
      });
    }
  
    async onSubmit(): Promise<void> {
      
      this.formGroup.get('date').setValue(this.myDate);

      const loading = await this.overlayService.loading({
        message: this.page.saving
      });
      try {
        const list = !this.baseId
          ? await this.service.create(this.formGroup.value)
          : await this.service.update({
              id: this.baseId,
              ...this.formGroup.value
            });
        this.service.deleteFieldId(list.id);
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
  