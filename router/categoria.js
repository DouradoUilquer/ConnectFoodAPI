const express = require("express");
const router = express.Router();
const dataBase = require("../database/database");

//BUSCAR TODOS PRODUTOS
router.get("/categoria", (req, res) => {
    dataBase.select('descricao','combo').table("fastfood_categoria").then(categoria => {
        res.json({ categoria })
    }).catch(err => {
        res.sendStatus(404)
    })
})

module.exports = router;