const express = require("express");
const router = express.Router();
const User = require("./User");
//instalar: npm i bcrypt
const bcrypt = require("bcrypt");

router.get("/users", (req, res)=>{
    User.findAll().then(users=>{
        res.render("users/index", 
        {users : users})
    });
})

router.get("/usuario/novo", (req, res)=>{
    res.render("/users/novo");
});

router.post("/users/create", (req, res)=> {
   var email = req.body.email;
   var senha = req.body.senha;

   User.findOne({where : 
    { email : email}}.then(user => {
        if(user == undefined){

            const hash = bcrypt.hashSync(senha, 10);

            User.create({
                email : email,
                senha : hash
            }).then(()=> {
                res.redirect("/");   
            })

        }else{
            res.redirect("/");
        }
    }))  
});

router.get("/login", (req, res)=>{
    res.render("/users/login");
});

router.post("/autenticar", (req, res)=> {
    var email = req.body.email;
    var senha = req.body.senha;

    User.findOne({where : 
        { email : email}}).then(user=> {
            if(user != undefined){
                //validar senha
                var senhaCorreta = bcrypt.compareSync(senha, user.senha); // true
                if(senhaCorreta){
                    req.session.user = {
                        id : user.id,
                        email : user.email
                    }
                    res.redirect("/");
                }

            }
        })
});

router.get("/logout", (req, res)=>{
    req.session.user = undefined;
    res.redirect("/login");
});