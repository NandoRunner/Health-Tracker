import { Component, Input, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

import { AuthService } from 'src/app/core/services/auth.service';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-logout-button',
  template: `
    <ion-buttons>
      <ion-button (click)="logout()">
        <ion-icon name="exit" slot="icon-only"></ion-icon>
      </ion-button>
    </ion-buttons>
  `
})
export class LogoutButtonComponent implements OnInit {
  @Input() menu: string;

  constructor(
    private authService: AuthService,
    private menuCtrl: MenuController,
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private translate: TranslateService
  ) {}

  async ngOnInit(): Promise<void> {
    if (!(await this.menuCtrl.isEnabled(this.menu))) {
      this.menuCtrl.enable(true, this.menu);
    }
  }

  async logout(): Promise<void> {
    
    await this.translate.get('login').subscribe(translation => {
  
      this.overlayService.alert({
        message: translation.logout,
        buttons: [
          {
            text: translation.yes,
            handler: async () => {
              await this.authService.logout();
              await this.menuCtrl.enable(false, this.menu);
              this.navCtrl.navigateRoot('/login');
            }
          },
          translation.no
        ]
      });
  });


  }
}
