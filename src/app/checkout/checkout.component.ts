import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderserviceService } from '../orderservice.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  public orderSummary: any;

  public subTotal: any;
  public taxes: any;
  public total: any;
  public donation: any;
  public checkOut: any;

  constructor(
    public orderService: OrderserviceService,
    private router: Router
  ) {
    this.orderSummary = [];
    this.checkOut = {};
    this.subTotal = 0;
    this.taxes = 0;
    this.total = 0;
    this.donation = 0;
  }

  options = (n: number) => {
    const array = [];
    for (let i = 0; i <= n; i++) {
      array.push(i);
    }
    return array;
  };

  public data: any = {
    tickets: [
      {
        ticketType: 'Free Ticket',
        ticketDesc:
          'Free ticket for anyone to make a valuable contribution towards our future online events programme.Thank You.',
        saleTime: 'Sale ends in 1 hour',
        price: 'Free',
      },
      {
        ticketType: 'Alumni VIP Ticket',
        ticketDesc:
          'This livestream will broadcast via a private YouTube link that will be sent to ticket purchasers an hour prior to showtime',
        saleTime: 'Sale ends in 5 days',
        price: 3500,
      },
    ],

    donate: {
      title: 'Donate',
      desc: 'Access to arts is vital. Pay what you can.',
      donate: 'I want to donate',
      fixedamount: [50, 100, 200, 500],
      customAmount: '$ Enter amount',
    },

    books: [
      {
        bookName: 'Book: Good Strategy - Bad Strategy',
        bookDesc: 'Learn from the experts of business process management',
        price: 17.99,
      },
    ],
    couponInput: false
  };

  pushToArray(arr: any = [], obj: any = {}) {
    var existingIds = arr.map((obj: any = {}) => obj.id);
    if (!existingIds.includes(obj.id)) {
      arr.push(obj);
    } else {
      arr.forEach((element: any, index: any) => {
        if (element.id === obj.id) {
          arr[index] = obj;
        }
      });
    }
  }

 

  onOptionsSelected = (
    index: number,
    ticketQuantity: any,
    ticketType: string,
    ticketPrice: any
  ) => {
    const value = ticketQuantity.target.value;

    if (ticketPrice === 'Free') {
      ticketPrice = 0.0;
    }

    if (ticketType.split(':')[0].toString() === 'Book') {
      index = index + 10;
    }

    this.pushToArray(this.orderSummary, {
      id: index,
      ticketQuantity: value,
      ticketType: ticketType,
      ticketPrice: ticketPrice,
    });

    let ticket: any = [];

    for (let i: number = 0; i < this.orderSummary.length; i++) {
      ticket.push(
        this.orderSummary[i].ticketQuantity * this.orderSummary[i].ticketPrice
      );
    }

    // console.log(ticket)

    this.subTotal = ticket.reduce((acc: any, val: any) => {
      return parseFloat(acc + val);
    }, 0);

    // console.log(this.subTotal);

    if (this.subTotal === 0) {
      this.taxes = 0;
    } else {
      this.taxes = (89.42 + this.donation).toFixed(2);
    }
  };


  onSelectDonations = (donationAmount : any) => {
    const value = donationAmount.target.value;
    const getvalAmount = value.split("$");

    console.log(parseInt(getvalAmount[1]));
    this.donation = parseInt(getvalAmount[1]);
    this.taxes = (parseFloat(this.taxes) + this.donation).toFixed(2);
  }

  getTotal(taxes: any, subtotal: any) {
    // console.log(parseFloat(taxes), subtotal)
    return (parseFloat(taxes) + subtotal).toFixed(2);
  }

  onCheckOut = () => {
  

    this.pushToArray(this.orderService.checkOutDetails, {
      id : 0,
      orderSummary : this.orderSummary,
      subTotal : this.subTotal,
      taxes : this.taxes,
      total : parseFloat(this.getTotal(this.taxes, this.subTotal))
    })

    this.router.navigateByUrl('/attendees');

  };

  haveAPromoCode = () =>{
  
    this.data.couponInput = true;
                            
  }

  ngOnDestroy() {}

  ngOnInit(): void {
    this.orderService.checkOutDetails
  }
}
