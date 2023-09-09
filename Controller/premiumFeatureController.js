const User=require('../Model/userModel');
const Expense=require('../Model/expenseModel');

const getUserLeaderboard = async(req,res,next)=>{

    try{
         const users=await User.findAll();
         const expenses=await Expense.findAll();
         const userAggregatedExpenses={};
         expenses.forEach((expense) => {
            if(userAggregatedExpenses[expense.userId]){
                userAggregatedExpenses[expense.userId]=userAggregatedExpenses[expense.userId]+expense.price
            }else{
                userAggregatedExpenses[expense.userId]=expense.price
            }
            
         });
         var userLeaderBoardDetails=[];
         users.forEach((user)=>{
            userLeaderBoardDetails.push({name:user.name,total_cost:userAggregatedExpenses[user.id] || 0})
         })
         userLeaderBoardDetails.sort((a,b)=>b.total_cost-a.total_cost)
         res.status(200).json(userLeaderBoardDetails);

    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}
module.exports={
    getUserLeaderboard
}