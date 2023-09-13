
const submit= document.getElementById('submit');
var email = document.getElementById('email');
    submit.addEventListener("click", async () => {
        if(email.value==""){
                
            alert("Please fill the field");
        
        }else{
            let forgotPassword= {
                email:email.value
               }
        
            
            await axios.post("http://localhost:3000/password/forgotPassword",forgotPassword).
            then((res)=>{
                console.log(res);
            }).
            catch(err=>{
                console.log(err);
            })
        } 
})

