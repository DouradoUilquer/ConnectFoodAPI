const express = require("express");
const router = express.Router();
const dataBase = require("../database/database");

//BUSCAR TODOS PRODUTOS
router.get("/estoque", (req, res) => {
    dataBase.select('codigo', 'descricao', 'descricao_fast_food', 'preco_venda', 'categoria').table("estoque").then(estoque => {
        res.json({ estoque })
    }).catch(err => {
        res.sendStatus(404)
    })
})

//BUSCAR PRODUTO POR CATEGORIA
router.post("/estoque", (req, res) => {
    var {categoria} = req.body
    dataBase.select('codigo', 'descricao', 'descricao_fast_food', 'preco_venda', 'categoria').where('categoria', categoria).table("estoque").then(estoque => {
        res.json({ estoque })
    }).catch(err => {
        console.log(err)
    })
})

module.exports = router;