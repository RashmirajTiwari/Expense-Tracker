const User=require('../Model/userModel');
const Expense=require('../Model/expenseModel');
const sequelize = require('../util/database');

const getUserLeaderboard = async(req,res,next)=>{

    try{
         const leaderBoard=await User.findAll({
            order:[['totalExpenses','DESC']]
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