const expenseController=require('../Controller/expenseController');
const userAuthentication=require('../middleware/auth')
const express=require('express');
const router=express.Router();

router.get('/getExpenses',userAuthentication.authenticate,expenseController.getExpenses);
router.post('/postExpenses',userAuthentication.authenticate,expenseController.postExpenses);
router.put('/editExpenses/:ExpenseId',expenseController.editExpenses);
router.delete('/deleteExpenses/:ExpenseId',expenseController.deleteExpenses);
module.exports=router;