import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/services/translation.service';

interface Language {
  language: string
  country: string
  isSuggested: boolean
  currLang: string
}

@Component({
  selector: 'language-modal',
  templateUrl: './language-modal.component.html',
  styleUrls: ['./language-modal.component.scss']
})
export class languageModalComponent {

  @Output() onToggleLanguageModal = new EventEmitter()
  constructor(private translateService: TranslateService,
    private translationService: TranslationService) {
    
  }

  languages = [
    { language: 'English', country: 'United States', isSuggested: true, currLang: 'en' },
    { language: 'Español', country: 'España', isSuggested: false, currLang: 'es' }
  ]

  get Suggested() {
    return this.languages.filter(language => language.isSuggested)
  }

  get UnSuggested() {
    return this.languages.filter(language => !language.isSuggested)
  }

  isActive(lang: Language) {
    return lang.currLang === this.translateService.currentLang
  }

  onSetLang(lang: Language) {
    // this.translateService.use(lang.currLang)
    this.translationService.setLanguage(lang.currLang)
    this.onCloseModal()
  }

  onCloseModal() {
    this.onToggleLanguageModal.emit()
  }

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }
}
