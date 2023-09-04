const express=require('express');
const bodyParser=require('body-parser');
const sequelize=require('./util/database')
const app=express();
const cors = require('cors');
app.use(cors());

const userRoutes=require('./Routes/userRoutes');
const expenseRoutes=require('./Routes/expenseRoutes');
const User=require('./Model/userModel');
const Expense=require('./Model/expenseModel');

app.use(bodyParser.json());
app.use(userRoutes);
app.use(expenseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize.sync().then(result=>{
    //console.log(result);
    app.listen(3000);
})
.catch(err=>console.log(err));
