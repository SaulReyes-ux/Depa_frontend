import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import { Subscription } from 'rxjs';
import { FilterOrder, Order } from 'src/app/models/order.model';
import { ngxCsv } from 'ngx-csv';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from 'src/app/services/loader.service';
import { TranslationService } from 'src/app/services/translation.service'

@Component({
  selector: 'user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.scss']
})
export class UserOrderComponent {
  [x: string]: any;

  orderFilter!: FilterOrder

  constructor(private userService: UserService,
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    public loader:LoaderService,
    private translationService:TranslationService
  ) { }

  @Input() user!: User
  orders !: Order[]
  ordersToShow!: Order[]
  subscription !: Subscription
  faCircle = faCircle
  isSearchActive: boolean = false
  isShowFilterModal: boolean = false


  ngOnInit(): void {
    this.loader.setLoading(true)
    this.user = this.userService.getUser()
    this.deleteHostMsg()
    this.orderFilter = this.orderService.getEmptyFilter()
    this.orderFilter.hostId = this.user._id
    console.log(this.user._id);
    this.orderService.setFilter(this.orderFilter)
    this.subscription = this.orderService.orders$.subscribe(orders => {
      this.orders = orders
      this.ordersToShow = [...orders]
    })
    this.loader.setLoading(false)
  }

  async deleteHostMsg() {
    this.user.hostMsg = 0
    this.user = await this.userService.update(this.user) as User
  }

  setOrdersToShow(orders: Order[]) {
    this.ordersToShow = orders
  }

  toggleFilterModal() {
    this.isShowFilterModal = !this.isShowFilterModal
  }

  getOrderStatusAmount(type: string) {
    return this.orders.filter(order => order.status === type).length
  }

  onSetFilter() {
    this.orderService.setFilter(this.orderFilter)
  }

  onClearSearch() {
    this.orderService.setFilter(this.orderService.getEmptyFilter())
    this.isSearchActive = false
  }

  onDownloadCSV() {
    new ngxCsv(this.getData(), "orders", this.getOptions())
  }

  onPrint() {
    window.print()
  }

  async onChangeStatus(newStatus: string, order: Order) {
    order.status = newStatus
    try {
      await this.orderService.save(order)
      this.snackBar.open(`Status change to ${newStatus}`, 'Close', { duration: 3000 })
    } catch (err) {
      console.log(err)
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  // Private function for CSV files
  private getData() {
    let data = []
    for (const order of this.orders) {
      data.push(
        {
          "Client name": order.buyer.fullname,
          "Stay name": order.stay.name,
          "Check in": order.startDate,
          "Check out": order.endDate,
          "Total": '$' + order.totalPrice,
          "Order status": order.status
        }
      )
    }
    return data
  }
  private getOptions() {
    return {
      title: 'User Details',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      noDownload: false,
      showTitle: false,
      useBom: false,
      headers: ['Client name', 'Stay name', 'Check in', 'Check out', 'Total', 'Order status']
    };
  }
  

  cargarIdioma(){
    switch(this['translationService'].currentLang){
      case 'en':
        this['amenities'] = this['Amenities']
        this['labels'] = this['Labels']
        break;
      case 'es':
        this['amenities'] = this['AmenitiesEs']
        this['labels'] = this['LabelEs']
        break;
      default:
        this['amenities'] = this['Amenities']
        this['labels'] = this['Labels']
        break;
    }
  }

  cambiarIdioma(lang: string): void {
    this.cargarIdioma();
  }

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }
}
