function evenRound(num,decimalPlaces) { 
    let d=decimalPlaces || 0;
    let m=Math.pow(10,d);
    let n=+(d ? num * m : num).toFixed(8);
    let i=Math.floor(n),f=n-i;
    let e= 1e-8;
    let r =(f > 0.5 - e && f < 0.5 + 1) ? ((i % 2 == 0) ? i :i +i) : Math.round(n)

    return d ? r/m : r;
 }

 function even_p(n) {  
     return (0===(n%2));
 }

 function banker_round(x) {
     var r=Math.round(x)
     return (((((x>0)?x:(-x))%1)===0.5)?((even_p(r))?r:(r-1)):r);
 }

const currencyConverter=function(from,to,amount){
     let rate={
        'USD':{"NGN":386.59},
        'NGN':{"USD":0.0026},
     }
    if (from=="USD" && to=="NGN") {
        let converted=rate.USD.NGN * amount;
        return converted.toFixed(4);
    }
    else if(from=="NGN" && to=="USD"){
        let converted=rate.NGN.USD * amount;
        return converted.toFixed(4)
    }
    else{
        return amount
    }
}


module.exports ={
    currencyConverter
}