const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
//npm i express-session
const session = require("express-session");

const Produto = require("./produtos/Produto");
const produtoController = require("./produtos/ProdutoController");
const User = require("./users/User");
const userController = require("./users/userController");

//EJS como view engine
app.set('view engine', 'ejs');

//Sessão
app.use(session({
     secret: 'projeto ninho segredo', cookie: { maxAge: 180000 }
}))

connection
    .authenticate()
    .then(()=>{
        console.log("conexao feita com o db");
    })
    .catch((msgErro)=>{
        console.log(msgErro);
    })

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

//apos o bodyparser
app.use("/", produtoController);
app.use("/", userController);

//definindo a pasta de arquivos estaticos
app.use(express.static('public'));

app.listen(8080, ()=>{
    console.log("app rodando");
});

app.get("/", (req, res)=>{
    res.render('index');
});
