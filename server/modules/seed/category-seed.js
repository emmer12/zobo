let mongoose = require('mongoose');
let Category=require('../tunner/category')


mongoose.connect("mongodb://localhost/Tunner");

let categories=[
    new Category({
        name:"Piano",
        description:"Piano category"
    }),
    new Category({
        name:"Base Guitar",
        description:"Base Giutar category"
    }),
    new Category({
        name:"Lead Guitar",
        description:"Lead Guitar category"
    }),
    new Category({
        name:"Sax",
        description:"Sax category"
    }),
    new Category({
        name:"Drums",
        description:"Drums category"
    }),
    new Category({
        name:"Talking Drums",
        description:"Talking Drums category"
    }),
    new Category({
        name:"Trumpet",
        description:"Trumpet category"
    }),
    new Category({
        name:"Violin",
        description:"Violin category"
    }),
    new Category({
        name:"Voice",
        description:"Voice category"
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
