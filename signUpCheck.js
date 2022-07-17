//var userCount = 0;
var userID;
//indicate if input is empty
// 0 for ...
var pwdState = 2;
var nameState = 2;

document.getElementById("signUpBtn").addEventListener("click", validateName);

//remove hints
document.getElementById("username").addEventListener("input", eraseNameFB);
document.getElementById("password").addEventListener("input", erasePwdFB);



function validateName(){
    var nameTaken = false;
    var jsonData = JSON.parse(localStorage.getItem("allUsers"));
    
    var currentName = document.getElementById("usr");
    
    //console.log(jsonData[0].username);
    
    if(currentName.value == ""){
        //no name input
        nameState = 2;
        event.preventDefault();
        showNameFeedback(nameState);
        comparePasswords();
    }
    else{
        //input
        
        if(jsonData==null){
            //first user
            nameState = 0;
            console.log("first user");
            userID=0;
            comparePasswords();
        }
        else{
            //not first user
            console.log("not first user");
            
            //check if a name is taken
            for(var i=0; i<jsonData.users.length; i++) {
               //validate existing 
               console.log("validating");
                console.log(jsonData.users[i].username);
               
                if(jsonData.users[i].username==currentName.value){
                   //taken
                    console.log("name taken");
                    nameTaken = true;
                    
                }
                else{
                    console.log("name not taken");
                    //not taken
                }
                console.log(i);
                userID=i+1;
                //localStorage.setItem("currentUser",userID);
            }
            
            if(nameTaken){
                nameState=1;
                comparePasswords();
                showNameFeedback(nameState);
                event.preventDefault();
            }
            else{
                nameState = 0;
                comparePasswords();
            }
        }
    }
}

function comparePasswords(){
    var password1 = document.getElementById("pwd1");
    var password2 = document.getElementById("pwd2");
    
    if(password1.value == password2.value){
        if(password1.value == ""){
            //no input
            pwdState = 2;
            showPwdFeedback(pwdState);
        }
        else{
            //match
            pwdState = 0;
           console.log("match");
            //console.log(nameState);
            if(nameState == 0){
                localStorage.setItem("currentUser", userID);
                storeData();
            }
        }
    }
    else{
        //not match
        pwdState=1;
        event.preventDefault();
        showPwdFeedback(pwdState);
    }
    
}

function showPwdFeedback(pwdState){
    var hint = document.createElement("p");
    hint.setAttribute("id","pwdFB");
    
    //create two nodes for two situations
    var matchNode = document.createTextNode( "Passwords don't match");
    var emptyNode = document.createTextNode( "Password fields are required");
    
    //append according to situations
    if(document.getElementById("pwdFB")==null){
        if(pwdState==1){
           hint.appendChild(matchNode);
            var div = document.getElementById("password");
            div.appendChild(hint);
        }
        else if(pwdState ==2){
            hint.appendChild(emptyNode);
            var div = document.getElementById("password");
            div.appendChild(hint);
        }
    }
}

function showNameFeedback(nameState){
    var hint = document.createElement("p");
    hint.setAttribute("id","nameFB");
    
    //create two nodes for two situations
    var takenNode = document.createTextNode( "The user name is taken");
    var emptyNode = document.createTextNode( "You need a user name to start");
    
    //append according to situations
    if(document.getElementById("nameFB")==null){
        if(nameState==1){
           hint.appendChild(takenNode);
            var div = document.getElementById("username");
            div.appendChild(hint);
            }
        else if(nameState==2){
        
            hint.appendChild(emptyNode);
            var div = document.getElementById("username");
            div.appendChild(hint);
        }
    }
}
    

function storeData(){
    var dObj = JSON.parse(localStorage.getItem("allUsers"));
    
    if(dObj == null){
        dObj = {"users":[]};
    }
    
    var username = document.getElementById("usr").value;
    var password = document.getElementById("pwd1").value;
    
    dObj.users.push({
                        //"userCount": userCount,
                        "username": username,
                        "password": password
                    });
    //userCount++;
    
    dObj = JSON.stringify(dObj);
    localStorage.setItem("allUsers", dObj);   
}

//erase hints when input starts
function eraseNameFB(){
    checkExisting = document.getElementById("nameFB");
    
    if(checkExisting != null){
        elementToRemove = document.getElementById("nameFB");
        
        elementToRemove.parentNode.removeChild(elementToRemove);
    }
}

function erasePwdFB(){
    checkExisting = document.getElementById("pwdFB");
    
    if(checkExisting != null){
        elementToRemove = document.getElementById("pwdFB");
        
        elementToRemove.parentNode.removeChild(elementToRemove);
    }
}








