import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { StayService } from 'src/app/services/stay.service';
import { UploadImgService } from 'src/app/services/upload-img.service';
import { UserService } from 'src/app/services/user.service';
import { TranslationService } from 'src/app/services/translation.service'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'edit-stay',
  templateUrl: './edit-stay.component.html',
  styleUrls: ['./edit-stay.component.scss']
})
export class EditStayComponent {
  constructor(private stayService: StayService,
    private uploadImgService: UploadImgService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private translationService: TranslationService,
    private snackBar: MatSnackBar,
    private http: HttpClient) { }

  @Input() user!: User
  stay = this.stayService.getEmptyStay()
  imgData = new Array(5).fill({ imgUrl: '', height: 500, width: 500 })
  selectSettings = {}
  amenities = this.Amenities
  labels = this.Labels

  async ngOnInit () {
    this.selectSettings = this.Settings
    const stayId = this.route.snapshot.paramMap.get('id')
    if (stayId) this.loadStay(stayId)
    this.cargarIdioma();

    
  }

  async loadStay (stayId: string) {
    try {
      this.stay = await lastValueFrom(this.stayService.getById(stayId)) as any
      this.loadImg()
    } catch (err) {
      console.log(err)
    }
  }

  loadImg (): void {
    this.imgData = this.imgData.map((_, idx) => {
      return { imgUrl: this.stay.imgUrls?.[idx], height: 500, width: 500 }
    })
  }

  async onAddStay () {
    const user = this.userService.getUser()
    const country = this.stay.loc.country
    const city = this.stay.loc.city
    const address = this.stay.loc.address
    const fullAddress = `${address}, ${city}, ${country}`
    // this.stay.loc.address = address
    this.stay.host = { ...this.stay.host, _id: user._id, pictureUrl: user.imgUrl, fullname: user.fullname }
    if (!this.checkValidation()) return
    // this.stay.loc.address = `${address}, ${city}, ${country}`
    this.obtenerLatitudLongitud(fullAddress);
    try {
      await this.stayService.save(this.stay)
      this.snackBar.open('Stay saved successfully', 'Close', { duration: 3000 })
      this.router.navigate(['/user/stays'])
    } catch (err) {
      console.log(err)
    }
  }

  checkValidation () {
    const stay = this.stay
    if (stay.imgUrls.length < 5) {
      this.snackBar.open('You must add 5 images', 'Close', { duration: 3000 })
      return false
    }
    if (stay.capacity < 1) {
      this.snackBar.open('You must add at least 1 capacity', 'Close', { duration: 3000 })
      return false
    }
    if (stay.name === '') {
      this.snackBar.open('You must add stay name', 'Close', { duration: 3000 })
      return false
    }
    if (stay.price < 1) {
      this.snackBar.open('You must add valid price', 'Close', { duration: 3000 })
      return false
    }
    // if (!/^[a-zA-Z]{3,}$/.test(stay.loc.country)) {
    //   this.snackBar.open('You must add valid country', 'Close', { duration: 3000 })
    //   return false
    // }
    // if (!/^[a-zA-Z]{2,}$/.test(stay.loc.city)) {
    //   this.snackBar.open('You must add valid city', 'Close', { duration: 3000 })
    //   return false
    // }
    // if (!/^[a-zA-Z][a-zA-Z0-9\s]{2,}$/.test(stay.loc.address)) {
    //   this.snackBar.open('You must add valid address', 'Close', { duration: 3000 })
    //   return false
    // }
    return true
  }

  async uploadImg (ev: Event, index: number) {
    const { secure_url, height, width } = await this.uploadImgService.uploadImg(ev)
    this.imgData[index] = { imgUrl: secure_url, width, height }
    const imgUrl = this.imgData[index].imgUrl
    this.stay.imgUrls.push(imgUrl)
  }

  get Labels () {
    return [
      'OMG!',
      'Amazing views', ,
      'Trending',
      'Golfing',
      'Surfing',
      'Mansions',
      'Luxe',
      'Private rooms', ,
      'Lakefront', ,
      'Castles',
      'Tiny homes', ,
      'Islands',
      'Boats',
      'Creative spaces', ,
      'Beach',
      'Design',
    ]
  }

  get LabelEs () {
    return [
      '¡OMG!',
      'Vistas increíbles', ,
      'Tendencia',
      'Golf',
      'Surf',
      'Mansiones',
      'Luxe',
      'Habitaciones privadas', ,
      'Frente al lago', ,
      'Castillos',
      'Casas pequeñas', ,
      'Islas',
      'Barcos',
      'Espacios creativos', ,
      'Playa',
      'Diseño',
    ]
  }

  get Amenities () {
    return [
      '32" HDTV with Disney+, standard cable',
      "Wifi",
      "AC - split type ductless system",
      "Private outdoor pool - available all year, open 24 hours, lap pool",
      "Kitchen",
      "Free parking on premises",
      "Hot water",
      "Heating - split type ductless system",
      "Indoor fireplace: wood-burning",
      "Shampoo",
      "Hair dryer",
      "Hot water",
      "Backyard",
      "Pets allowed"
    ]
  }

  get AmenitiesEs () {
    return [
      '32" HDTV con Disney+, cable estándar',
      "Wifi",
      "AC - sistema de conductos sin conductos tipo split",
      "Piscina privada al aire libre - disponible todo el año, abierta las 24 horas, piscina de entrenamiento",
      "Cocina",
      "Aparcamiento gratuito en las instalaciones",
      "Agua caliente",
      "Calefacción - sistema de conductos sin conductos tipo split",
      "Chimenea interior: leña",
      "Champú",
      "Secador de pelo",
      "Agua caliente",
      "Patio trasero",
      "Se admiten mascotas"
    ]
  }

  get Settings () {
    return {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All'
    }
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

  obtenerLatitudLongitud(address: string) {
    this.http.get<any>(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURI(address)}`)
      .subscribe(
        (response) => {
          if (response && response.length > 0) {
            this.stay.loc.lat = response[0].lat;
            this.stay.loc.lan = response[0].lon;
          } else {
            console.log('No se encontró la ubicación.');
          }
        },
        (error) => {
          console.error('Error al obtener la latitud y longitud:', error);
        }
      );
  }


  onGetLocation(){
    const country = this.stay.loc.country
    const city = this.stay.loc.city
    const address = this.stay.loc.address
    const fullAddress = `${address}, ${city}, ${country}`
    this.obtenerLatitudLongitud(fullAddress);
    console.log(this.stay.loc);
  }

}
