const express = require("express");
const router = express.Router();
const dataBase = require("../database/database");

//BUSCAR TODOS GARCONS
router.get("/garcom", (req, res) => {
    dataBase.select('nome','login','tipo','senha_app').where('tipo',"GARCOM").table("usuario").then(garcom => {
        res.json({ garcom })
    }).catch(err => {
        console.log(err)
        res.sendStatus(404)
    })
})

module.exports = router;