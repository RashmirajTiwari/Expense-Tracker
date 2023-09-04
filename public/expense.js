var list = document.getElementById('items');
function getAllExpenses(){
    window.addEventListener("DOMContentLoaded", async () => {
        
            const token=localStorage.getItem('token');
            await axios.get("http://localhost:3000/getExpenses",{headers:{"Authorization":token}}).
            then(res=>{
                for (let i = 0; i < res.data.length; i++) {
                    list.innerHTML += 
                    `<li>
                    <span class="span" style="display:none">${res.data[i].id}</span>
                    <span class="span" >${res.data[i].itemName}</span>
                    <span class="span" >${res.data[i].category}</span>
                    <span class="span" >${res.data[i].price}</span>
                    <span class="span" >${res.data[i].quantity}</span>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                    </li>`
                }
            }).
            catch(err=>{
                console.log(err);
            })
           
      
})
}



//Add Expenses
var submit = document.getElementById("submitBtn");
submit.addEventListener("click", async (e) => {
  
    try {
        var ExpenseId = document.getElementById('ExpenseId');
        var itemName = document.getElementById('itemName');
        var category = document.getElementById('category');
        var price = document.getElementById('price');
        var quantity = document.getElementById('quantity');
        let expense= {
            itemName:itemName.value,
            category:category.value,
            price:price.value,
            quantity:quantity.value

        }
    
        const id=ExpenseId.value;
    if(id==''){
    //Add Expenses
    const token=localStorage.getItem('token');
    const res=  await axios.post("http://localhost:3000/postExpenses",expense,{headers:{"Authorization":token}});
    showExpenses(res);
   
    }else{
    //edit Expenses
    const res=  await axios.put(`http://localhost:3000/editExpenses/${id}`,expense);
    showExpenses(res);
    
   }
     
        itemName.value="";
        category.value="";
        price.value="";
        quantity.value=""
        
    } catch (error) {
        console.log(error)

    }

})

//Delete Expenses
list.addEventListener('click', async (e) => {
    try {
        if (e.target.classList.contains("delete-btn")) {
            if (confirm("Are You Sure ?")) {
                const li = e.target.parentElement;
                const id = li.firstElementChild.innerText
                list.removeChild(li);
                await axios.delete(`http://localhost:3000/deleteExpenses/${id}`);
              

            }
        } 
        

    } catch (err) {
        console.log(err)

    }
   
})
//Edit expenses

list.addEventListener('click', async (e) => {
    try {
        if (e.target.classList.contains("edit-btn")) {
                const li = e.target.parentElement;
                console.log(li.children[1])
                var ExpenseId = document.getElementById('ExpenseId');
                var itemName = document.getElementById('itemName');
                var category = document.getElementById('category');
                var price = document.getElementById('price');
                var quantity = document.getElementById('quantity');

        
                ExpenseId.value = li.children[0].innerText;
                itemName.value = li.children[1].innerText;
                category.value = li.children[2].innerText;
                price.value = li.children[3].innerText;
                quantity.value = li.children[4].innerText
                list.removeChild(li);
    } 
        

    } catch (err) {
        console.log(err)

    }
   
})


function showExpenses(res){
        list.innerHTML += 
        `<li>
        <span class="span" style="display:none">${res.data.id}</span>
        <span class="span" >${res.data.itemName}</span>
        <span class="span" >${res.data.category}</span>
        <span class="span" >${res.data.price}</span>
        <span class="span" >${res.data.quantity}</span>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
        </li>`
    

}

getAllExpenses();