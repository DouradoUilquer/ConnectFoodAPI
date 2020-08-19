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
    var { categoria } = req.body
    dataBase.select('codigo', 'descricao', 'descricao_fast_food', 'preco_venda', 'categoria').where('categoria', categoria).table("estoque").then(estoque => {
        res.json({ estoque })
    }).catch(err => {
        res.sendStatus(404)
    })
})

//ATUALIZAR SALDO DO ESTOQUE
router.put("/estoque", (req, res) => {
    var itens = req.body;
    const itensJson = itens
    const quantidade = itensJson.length;
    let contador = 0;

    while (contador < quantidade) {

        var idEstoque = itensJson[contador].id_estoque
        var qtde = itensJson[contador].quantidade

        dataBase.raw("update estoque set saldo=saldo-'" + qtde + "' where id_estoque='" + idEstoque + "' and tipo='PRODUTO'").then(() => {
        }).catch(err => {
            console.log(err)
        })
        contador++;
    }
    res.sendStatus(200)
})

module.exports = router;