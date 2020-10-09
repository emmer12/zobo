let mongoose = require('mongoose');
let Currency=require('../currency')


mongoose.connect('mongodb://localhost/Zobo');

let currency=[
    new Currency({
        name:"US Doller",
        unit:"USD",
    }),
    new Currency({
        name:"Naira",
        unit:"NGN",
    }),
    
]

var done=0
for (let i = 0; i < currency.length; i++) {
    currency[i].save().then((err,result)=>{
        done++
        if (done === currency.length) {
            exit()
        }
    })
    
}

function exit() { 
    mongoose.disconnect()
 }
