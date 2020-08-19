const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const Estoque = require("./router/Estoque")
const Mesas = require("./router/Mesas")
const Garcom = require("./router/Garcom")
const Vendas = require("./router/Vendas")
const Categoria = require("./router/Categoria")
const Documento = require("./router/documento")
const Atendimento = require("./router/atendimento")
const AtendimentoProduto = require("./router/atendimentoProduto")


app.use("/", Estoque)
app.use("/", Mesas)
app.use("/", Garcom)
app.use("/", Vendas)
app.use("/", Categoria)
app.use("/", Documento)
app.use("/", Atendimento)
app.use("/", AtendimentoProduto)


app.listen(3000, () => {
    console.log('Running ConnectFood APP')
})