const express = require("express");
const router = express.Router();
const dataBase = require("../database/database");

//BUSCAR FLUXOPROD POR ID
router.get("/vendas/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(404)
    } else {
        var id = req.params.id;
        dataBase.select('id_fluxoprod','id_fluxo','id_estoque','documento','codigo','descricao','quantidade','preco','total')
        .where('id_fluxo',id).where('tipo',"9").table("fluxoprod").then(fluxo_prod => {
            res.json({ fluxo_prod })
        }).catch(err => {
            res.sendStatus(404)
        });

    }

})

module.exports = router;