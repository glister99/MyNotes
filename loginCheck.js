document.getElementById("loginBtn").addEventListener("click", checkName);

//0 for name valid; 1 for invalid; 2 for empty input
var pwdState = 2;
var nameState = 2;

//used to get back to the index(further, pwd), from a name.
var userID;

//remove hints
document.getElementById("username").addEventListener("input", eraseNameFB);
document.getElementById("password").addEventListener("input", erasePwdFB);



function checkName(){
    var nameExist = false;
    var jsonData = JSON.parse(localStorage.getItem('allUsers'));
    
    var currentName = document.getElementById("usr");
    
    //console.log(jsonData[0].username);
    
    if(currentName.value == ""){
        //no name input
        nameState = 2;
        event.preventDefault();
        showNameFeedback(nameState);
        //checkPasswords();
    }
    else{
        //first user
        if(jsonData==null){
            nameState=1;
            showNameFeedback(nameState);
            event.preventDefault();
        }
        else{
            //check if a name exists
            for(var i=0; i<jsonData.users.length; i++) { 
                 console.log("checking exist");
                 //console.log(jsonData.users[i].username);

                 if(jsonData.users[i].username==currentName.value){
                       //exist
                     //console.log(currentName.value);
                    console.log("valid username");
                    nameExist = true;
                    //get the index
                     userID = i;
                }
                else{
                    console.log("invalid username");
                        //not registered
                }
            }
                console.log(userID);
            if(nameExist){
                nameState=0;
                checkPasswords();
            }
            else{
                nameState=1;
                showNameFeedback(nameState);
                event.preventDefault();
            }
        }
    }
}

function checkPasswords(){
    var password = document.getElementById("pwd");
    var jsonData = JSON.parse(localStorage.getItem('allUsers'));
    
    if(password.value==""){
        //no password input
        console.log("empty");
        pwdState = 2;
        showPwdFeedback(pwdState);
    }
    else{
        if(password.value==jsonData.users[userID].password){
            //correct
            console.log("correct");
            localStorage.setItem("currentUser",userID);
            pwdState = 0;
        }
        else{
            //wrong
            console.log("wrong");
            event.preventDefault();
            pwdState = 1;
            showPwdFeedback(pwdState);
        }
    }
    
}

function showPwdFeedback(pwdState){
    var hint = document.createElement("p");
    hint.setAttribute("id","pwdFB");
    
    //create two nodes for two situations
    var wrongNode = document.createTextNode( "Wrong password, please try again");
    var emptyNode = document.createTextNode( "Please enter your password");
    
    //append according to situations
    if(document.getElementById("pwdFB")==null){
        if(pwdState==1){
           hint.appendChild(wrongNode);
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
    var nonExistNode = document.createTextNode( "User does not exist, please sign up first");
    var emptyNode = document.createTextNode( "Please enter your username");
    
    //append according to situations
    if(document.getElementById("nameFB")==null){
        if(nameState==1){
           hint.appendChild(nonExistNode);
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