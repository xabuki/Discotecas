const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/discosdb');
let discotecasSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

let discoteca = mongoose.model('discotecas', discotecasSchema);
let app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
  

//Código del servidor web

//Añadiendo Servicios GET
app.get('/discotecas', (req, res) => {
    discoteca.find().then(result => {
        res.send(result);
    });
});

//Filtrado de datos. URI dinámicos
app.get('/discotecas/:id', (req,res)=>{
    
    discoteca.findById(req.params.id).then(result=>{
        let data;
        if(result){
            data = { error: false, result: result}
        } else{
            //error
            data = {error: true, errorMessage: "Not found"}
        }
        res.send(data)
    }).catch(error=>{
        //error
        data = {error: true, errorMessage: "Error getting discoteca"}
        res.send(data)
    })
});

//Agregar datos con solicitudes POST
app.use(bodyParser.json());
app.post('/discotecas', (req, res)=> {
    let newDiscoteca = new discoteca({
        name: req.body.name,
        cover:  req.body.cover,
        description: req.body.description
    });

    newDiscoteca.save().then(result => {
        let data = {error: false, result: result}
        res.send(data);
    }).catch(error => {
        let data = {error:true, errorMessage:"Can not save"}
        res.send(data);
    });
});
//Actualización de datos con solicitudes PUT
app.put('/discotecas/:id', (req,res) =>{
    discoteca.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            cover: req.body.cover,
            description: req.body.description
        }
    }, {new:true}).then(result => {
        let data = {error: false, result : result}
        res.send(data);
    }).catch(error => {
        let data = {error :true, errorMessage: "error updating discoteca"}
        res.send(data);
    });
});

//Eliminiación de datos con solicitudes delete
app.delete('/discotecas/:id', (req, res) => {
    discoteca.findByIdAndRemove(req.params.id).then(result => {
        let data = { error: false, result : result}
        res.send(data);
    }).catch(error=>{
        let data = {error :true , errorMessage: "error removing discoteca"}
        res.send(data);
    })
})


app.listen(8000);