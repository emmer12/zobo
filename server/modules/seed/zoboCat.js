let mongoose = require('mongoose');
let Category=require('../zoboCat')


mongoose.connect('mongodb://localhost/Zobo');

let categories=[
    new Category({
        zobo:"Zobo",
        min:100,
        display:"zobo.png"
    }),
    new Category({
        zobo:"Coffee",
        min:150,
        display:"coffee.png"
    }),
    new Category({
        zobo:"Coke",
        min:200,
        display:"coke.png"
    }),
]

var done=0
for (let i = 0; i < categories.length; i++) {
    categories[i].save().then((err,result)=>{
        done++
        if (done === categories.length) {
            exit()
        }
    })
    
}

function exit() { 
    mongoose.disconnect()
 }
