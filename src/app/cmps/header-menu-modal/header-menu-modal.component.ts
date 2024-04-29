import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from 'src/app/services/translation.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'header-menu-modal',
  templateUrl: './header-menu-modal.component.html',
  styleUrls: ['./header-menu-modal.component.scss']
})
export class HeaderMenuModalComponent {

  @Output() onToggleHeaderMenuModal = new EventEmitter()
  @Output() toggleLanguageModal = new EventEmitter()
  @Input() isOpenLanguageModal!: boolean
  @Input() isOpenFooter!: boolean

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private translationService: TranslationService) { }

  onToggleLanguageModal() {
    this.toggleLanguageModal.emit()
    this.toggleMenuModal()
  }

  isLoggedInUser() {
    return this.userService.getUser() !== null
  }

  toggleMenuModal() {
    this.onToggleHeaderMenuModal.emit()
  }

  onLogout() {
    this.userService.logout()
    this.toggleMenuModal()
  }

  onNavigateToHost() {
    if (!this.userService.getUser()) this.snackBar.open('Please login first', 'Close', { duration: 3000 })
    else this.router.navigate(['/user/edit'])
  }

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }
}
