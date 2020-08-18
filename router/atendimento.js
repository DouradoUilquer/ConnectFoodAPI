const express = require("express");
const router = express.Router();
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
        var idFluxo = result[0]
        dataBase('comanda_mesa').where('mesa_comanda', mesa).update({
            id_fluxo: idFluxo,
            empresa: empresa,
            documento: documento,
            garcom: vendedor,
            cliente: cliente,
            data: now,
            data_abertura: now,
            pessoas: 2
        }).then((result) => {
            res.sendStatus(200)
        }).catch((erro) => {
            res.sendStatus(400)
        })
    }).catch((erro) => {
        res.sendStatus(400)
    })
})




module.exports = router;