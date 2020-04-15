import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { OverlayService } from 'src/app/core/services/overlay.service';
import { BloodPressure } from '../../models/bloodpressure.model';
import { BloodPressureService } from '../../services/blood-pressure.service';


@Component({
  selector: 'app-blood-pressure-list',
  templateUrl: './blood-pressure-list.page.html',
  styleUrls: ['./blood-pressure-list.page.scss']
})
export class BloodPressureListPage implements OnInit {
  lists$: Observable<BloodPressure[]>;

  constructor(
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private service: BloodPressureService
  ) {}

  async ngOnInit(): Promise<void> {
    const loading = await this.overlayService.loading();
    this.lists$ = this.service.getAll();
    this.lists$.pipe(take(1)).subscribe(lists => loading.dismiss());
  }

  onUpdate(o: BloodPressure): void {
    this.navCtrl.navigateForward(['bloodpressures', 'edit', o.id]);
  }

  async onDelete(o: BloodPressure): Promise<void> {
    await this.overlayService.alert({
      message: `Do you really want to delete this BloodPressure "${o.date}" registry?`,
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            await this.service.delete(o);
            await this.overlayService.toast({
              message: `BloodPressure "${o.date}" registry deleted!`
            });
          }
        },
        'No'
      ]
    });
  }
}
