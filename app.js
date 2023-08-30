const express=require('express');
const bodyParser=require('body-parser');
const sequelize=require('./util/database')
const app=express();
const cors = require('cors');
app.use(cors());
const signupRoutes=require('./Routes/signupRoutes');
app.use(bodyParser.json());
app.use(signupRoutes);

sequelize.sync().then(result=>{
    //console.log(result);
    app.listen(3000);
})
.catch(err=>console.log(err));
