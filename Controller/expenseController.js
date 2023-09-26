
const Expense=require('../Model/expenseModel');
const User=require('../Model/userModel');
const sequelize = require('../util/database');
const userservices=require('../Services/userservices')
const S3Services=require('../Services/S3services');
const { json } = require('body-parser');



exports.postExpenses= async(req, res, next) => {
    const t= await sequelize.transaction();
    const itemName = req.body.itemName;
    const category = req.body.category;
    const price = req.body.price;
    const quantity = req.body.quantity;
    req.user.createExpense({
      itemName:itemName,
      category:category,
      price:price,
      quantity:quantity
    },
    {transaction:t}
    ).then(expense=>{
      const totalExpense=Number(req.user.totalExpenses)+Number(price);
      User.update({totalExpenses:totalExpense},{where:{id:req.user.id},transaction:t}).then(async()=>{
        await t.commit();
        res.status(200).json({expense:expense});
      }).catch(async(err)=>{
        await t.rollback();
        res.status(500).json({success:false,error:err});
      })
    }).catch(async(err)=>{
      await t.rollback();
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
  const page = +req.query.page;
  const ITEM_PER_PAGE=+req.query.limit;
  console.log(page)
  let totalItems;
  
  Expense.count().then((total)=>{
    totalItems=total;
    return Expense.findAll({
      where:{userId:req.user.id},
      offset:(page-1)* ITEM_PER_PAGE,
      limit:ITEM_PER_PAGE
    });
  }).then((expenses)=>{
      console.log("raj "+JSON.stringify(expenses))
      res.json({
        expenses:expenses,
        currentPage:page,
        hasNextPage:ITEM_PER_PAGE * page < totalItems,
        nextPage:page+1,
        hasPreviousPage:page>1,
        previousPage:page-1,
        lastPage:Math.ceil(totalItems/ITEM_PER_PAGE)


      });
  }).catch(err=>{
    console.log(err);
  })



  // Expense.findAll({where:{userId:req.user.id}}).then(results=>{
  // res.json(results);
  // }).catch(err=>{
  //   console.log(err);
  // })
};

exports.deleteExpenses = async(req, res, next) => {
  const t= await sequelize.transaction();
  const ExpenseId=req.params.ExpenseId;
  Expense.findByPk(ExpenseId,{transaction:t}).then(expenses=>{
     expenses.destroy().then((expense)=>{
    const totalExpense=Number(req.user.totalExpenses)-Number(expense.price);
    User.update({totalExpenses:totalExpense},{where:{id:req.user.id},transaction:t}).then(async()=>{
      await t.commit();
      res.status(200).json({expense:expense});
    }).catch(async(err)=>{
      await t.rollback();
      res.status(500).json({success:false,error:err});
    })
     });
  }).catch(async(err)=>{
     await t.rollback();
    res.status(501).json({success:false,error:err});
  })
  
};



exports.downloadExpenses= async(req,res,next)=>{
  try{

  const expenses=await userservices.getExpenses(req);
  const stringifiedExpenses=JSON.stringify(expenses);
  const userId=req.user.id;
  const filename=`Expense${userId}/${new Date()}.txt`;
  const fileUrl= await S3Services.uploadToS3(stringifiedExpenses,filename);
  res.status(200).json({fileUrl,success:true});

  }catch(err){
    res.status(500).json({fileUrl:'',success:false,err:err});
  }

}