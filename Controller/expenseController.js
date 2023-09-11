
const Expense=require('../Model/expenseModel');
const User=require('../Model/userModel');
exports.postExpenses= (req, res, next) => {
    const itemName = req.body.itemName;
    const category = req.body.category;
    const price = req.body.price;
    const quantity = req.body.quantity;
    req.user.createExpense({
      itemName:itemName,
      category:category,
      price:price,
      quantity:quantity

    }
    ).then(expense=>{
      const totalExpense=Number(req.user.totalExpenses)+Number(price);
      User.update({totalExpenses:totalExpense},{where:{id:req.user.id}}).then(()=>{
        res.status(200).json({expense:expense});
      }).catch(err=>{
        res.status(500).json({success:false,error:err});
      })
    }).catch(err=>{
      console.log(err);
    })
};

exports.editExpenses = (req, res, next) => {
  const ExpenseId=req.params.ExpenseId;
  const upatedItemName = req.body.itemName;
  const upatedtCategory = req.body.category;
  const upatedtPrice = req.body.price;
  const upatedtQuantity = req.body.quantity;
  Expense.findByPk(ExpenseId).then(expense=>{
    expense.itemName=upatedItemName;
    expense.category=upatedtCategory;
    expense.price=upatedtPrice;
    expense.quantity=upatedtQuantity;
    return expense.save();
    
  }).then((expense)=>{
    console.log("Updated Product...!")
    res.json(expense);
  })
  .catch(err=>{
    console.log(err);
  })
 
};

exports.getExpenses = (req, res, next) => {
  Expense.findAll({where:{userId:req.user.id}}).then(results=>{
  res.json(results);
  }).catch(err=>{
    console.log(err);
  })
};

exports.deleteExpenses = (req, res, next) => {
  const ExpenseId=req.params.ExpenseId;
  Expense.findByPk(ExpenseId).then(expenses=>{
    return expenses.destroy();
  }).then(()=>{
    console.log("Deleted Product...!")
  })
  .catch(err=>{
    console.log(err);
  })
  
};