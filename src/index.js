// Métodos HTTP: get, post, put, delete

// Tipos de paraâmentros:

// Query Params: req.query (Filtros, ordenação, paginação, ...)
// Route Params: request.params (Identificar um recurso na lateração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)

// put - quando quer editar alguma coisa

// MongoDB (Não-relacional)

const express = require("express");
const mongoose = require("mongoose")
const routes = require("./routes")

const app = express();

mongoose.connect("mongodb+srv://mateus08:mateus08081999@cluster0-5e8de.mongodb.net/omnistack?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

app.use(express.json()) // Falando para o express entender requisições no formato .json
// app.use(express.json()) vem antes de todos
app.use(routes)

app.listen(3333);