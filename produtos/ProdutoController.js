const express = require("express");
const router = express.Router();
const Produto = require("./Produto");

router.get("/produto/novo", (req, res)=>{
    res.render("produto/novo");
});

router.post("/salvarProduto", (req, res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Produto.create({
        titulo : titulo,
        descricao : descricao
    }).then(()=>{ 
        res.redirect("/");
    });    
});

router.get("/produtos", (req, res)=>{
    Produto.findAll({ raw : true }).then(produtos=>{
        console.log(produtos);
    });
    res.render("produtos/index");
});

module.exports = router;