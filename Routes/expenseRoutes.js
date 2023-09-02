const expenseController=require('../Controller/expenseController');
const express=require('express');
const router=express.Router();

router.get('/getExpenses',expenseController.getExpenses);
router.post('/postExpenses',expenseController.postExpenses);
router.put('/editExpenses/:ExpenseId',expenseController.editExpenses);
router.delete('/deleteExpenses/:ExpenseId',expenseController.deleteExpenses);
module.exports=router;