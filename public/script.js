
//Sign Up
var submit = document.getElementById("submitBtn");
if(submit!=null){
    submit.addEventListener("click", async (e) => {
  
        try {
            var name = document.getElementById('name');
            var email = document.getElementById('email');
            var password = document.getElementById('password');
            if(name.value=="" || email.value==""|| password.value==""){
                
                alert("Please fill the fields");
            
            }else{
                let SignUp= {
                    name:name.value,
                    email:email.value,
                    password:password.value
                   }
                  
                const res=  await axios.post("http://localhost:3000/user/SignUp",SignUp);
                
                name.value="";
                email.value="";
                password.value="";
    
            }
            
    
        } catch (err) {
            var error=document.getElementById('error');
            error.innerHTML=`<h5 style="text-align: center;color:red">Email Already Exist..!!</h5>`
    
        }
    
    })
}

//login
var login = document.getElementById("loginBtn");
if(login!=null){
    login.addEventListener("click", async (e) => {
  
            var message=document.getElementById('message');
            var email = document.getElementById('email');
            var password = document.getElementById('password');
            if(email.value==""|| password.value==""){
                
                alert("Please fill the fields");
            
            }else{
                let login= {
                    email:email.value,
                    password:password.value
                   }
                  
                 await axios.post("http://localhost:3000/user/login",login).then(res=>{
                    
                    if(res.status===200){
                        
                        message.innerHTML=`<h5 style="text-align: center;color:green">${res.data.message}</h5>`
                    }
        
                    
                    
                    
                    
                }).catch(err=>{
                    const data=err.response.data.message;
                    if(err.response.status===401){
                        message.innerHTML=`<h5 style="text-align: center;color:red">${data}</h5>`
                    }
                    if(err.response.status===404){
                        message.innerHTML=`<h5 style="text-align: center;color:red">${data}</h5>`
                    }
                    
                })
               
                email.value="";
                password.value="";
    
            }
            
    
    })
}


