import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Storage } from '@ionic/storage';

const LNG_KEY = 'SELECTED_LANGUAGE';

@Injectable({
  providedIn: 'root'
})

export class LanguageService {
  selected = '';
  constructor(private translate: TranslateService, public storage: Storage) {}

  async setInitialAppLanguage() {
    let language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);

    await this.storage.get(LNG_KEY).then(val => {
      if (val) {
        this.setLanguage(val);
        this.selected = val;
      }
    });
  }

  getLanguages() {
    return [
      { text: 'English', value: 'en', img: 'src/assets/imgs/en.png' },
      { text: 'Português', value: 'pt', img: 'src/assets/imgs/pt.png' }
    ];
  }
  async setLanguage(lng) {
    this.translate.use(lng);
    this.selected = lng;
    await this.storage.set(LNG_KEY, lng);
  }
}
