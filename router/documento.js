const express = require("express");
const router = express.Router();
const dateFormat = require('dateformat');
const dataBase = require("../database/database");


router.get("/documento", (req, res) => {
    dataBase.select('cont_fluxo').table("empresa").where('fantasia','EMPRESA A').then(empresa => {
        var now = new Date();
        dateFormat.masks.hammerTime = '/yy';
        contadorFluxo = empresa[0].cont_fluxo + 1
        var numero = ("0000000"+ contadorFluxo).slice(-7)
        var documento = "FL-"+numero+ dateFormat(now, "hammerTime")
        res.json({ documento })
        dataBase.raw("update empresa set cont_fluxo=cont_fluxo+1  where fantasia='EMPRESA A' ")
        .then((result) => {
            //res.sendStatus(200)
        }).catch(err => {
            //res.sendStatus(400)
        })
    
    }).catch(err => {
        console.log(err)
    })
})

module.exports = router;