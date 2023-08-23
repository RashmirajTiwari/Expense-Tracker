const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const SignUp=sequelize.define('SignUp',{
    id:{
      type:Sequelize.INTEGER,
      autoIncrement:true,
      allowNull:false,
      primaryKey:true
    },
    name:Sequelize.STRING,
    email:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false,
    },
    password:Sequelize.STRING,
   
  })
  module.exports=SignUp;