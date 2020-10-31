const db = require('../connect/index');
const Sequelize = require('sequelize');


const User = db.define('users',{
    name:{
        type: Sequelize.STRING
    },
    email:{
        type: Sequelize.STRING
    },
    password: {
        type:Sequelize.STRING
    }
},
{
    timestamps: false
}
);

module.exports = User;