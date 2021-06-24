"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CheckoutComponent = void 0;
var core_1 = require("@angular/core");
var CheckoutComponent = /** @class */ (function () {
    function CheckoutComponent(orderService, router) {
        var _this = this;
        this.orderService = orderService;
        this.router = router;
        this.options = function (n) {
            var array = [];
            for (var i = 0; i <= n; i++) {
                array.push(i);
            }
            return array;
        };
        this.data = {
            tickets: [
                {
                    ticketType: 'Free Ticket',
                    ticketDesc: 'Free ticket for anyone to make a valuable contribution towards our future online events programme.Thank You.',
                    saleTime: 'Sale ends in 1 hour',
                    price: 'Free'
                },
                {
                    ticketType: 'Alumni VIP Ticket',
                    ticketDesc: 'This livestream will broadcast via a private YouTube link that will be sent to ticket purchasers an hour prior to showtime',
                    saleTime: 'Sale ends in 5 days',
                    price: 3500
                },
            ],
            donate: {
                title: 'Donate',
                desc: 'Access to arts is vital. Pay what you can.',
                donate: 'I want to donate',
                fixedamount: [50, 100, 200, 500],
                customAmount: '$ Enter amount'
            },
            books: [
                {
                    bookName: 'Book: Good Strategy - Bad Strategy',
                    bookDesc: 'Learn from the experts of business process management',
                    price: 17.99
                },
            ]
        };
        this.getOrderSummaryDetails = function (index, orderquantity, orderType, orderPrice) {
            var orderQuantity = orderquantity.target.value;
            if (orderPrice === 'Free') {
                orderPrice = parseFloat(orderPrice);
                orderPrice = 0.00;
            }
            if (orderType.split(':').toString() === 'Book') {
                index = index + 10;
            }
            var orderDetailsProperties = {
                id: index,
                ticketQuantity: orderQuantity,
                ticketType: orderType,
                ticketPrice: orderPrice
            };
            _this.pushToArray(_this.orderSummary, orderDetailsProperties);
        };
        this.onOptionsSelected = function (index, ticketQuantity, ticketType, ticketPrice) {
            var value = ticketQuantity.target.value;
            if (ticketPrice === 'Free') {
                ticketPrice = 0.0;
            }
            if (ticketType.split(':')[0].toString() === 'Book') {
                index = index + 10;
            }
            _this.pushToArray(_this.orderSummary, {
                id: index,
                ticketQuantity: value,
                ticketType: ticketType,
                ticketPrice: ticketPrice
            });
            var ticket = [];
            for (var i = 0; i < _this.orderSummary.length; i++) {
                ticket.push(_this.orderSummary[i].ticketQuantity * _this.orderSummary[i].ticketPrice);
            }
            // console.log(ticket)
            _this.subTotal = ticket.reduce(function (acc, val) {
                return parseFloat(acc + val);
            }, 0);
            // console.log(this.subTotal);
            if (_this.subTotal === 0) {
                _this.taxes = 0;
            }
            else {
                _this.taxes = 89.42;
            }
        };
        this.onSelectDonations = function (donationAmount) {
            _this.donation = parseInt(donationAmount.target.value);
            // console.log(this.donation)
            _this.taxes = parseFloat(_this.taxes);
            _this.taxes = (parseFloat(_this.donation) + 89.42).toFixed(2);
        };
        this.onCheckOut = function () {
            var orderSummary = _this.orderSummary;
            var taxes = _this.taxes;
            var total = _this.getTotal(_this.taxes, _this.subTotal);
            var subtotal = _this.subTotal;
            _this.orderService.orderSummary = orderSummary;
            _this.orderService.subtotal = subtotal;
            _this.orderService.taxes = taxes;
            _this.orderService.total = total;
            _this.router.navigateByUrl('/attendees');
        };
        this.orderSummary = [];
        this.subTotal = 0;
        this.taxes = 0;
        this.total = 0;
        this.donation = 0;
        this.order = [];
    }
    CheckoutComponent.prototype.pushToArray = function (arr, obj) {
        if (arr === void 0) { arr = []; }
        if (obj === void 0) { obj = {}; }
        var existingIds = arr.map(function (obj) {
            if (obj === void 0) { obj = {}; }
            return obj.id;
        });
        if (!existingIds.includes(obj.id)) {
            arr.push(obj);
        }
        else {
            arr.forEach(function (element, index) {
                if (element.id === obj.id) {
                    arr[index] = obj;
                }
            });
        }
    };
    CheckoutComponent.prototype.getTotal = function (taxes, subtotal) {
        // console.log(parseFloat(taxes), subtotal)
        return (parseFloat(taxes) + subtotal).toFixed(2);
    };
    CheckoutComponent.prototype.ngOnDestroy = function () {
        var orderSummary = this.orderSummary;
        var taxes = this.taxes;
        var total = this.getTotal(this.taxes, this.subTotal);
        var subtotal = this.subTotal;
        this.orderService.orderSummary = orderSummary;
        this.orderService.subtotal = subtotal;
        this.orderService.taxes = taxes;
        this.orderService.total = total;
    };
    CheckoutComponent.prototype.ngOnInit = function () { };
    CheckoutComponent = __decorate([
        core_1.Component({
            selector: 'app-checkout',
            templateUrl: './checkout.component.html',
            styleUrls: ['./checkout.component.scss']
        })
    ], CheckoutComponent);
    return CheckoutComponent;
}());
exports.CheckoutComponent = CheckoutComponent;
