const express = require("express");
const router = express.Router();
const Produto = require("./Produto");
const auth = require("../middlewares/auth");

router.get("/produtos", auth, (req, res) => {
    Produto.findAll({ raw: true }).then(produtos => {
        res.render("produtos/index", {
            produtos: produtos
        });
    });

});

router.get("/produto/novo", auth, (req, res) => {
    res.render("produtos/novo");
});

router.post("/salvarProduto", auth, (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Produto.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/produtos");
    });
});

router.post("/produto/delete", auth, (req, res)=>{
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Produto.destroy({
                where : {
                    id : id
                }
            }).then(()=>{
                res.redirect("/produtos");
            })
        }else{
            res.redirect("/");    
        }
    }else{
        res.redirect("/");
    }
    
});


router.get("/produto/edit/:id", auth, (req, res)=>{
    var id = req.params.id;
    Produto.findByPk(id).then(produto => {
        res.render("produtos/edit", { produto : produto})
    });
});

router.post("/produto/edit", auth, (req, res)=>{
    var id = req.body.id;
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Produto.update({ titulo : titulo, descricao : descricao},{
        where : {
            id : id
        }
    }).then(()=>{
        res.redirect("/produtos");
    }).catch(err => {
        console.log(err);
        res.redirect("/");
    });
});

module.exports = router;