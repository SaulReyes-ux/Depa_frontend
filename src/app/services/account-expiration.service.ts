import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountExpirationService {
  private timerId: any;
  private countdownId: any;
  private readonly inactivityTime = 1 * 60 * 1000; // 1 min y 30 segundos de tiempo permitido de inactividad 
  private isCountdownShown = false;
  private inactivitySwalVisible = false;

  constructor(private user: UserService, private router: Router) { 
  }

  public init(): void {
    if (!this.user.isLogged()) {
      console.log('User is not logged in');
      return; // Si el usuario no ha iniciado sesión, no hagas nada
    }
    console.log('User is logged in');
    this.resetTimer();
    this.addActivityListeners();
  }

  private addActivityListeners(): void {
    // document.addEventListener('mousemove', () => {
    //   if (!this.isCountdownShown) {
    //     this.resetTimer();
    //   }
    // });
    // document.addEventListener('keypress', () => this.resetTimer());
  }

  public resetTimer(): void {
    clearTimeout(this.timerId);
    clearTimeout(this.countdownId);
    if (this.inactivitySwalVisible) { // Solo cierra SweetAlert si el de inactividad está visible
      Swal.close();
      this.inactivitySwalVisible = false; // Marca que el SweetAlert de inactividad ya no está visible
    }

    this.timerId = setTimeout(() => this.showCountdown(), this.inactivityTime);
  }

  private showCountdown(): void {
    let counter = 0.5 * 60; // 30 segundos countdown
    if (this.isCountdownShown) return;
    console.log('User is inactive');
    this.isCountdownShown = true;
    this.inactivitySwalVisible = true;
    Swal.fire({
      title: 'You are about to be logged out due to inactivity!',
      html: 'You will be signed out in <b></b> seconds.',
      timer: counter * 1000,
      didOpen: () => {
        Swal.showLoading();
        const content = Swal.getHtmlContainer();
        const b = content!.querySelector('b');
        this.countdownId = setInterval(() => {
          counter--;
          if (b) {
            b.textContent = String(counter);
          }
        }, 1000);
      },
      willClose: () => {
        clearInterval(this.countdownId);
        this.isCountdownShown = false;
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        this.user.logout();
        this.router.navigate(['/home']);
      }
    });
  }
}
