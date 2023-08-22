



//Sign Up
var submit = document.getElementById("submitBtn");
submit.addEventListener("click", async (e) => {
  
    try {
        var name = document.getElementById('name');
        var email = document.getElementById('email');
        var password = document.getElementById('password');
        
        let SignUp= {
            name:name.value,
            email:email.value,
            password:password.value
           }
          
          
       
           
        const res=  await axios.post("http://localhost:3000/user/SignUp",SignUp);
        
   
   
     
        name.value="";
        email.value="";
        password.value="";
       
        
    } catch (error) {
        console.log(error)

    }

})

