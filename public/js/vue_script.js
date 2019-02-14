'use strict'
var MenuItem = new Vue({
    el: '#second_header',
    data: {
        item: food
    },
    methods: {
        changeStatus: function(value) {
            value.status = !value.status
        },
        ifGluten: function(gluten) {
            if(gluten){
                return 'Gluten'
            }else {
                return 'No gluten'
            }
        },
        ifLactose: function(lactose) {
            if(lactose){
                return 'Lactose'
            }else {
                return 'No Lactose'
            }
        }
    }
});

var Order = new Vue({
    el: '#third_header',
    data: {
        listBurger: food,
        newArr: [],
        firstLastName:"",
        eMail: "",
        payment:"",
        gender:"",
        key:false
    },
    methods: {
        orderArr: function (){
            return [this.firstLastName, this.eMail,
                    this.payment, this.gender];
        },
        notEmpty: function (){
            var arr = Order.orderArr();
            for(var i=0; i<arr.length; i++) {
                if(arr[i] === ""){
                    return false;
                }
            }
            return true;
        },
        burgers: function(){
            this.newArr = [];
            var arr = MenuItem.item;
            for(var i=0; i<arr.length; i++){
                if(arr[i].status){
                    this.newArr.push(arr[i].name);
                }
            }
            return this.newArr;
        }
    }
});

var socket = io();

var vm = new Vue({
    el: "#lastSection",
    data: {
        listBurgerz : Order.listBurger,
        check: false,
        orders: {},
        order: {orderer: {name: '', email: '', payment: '', gender: ''},
                details: { x: '', y: ''}}
    },
    created: function () {
        socket.on('initialize', function (data) {
            this.orders = data.orders;
        }.bind(this));

        socket.on('currentQueue', function (data) {
            this.orders = data.orders;
        }.bind(this));
    },
    methods: {
        copi: function () {
            return Order.orderArr();
        },
        getNext: function () {
            var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
                return Math.max(last, next);
            }, 0);
            return lastOrder + 1;
        },
        addOrder: function () {
            socket.emit("addOrder", { orderId: this.getNext(),
                                      details: this.order.details,
                                      userInfo: [this.copi()[0],
                                                 this.copi()[1],
                                                 this.copi()[2],
                                                 this.copi()[3]],
                orderItems: Order.burgers()
            });
            this.check = !this.check;
        },
        displayOrder: function (event) {
            var offset = {x: event.currentTarget.getBoundingClientRect().left,
                          y: event.currentTarget.getBoundingClientRect().top};
            this.order.details = {x: event.clientX - 10 - offset.x,
                                  y: event.clientY - 10 - offset.y };
        },
        getCoords: function () {
            return (this.order.details.x +','+ this.order.details.y);
        }
    }
});