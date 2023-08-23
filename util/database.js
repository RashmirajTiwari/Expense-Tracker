const Sequelize=require('sequelize');
const sequelize=new Sequelize('Expense','root','#Rajnees1',{
    dialect:'mysql',
    host:'localhost'

})
module.exports=sequelize;