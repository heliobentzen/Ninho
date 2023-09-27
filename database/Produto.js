const Sequelize = require("sequelize");
const connection = require("./database");

const Produto = connection
    .define('produto', {
        titulo : { 
            type: Sequelize.STRING,
            allowNull: false
        },
        descricao : {
            type: Sequelize.TEXT,
            allowNull: false
        }
    });
Produto.sync({force: false});
module.exports = Produto;