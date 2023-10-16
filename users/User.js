const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define("users", {
    email: {
        type: Sequelize.STRING,
        allow : false
    },
    senha: {
        type: Sequelize.STRING,
        allow : false
    }
})

User.sync({force: false});
module.exports = User