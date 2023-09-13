const Sib=require('sib-api-v3-sdk')
require('dotenv').config();

exports.postForgotPassword= (req, res, next) => {

    const client =Sib.ApiClient.instance
    const apiKey=client.authentications['api-key']
    apiKey.apiKey=process.env.API_KEY
    const tranEmailApi=new Sib.TransactionalEmailsApi()

    const sender={
        email:'rashmiraj.tiwari.nit.17@gmail.com'
    }

    const receivers=[
        {
            email:req.body.email
        }
    ]

    tranEmailApi.sendTransacEmail({
        sender,
        to:receivers,
        subject:'First Time Sending Email Through Node',
        textContent:`Succefully receving email`
    }).then(console.log).catch(console.log)
    
};