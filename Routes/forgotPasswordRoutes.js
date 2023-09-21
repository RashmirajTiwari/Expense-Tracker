const forgotPasswordController=require('../Controller/forgotPassword');
const express=require('express');
const router=express.Router();
router.post('/password/forgotPassword',forgotPasswordController.forgotPassword);
router.get('/password/resetpassword/:id',forgotPasswordController.resetpassword);
router.get('/password/updatepassword/:resetpasswordid',forgotPasswordController.updatepassword);

module.exports=router;