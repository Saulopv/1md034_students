"use strict"
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
        street: "",
        house: "",
        payment:"",
        gender:"",
        key:false
    },
    methods: {
        orderArr: function (){
            return [this.firstLastName, this.eMail, this.street,
                    this.house, this.payment, this.gender];
        },
        click: function (){
            if(Order.notEmpty()) {
                this.key = true;
                return key;
            }else{
                this.key = false;
                return key;
            }
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
            var arr = MenuItem.item;
            for(var i=0; i<arr.length; i++){
                if(arr[i].status){
                    this.newArr.push(arr[i].name);
                }
            }
            return this.newArr.size;
        }
    }
});