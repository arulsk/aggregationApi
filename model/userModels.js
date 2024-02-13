

const Sequelize = require('sequelize');
const sequleize = require('../config/db');

const userAuth = sequleize.define("jwt", {
    userId : {
      type : Sequelize.INTEGER,
      primaryKey : true,
      autoIncrement: true 
    },
    userName: { 
      type: Sequelize.STRING,
      allowNull: false,
    },
    userEmail: { 
      type: Sequelize.STRING,
      allowNull: false,
    },
    userPassword: { 
      type: Sequelize.STRING(60),
      allowNull: false,
     },
    role : {
      type : Sequelize.STRING,
      allowNull: false,
    }

},{
    timestamps: false,
  });
  const createUser = async(userName,userEmail,hashPassword,role)=>{
    return await userAuth.create({
       userName,
       userEmail,
      userPassword :hashPassword,
       role
     })
   }

module.exports = {userAuth,createUser}