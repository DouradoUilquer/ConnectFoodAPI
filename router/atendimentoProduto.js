const express = require("express");
const router = express.Router();
const dataBase = require("../database/database");
const dateFormat = require('dateformat');

router.post("/atendimento-produto", (req, res) => {
    var itens = req.body;
    const itensJson = itens
    const quantidade = itensJson.length;
    let contador = 0;
    var now = new Date();
    dateFormat.masks.hammerTime = 'yyyy-mm-dd';


    while (contador < quantidade) {
        
        var idEstoque = itensJson[contador].id_estoque
        var idFluxo = itensJson[contador].id_fluxo
        var documento = itensJson[contador].documento
        var maquina = itensJson[contador].maquina
        var qtde = itensJson[contador].quantidade
        var total = itensJson[contador].total
        var tipo = itensJson[contador].tipo


        dataBase.raw("insert into fluxoprod(empresa,codigo,cod_ean,cod_extra,descricao,unidade,icms,cst,cfop,cest,ncm,pis_cst,cofins_cst,ipi,codigo_ipi,tipo_produto,preco,"
            + "id_fluxo,id_estoque,documento,maquina,quantidade,total,tipo,"
            + "base_icms, valor_icms , base_pis,base_cofins,base_ipi,data)"
            + "select empresa,codigo,cod_ean,cod_extra,descricao,unidade,icms,cst,cfop_venda,cest,ncm,pis_venda,cofins_venda,ipi,codigo_ipi,tipo,preco_venda,"
            + " '" + idFluxo + "' , '" + idEstoque + "' , '" + documento + "' , '" + maquina + "' , '" + qtde + "' ,'" + total + "' , '" + tipo + "' ,"
            + " '" + total + "' ,  ('" + total + "'*icms/100) , '" + total + "','" + total + "','" + total + "', '" + dateFormat(now, "hammerTime") + "'  from estoque where id_estoque=" + idEstoque + "").then(() => {
            }).catch(err => {
                console.log(err)
            })
        contador++;
    }
    res.sendStatus(200)
})



module.exports = router;