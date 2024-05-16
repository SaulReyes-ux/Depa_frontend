import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { Stay, StayFilter } from 'src/app/models/stay.model';
import { StayService } from 'src/app/services/stay.service';
import { faList, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'stay-index',
  templateUrl: './stay-index.component.html',
  styleUrls: ['./stay-index.component.scss']
})
export class StayIndexComponent implements OnInit, OnDestroy {

  @ViewChild('elFooter') elFooter: any

  constructor(
    private stayService: StayService,
    public loader: LoaderService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  stays$ !: Observable<Stay[]> | null
  isShowScroller: boolean = false
  subscription!: Subscription
  isShowClearBtn: boolean = false
  stayLoadIndex: number = 1
  stayFullLength: number = 0
  isLoadStay: boolean = false
  subscriptionStayLength!: Subscription
  isShowMap:boolean = false
  listIcon = faList
  mapIcon = faMapLocationDot

  ngOnInit() {
    this.subscriptionStayLength = this.stayService.stayLength$.subscribe(stayLength => {
      this.stayFullLength = stayLength
      this.stayLoadIndex = 1
    })

    this.loader.setLoading(true)
    this.setFilterFromParams().then(() => {
      this.loader.setLoading(false)
      this.stays$ = this.stayService.stays$
    })

    window.addEventListener('scroll', () => this.onScroll())
    this.subscription = this.stayService.stayFilter$.subscribe(stayFilter => {
      this.isShowClearBtn = this.checkIfClearFilter(stayFilter)
    })

    // Lógica para el desplazamiento automático sin mover el mouse
    
  }

  onMouseInactive() {
    // Aquí pones la lógica para desplazar el scroll automáticamente
    // Por ejemplo, desplazar 100 píxeles hacia abajo cada 100 milisegundos:
  

    // Detener el desplazamiento después de un tiempo (por ejemplo, después de 5 segundos)
  
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', () => this.onScroll())
  }

  async onPageScroll() {
    const element = this.elFooter.nativeElement
    if (element.clientHeight + element.offsetTop <= window.scrollY + window.innerHeight && !this.isShowMap) {
      if (this.stayFullLength > this.stayLoadIndex * 20 && !this.isLoadStay) {
        this.isLoadStay = true
        this.loader.setLoading(true)
        await this.stayService.loadStays(this.stayLoadIndex)
        this.isLoadStay = false
        this.loader.setLoading(false)
        this.stayLoadIndex++
      }
    }
  }

  async setFilterFromParams() {
    const stayFilter = {
      ...this.stayService.getEmptyFilter(),
      ...this.activatedRoute.snapshot.queryParams as StayFilter
    }
    await this.stayService.setFilterAsync(stayFilter)
  }

  onPageUp() {
    window.scrollTo(0, 0)
  }

  onScroll() {
    if (window.scrollY >= 150) {
      this.isShowScroller = true
    } else {
      this.isShowScroller = false
    }
  }

  async onClearFilter() {
    this.loader.setLoading(true)
    const filter = this.stayService.getEmptyFilter()
    await this.stayService.setFilterAsync(filter)
    this.loader.setLoading(false)
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: filter,
        queryParamsHandling: 'merge'
      }
    )
  }

  checkIfClearFilter(stayFilter: StayFilter): boolean {
    if (stayFilter.place || stayFilter.label || stayFilter.isPetAllowed === 'true' || stayFilter.name) return true
    return false
  }

  get IsShowMapBtn() {
    return this.stayFullLength
    && !this.loader.getLoading()
  }
}
