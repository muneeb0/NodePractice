const express = require('express');
const app = express() ;
const parser = require('body-parser');
const jsonParser = parser.json();
const sql = require('mssql')
const Joi = require('joi');
var fs = require('fs');
const { object } = require('joi');
const logger = require('./Logger');

var write = (data) =>{
var date = new Date();
fs.appendFileSync('read.txt',`------------\n
 ${date.toLocaleDateString()}
 \t  ${date.toLocaleTimeString()} \n
 ${data.name} \t ${data.cnic} \t ${data.number} \t  
 \n-----------`)
}

const schema= Joi.object({
    cnic: Joi.string()
    // .alphanum()
    // .min(3)
    // .max(13)
    .required(),
    name: Joi.string()
    // .alphanum()
    // .min(3)
    // .max(15)
    .required(), 
    number: Joi.string()
    // .alphanum()
    // .min(3)
    // .max(11)
    .required(),
})


const config = {
    user: 'sa',
    password: '123',
    server: 'DESKTOP-JCC14TT',
    database: 'user',
    options: {           
        encrypt: false
    }
};


function setValue(value) {
    someVar = value;
  }


var query = async function () {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config)
        const result = await sql.query(`select * from users  `)
        
        console.log('result From Sql: '+JSON.stringify(result))
        console.log('Selected Row: '+JSON.stringify(result))
        let i = 0 ;
        let arr=[];
        
        while(result.recordsets[0].length>i){
            arr.push( result.recordsets[0][i]);
            console.log("Array : "+arr)
            i++;
        }
        return arr

    } catch (err) {
        console.log('Failed to find result'+err)
        return err;
    }
}

var querySignle = async function (val) {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config)
        const result = await sql.query(`select * from users where id = ${val}  ` )
        
        console.log('result From Sql: '+JSON.stringify(result))
        console.log('Selected Row: '+JSON.stringify(result))
        let i = 0 ;
        let arr=[];
        
        while(result.recordsets[0].length>i){
            arr.push( result.recordsets[0][i]);
            console.log("Array : "+arr)
            i++;
        }
        return arr

    } catch (err) {
        console.log('Failed to find result'+err)
        return err;
    }
}

var InsertQuery = async (cnic,name,number) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config)
        try {
            const value = await schema.validateAsync({ cnic: cnic, name:name,number:number });
            const results = await sql.query(`insert into users values('${value.cnic}','${value.name}','${value.number}')`)
            console.dir(`Data Has Been inserted Successfully `);
            write({ cnic: cnic, name:name,number:number });
        }
        catch (err) { 
            console.log('Failed to find result: '+err)
            write({ cnic: cnic, name:name,number:number });
        }
    //     const result = await sql.query(`insert into users values('${value.cnic}','${value.name}','${value.number}')`)
    //     console.dir('Data Has Been inserted Successfully'+result);
     } catch (err) {
        console.log('Failed to find result'+err)
    }
}


function setValue(value) {
    someVar = value;
    console.log(someVar);
  }

let serviceResponse = {};

serviceResponse = {
    message: 'Success',
    cnic:'4230117591775'
    //name:'muneeb',
    //number:'03212321834'
  }


app.get('/', async (req,res)=>{
    var data = await query();
    let show=[] ;
    let element=0;
    //console.log("Data from sql: "+JSON.stringify(data))
    while(data.length>element){
        show += `Name : ${data[element].name}  CustomerCNIC : ${data[element].CustomerID} Number : ${data[element].number}
         `
         element++
    }
    console.log("Data To Display"+show )    
    logger.info('info '+'Response: '+show);
    res.json(show)
 

})

app.get('/user/:id', async (req,res)=>{
    console.log("Enter into API")
    var id = req.params.id;
    console.log("Param : "+id)
    var data = await querySignle(id);
    let show=[] ;
    let element=0;
    //console.log("Data from sql: "+JSON.stringify(data))
    while(data.length>element){
        show += `Name : ${data[element].name}  CustomerCNIC : ${data[element].CustomerID} Number : ${data[element].number}
         `
         element++
    }
    console.log("Data To Display"+show )    
    logger.info('info '+'Response: '+show);
    res.json(show)
 

})



app.post('/user',jsonParser,(req,res,schema)=>{
    serviceResponse = {
        cnic:req.body.CustomerID,
        name:req.body.name,
        number:req.body.number
      }

   console.log(JSON.stringify(serviceResponse));
   InsertQuery(req.body.CustomerID,req.body.name,req.body.number)
    res.json(serviceResponse)
      
    logger.info('info '+'Response: '+ serviceResponse);
})

app.listen(8000,()=>{logger.info('info '+'Server is Started')})