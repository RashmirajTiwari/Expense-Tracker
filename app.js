const express=require('express');
const bodyParser=require('body-parser');
const sequelize=require('./util/database')
const app=express();
const cors = require('cors');
app.use(cors());

const userRoutes=require('./Routes/userRoutes');
const expenseRoutes=require('./Routes/expenseRoutes');
const purchaseRoutes=require('./Routes/purchaseRoutes');
const premiumFeatureRoutes=require('./Routes/premiumFeatureRoutes');
const User=require('./Model/userModel');
const Expense=require('./Model/expenseModel');
const Order=require('./Model/orders');

app.use(bodyParser.json());
app.use(userRoutes);
app.use(expenseRoutes);
app.use(purchaseRoutes);
app.use(premiumFeatureRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync().then(result=>{
    //console.log(result);
    app.listen(3000);
})
.catch(err=>console.log(err));
