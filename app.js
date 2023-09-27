const express=require('express');
const bodyParser=require('body-parser');
const sequelize=require('./util/database')
const app=express();
const cors = require('cors');
const path=require('path');
const fs=require('fs');




const userRoutes=require('./Routes/userRoutes');
const expenseRoutes=require('./Routes/expenseRoutes');
const purchaseRoutes=require('./Routes/purchaseRoutes');
const premiumFeatureRoutes=require('./Routes/premiumFeatureRoutes');
const forgotPasswordRoutes=require('./Routes/forgotPasswordRoutes');
const User=require('./Model/userModel');
const Expense=require('./Model/expenseModel');
const Order=require('./Model/orders');
const ForgotPassword=require('./Model/forgotPassword');
const morgan=require('morgan');
require('dotenv').config();

const accessLogStream=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})




app.use(morgan('combined',{stream:accessLogStream}));
app.use(cors());
app.use(bodyParser.json());
app.use(userRoutes);
app.use(expenseRoutes);
app.use(purchaseRoutes);
app.use(premiumFeatureRoutes);
app.use(forgotPasswordRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgotPassword);
ForgotPassword.belongsTo(User);



app.use(bodyParser.urlencoded({ extended: true }));

sequelize.sync().then(result=>{
    //console.log(result);
    app.listen(process.env.PORT);
})
.catch(err=>console.log(err));
