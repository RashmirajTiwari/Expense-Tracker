require('dotenv').config();
const Sequelize=require('sequelize');
const DATABASE_NAME=process.env.DATABASE_NAME
const PASSWORD=process.env.PASSWORD
const sequelize=new Sequelize(process.env.DB_NAME,process.env.DB_USERNAME,process.env.DB_PASSWORD,{
    dialect:'mysql',
    host:process.env.DB_HOST

})
module.exports=sequelize;