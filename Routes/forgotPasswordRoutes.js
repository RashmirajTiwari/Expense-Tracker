const forgotPasswordController=require('../Controller/forgotPassword');
const express=require('express');
const router=express.Router();
router.post('/password/forgotPassword',forgotPasswordController.postForgotPassword);

module.exports=router;