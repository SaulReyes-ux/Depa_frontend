import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Stay } from 'src/app/models/stay.model';
import { StayService } from 'src/app/services/stay.service';
import { UserService } from 'src/app/services/user.service';
import { TranslationService } from 'src/app/services/translation.service'

@Component({
  selector: 'user-wishlist',
  templateUrl: './user-wishlist.component.html',
  styleUrls: ['./user-wishlist.component.scss']
})
export class UserWishlistComponent implements OnInit, OnDestroy {
  private translationService!: TranslationService;
  amenities: any;
  Amenities: any;
  labels: any;
  Labels: any;
  AmenitiesEs: any;
  LabelEs: any;
  constructor(private stayService: StayService, private userService: UserService) { }
  stays !: Stay[]
  subscription!: Subscription

  ngOnInit(): void {
    this.subscription = this.stayService.stays$.subscribe(stays => this.stays = stays)
    this.loadStays()
  }

  loadStays() {
    const user = this.userService.getUser()
    const filter = this.stayService.getEmptyFilter()
    filter.likeByUser = user._id
    this.stayService.setFilter(filter)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }

  cargarIdioma(){
    switch(this.translationService.currentLang){
      case 'en':
        this.amenities = this.Amenities
        this.labels = this.Labels
        break;
      case 'es':
        this.amenities = this.AmenitiesEs
        this.labels = this.LabelEs
        break;
      default:
        this.amenities = this.Amenities
        this.labels = this.Labels
        break;
    }
  }

  cambiarIdioma(lang: string): void {
    this.cargarIdioma();
  }
}
