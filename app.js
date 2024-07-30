const { response } = require('express');
const express = require('express');
const app = express() ;
const axios = require('axios');
// const { json } = require('body-parser');
// //const { JSON } = require('mysql/lib/protocol/constants/types');

// var main = {}

// async function makeGetRequest(){
//     await axios.get(`https://fcc-weather-api.glitch.me/api/current?lat=${24.8607}&lon=${67.0011}`) .then(response => {
  
//        main = JSON.parse(response.data)
//        console.log(main)
//     })
//     .catch(error => {
//         return ('Error : '+error);
//     });

   
// }


// makeGetRequest()




let getResponse ;
function func1(lat , lon){
    return new Promise(function(resolve,reject){
        setTimeout(()=>{
            axios.get(`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`).
            then( response=>
                {
                   // getResponse =JSON.stringify(response) ;
            console.log(response.data.name);
            console.log(response.data.main);
            resolve()
            console.log(()=>'Your promise is resolved');
            }
            )
           .catch(()=>{
                console.log('your promise has not resolved')
                reject(()=>'Sorry')
            })

        },2000)
    })

    }

    var y = 24.8607;
    var x = 67.0098 //67.0011;

    func1(y,x).then(()=>console.log('Resolve')).catch(()=>console.log('Error'));



app.listen(5000,()=>{
    console.log('********server run on port 5000*******')
});
