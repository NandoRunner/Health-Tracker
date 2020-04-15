import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { OverlayService } from 'src/app/core/services/overlay.service';
import { WeightService } from '../../services/weight.service';
import { Weight } from '../../models/weight.model';

@Component({
  selector: 'app-weight-list',
  templateUrl: './weight-list.page.html',
  styleUrls: ['./weight-list.page.scss'],
})
export class WeightListPage implements OnInit {
  public title: string;
  public language: string;

  lists$: Observable<Weight[]>;

  constructor(
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private service: WeightService
  ) {}

  async ngOnInit(): Promise<void> {
    const loading = await this.overlayService.loading();
    this.lists$ = this.service.getAll();
    this.lists$.pipe(take(1)).subscribe(lists => loading.dismiss());
  }

  onUpdate(o: Weight): void {
    this.navCtrl.navigateForward(['weights', 'edit', o.id]);
  }

  async onDelete(o: Weight): Promise<void> {
    await this.overlayService.alert({
      message: `Do you really want to delete this Weight "${o.value}" registry?`,
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            await this.service.delete(o);
            await this.overlayService.toast({
              message: `Weight "${o.value}" registry deleted!`
            });
          }
        },
        'No'
      ]
    });
  }
}
