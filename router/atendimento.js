const express = require("express");
const router = express.Router();
const dateFormat = require('dateformat');
const dataBase = require("../database/database");

router.post("/atendimento", (req, res) => {
    var { empresa, documento, maquina, cliente, vendedor, operador, NfSerie, NfModelo, NfNatureza, mesa } = req.body
    now = new Date;
    dataBase('fluxo').insert({
        empresa: empresa,
        documento: documento,
        maquina: maquina,
        cliente: cliente,
        vendedor: vendedor,
        operador: operador,
        natureza: NfNatureza,
        serienf: NfSerie,
        modeloNf: NfModelo,
        data: now,
        tipo: '1',
        data_abertura: now,
        comanda_mesa: mesa
    }).then((result) => {
        res.send(result)
    }).catch((erro) => {
        res.sendStatus(400)
    })
})




module.exports = router;