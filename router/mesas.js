const express = require("express");
const router = express.Router();
const dataBase = require("../database/database");

//BUSCAR TODAS MESAS
router.get("/mesas", (req, res) => {
    dataBase.select('mesa_comanda', 'status', 'garcom', 'documento').table("comanda_mesa").then(mesas => {
        res.json({ mesas })
    }).catch(err => {
        res.sendStatus(404)
    })
})

//ATUALIZAR MESA DE LIVRE PARA OCUPADA
router.post("/mesas/livre", (req, res) => {
    var { id_comanda_mesa, id_fluxo, empresa, documento, garcom, cliente, total } = req.body
    now = new Date;
    dataBase('comanda_mesa').where('id_comanda_mesa', id_comanda_mesa).update({
        id_fluxo: id_fluxo,
        empresa: empresa,
        documento: documento,
        garcom: garcom,
        cliente: cliente,
        total: total,
        status: "O",
        data: now,
        data_abertura: now
    }).then((result) => {
        res.sendStatus(200)
    }).catch((erro) => {
        console.log(erro)
        res.sendStatus(400)
    })
})

//ATUALIZAR MESA DE OCUPADO PARA LIVRE
router.post("/mesas/ocupado", (req, res) => {
    var { id_comanda_mesa} = req.body
    now = new Date;
    dataBase('comanda_mesa').where('id_comanda_mesa', id_comanda_mesa).update({
        id_fluxo: 0,
        empresa: "",
        documento: "",
        garcom: "",
        cliente: "",
        total: 0.00,
        status: "L",
        data: "0000-00-00",
        data_abertura: "0000-00-00 00:00:00"
    }).then((result) => {
        res.sendStatus(200)
    }).catch((erro) => {
        console.log(erro)
        res.sendStatus(400)
    })
})





module.exports = router;