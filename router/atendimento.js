const express = require("express");
const router = express.Router();
const dataBase = require("../database/database");


//INCLUIR ATENDIMENTO E ATUALIZAR STATUS DA MESA
router.post("/atendimento", (req, res) => {
    var { empresa, documento, maquina, cliente, vendedor, operador, NfSerie, NfModelo, NfNatureza, mesa, pessoas } = req.body
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
            pessoas: pessoas
        }).then((result) => {
            res.sendStatus(200)
        }).catch((erro) => {
            res.sendStatus(400)
        })
    }).catch((erro) => {
        res.sendStatus(400)
    })
})

//EXCLUIR ATENDIMENTO
router.delete("/atendimento", (req, res) => {
    var { documento, mesa } = req.body
    dataBase('fluxo').where('documento', documento).where('comanda_mesa', mesa).del()
        .then((result) => {
            res.sendStatus(200)
        }).catch((erro) => {
            console.log(erro)
            res.sendStatus(404)
        })

})





module.exports = router;