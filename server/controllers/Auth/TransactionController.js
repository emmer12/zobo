const https = require('https')




const TransactionController = {
    verifyPayment,
    test
}

function test() { 
    return {
        name:'emmer'
    }
 }


  function verifyPayment(reference,callback) {
    const option = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction/verify/'+reference,
        method: 'GET',
        headers: {
            Authorization: 'Bearer sk_test_f95cf6515fb76187eb141a0777fd476eb987b76e',
            'Content-Type': 'application/json'
        }
    }


    let verify = https.request(option,callback);
    verify.end()
    }
 
    function retFn(data) {  
        console.log(data);
        
    }

module.exports = TransactionController