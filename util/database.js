require('dotenv').config();
const Sequelize=require('sequelize');
const DATABASE_NAME=process.env.DATABASE_NAME
const PASSWORD=process.env.PASSWORD
const sequelize=new Sequelize(DATABASE_NAME,'root',PASSWORD,{
    dialect:'mysql',
    host:'localhost'

})
module.exports=sequelize;