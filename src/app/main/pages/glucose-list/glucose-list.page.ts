import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { OverlayService } from 'src/app/core/services/overlay.service';
import { GlucoseService } from '../../services/glucose.service';
import { Glucose } from '../../models/glucose.model';

@Component({
  selector: 'app-glucose-list',
  templateUrl: './glucose-list.page.html',
  styleUrls: ['./glucose-list.page.scss']
})
export class GlucoseListPage implements OnInit {
  public title: string;
  public language: string;

  lists$: Observable<Glucose[]>;

  constructor(
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private service: GlucoseService
  ) {}

  async ngOnInit(): Promise<void> {
    const loading = await this.overlayService.loading();
    this.lists$ = this.service.getAll();
    this.lists$.pipe(take(1)).subscribe(lists => loading.dismiss());
  }

  onUpdate(o: Glucose): void {
    this.navCtrl.navigateForward(['glucoses', 'edit', o.id]);
  }

  async onDelete(o: Glucose): Promise<void> {
    await this.overlayService.alert({
      message: `Do you really want to delete this Glucose "${o.value}" registry?`,
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            await this.service.delete(o);
            await this.overlayService.toast({
              message: `Glucose "${o.value}" registry deleted!`
            });
          }
        },
        'No'
      ]
    });
  }
}
