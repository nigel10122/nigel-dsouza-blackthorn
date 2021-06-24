import { Component, OnInit } from '@angular/core';
import { OrderserviceService } from '../orderservice.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-attendee',
  templateUrl: './attendee.component.html',
  styleUrls: ['./attendee.component.scss'],
})
export class AttendeeComponent implements OnInit {

  public couponInput : boolean;
  constructor(public orderService: OrderserviceService,private router: Router,private location: Location) {
    this.couponInput = false;
  }

  public initiateState = () => {
    const checkOutDetails = [];
    for (let i = 0; i < this.orderService.checkOutDetails.length; i++) {
      checkOutDetails.push(this.orderService.checkOutDetails[i]);
    }

    return checkOutDetails;
  };

  freeTickets = () => {
    let orderSummary = this.initiateState()[0].orderSummary;
    let freeTickets = [];

    for (let i = 0; i < orderSummary.length; i++) {
      if (orderSummary[i].ticketPrice === 0) {
        for (let j = 0; j < orderSummary[i].ticketQuantity; j++) {
          freeTickets.push(orderSummary[i]);
        }
      }
    }

    return freeTickets;
  };

  vipTickets = () => {
    let orderSummary = this.initiateState()[0].orderSummary;
    let vipTickets = [];

    for (let i = 0; i < orderSummary.length; i++) {
      if (orderSummary[i].ticketType == "Alumni VIP Ticket") {
        for (let j = 0; j < orderSummary[i].ticketQuantity; j++) {
          vipTickets.push(orderSummary[i]);
        }
      }
    }

    return vipTickets;
  };

 PromoCode = () =>{
  
    this.couponInput = true;
                            
  }

Edit = (): void => {
  this.location.back()
}

  ngOnInit(): void {
    // console.log(this.freeTickets());
    // console.log(this.vipTickets());
    console.log(this.initiateState()[0].orderSummary);
  }
}
