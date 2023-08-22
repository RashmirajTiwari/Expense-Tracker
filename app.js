const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const cors = require('cors');
app.use(cors());
const signupRoutes=require('./Routes/signupRoutes');
app.use(bodyParser.json());
app.use(signupRoutes);

app.listen(3000);
