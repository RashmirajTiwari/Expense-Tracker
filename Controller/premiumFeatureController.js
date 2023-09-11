const User=require('../Model/userModel');
const Expense=require('../Model/expenseModel');
const sequelize = require('../util/database');

const getUserLeaderboard = async(req,res,next)=>{

    try{
         const leaderBoard=await User.findAll({
            attributes:['id','name',[sequelize.fn('sum',sequelize.col('expenses.price')),'total_cost']],
            include:[
                {
                    model:Expense,
                    attributes:[]
                }
            ],
            group:['user.id'],
            order:[['total_cost','DESC']]
         });
         const expenses=await Expense.findAll({
            attributes:['userId',[sequelize.fn('sum',sequelize.col('expenses.price')),'total_cost']],
            group:['userId']
         });
       
         res.status(200).json(leaderBoard);

    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}
module.exports={
    getUserLeaderboard
}