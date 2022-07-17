var date = new Date();
var day = date.toDateString();
var time = date.toLocaleTimeString();
var currentUser = localStorage.getItem("currentUser");
var itemToDelete;


document.getElementById("submitBtn").addEventListener("click", saveNote);
document.getElementById("deleteBtn").addEventListener("click", delNote);

document.getElementById("noteTitle").addEventListener("input", removeFB);

//grey out the delete button
document.getElementById("deleteBtn").disabled = true;

//set default for date and time
document.getElementById("time").defaultValue =time;
document.getElementById("date").defaultValue =day;


function saveNote(){
    var noteTitle = document.getElementById("noteTitle").value;
    
    var jsonData = JSON.parse(localStorage.getItem("allNotes"));
    
    console.log(noteTitle);
    
    if(noteTitle!=""){
        if(jsonData == null){
            jsonData = {"notes":[]};
        }

        var author = currentUser;
        var title = document.getElementById("noteTitle").value;
        var date = document.getElementById("date").value;
        var time = document.getElementById("time").value;
        var content = document.getElementById("content").value;

        //attempt to store notes info in user info JSON obj
        /*console.log(currentUser);
        if(title.value!=""){
            dataObj.users[currentUser].username.allNotes = noteID;
            dataObj.users[currentUser].username.title = title;

            noteID++;
        }
        console.log(dataObj.users[0].username.noteID);
            console.log(dataObj.users[0].username.title);
        console.log(dataObj.users[0]);*/

        jsonData.notes.push({
                            "author":author,
                            "title": title,
                            "date": date,
                            "time": time,
                            "content": content
                        });

        jsonData = JSON.stringify(jsonData);
        localStorage.setItem("allNotes", jsonData);

        update();
        //console.log("title ok");
        }
    else{
        //console.log("empty title");
        //show feed back: "title can't be empty"
        event.preventDefault();
        showFB();
    }
    }

function showSaved(){    
    //console.log("onload success");
    var jsonData = JSON.parse(localStorage.getItem("allNotes"));
    
    if(jsonData!=null){
        for(var i=0; i<jsonData.notes.length; i++){
            if(jsonData.notes[i]!=null){
                if(jsonData.notes[i].author==currentUser){
                    //delete placeholder
                    var toRevome = document.getElementById("placeholder");
                    if(toRevome != null){ 
                        toRevome.parentNode.removeChild(toRevome);
                    }
                    
                    //show saved
                    var li = document.createElement("li");
                    li.setAttribute("id",i+"li");

                    var div = document.getElementById("saved");
                    div.appendChild(li);

                    var a = document.createElement("a");
                    
                    a.setAttribute("id",i);
                    a.setAttribute("class","savedNotes");
                    var div2 = document.getElementById(i+"li");
                    //a.setAttribute("href","#");
                    div2.appendChild(a);
                    document.getElementById(i).innerHTML = "“"+ jsonData.notes[i].title +"”"+" Saved On "+jsonData.notes[i].date+" at "+jsonData.notes[i].time;

                    document.getElementById(i).addEventListener("click", function(){selectNote(this.id);});
                    
                    //console.log(jsonData.notes[i].title);
                    //console.log(jsonData.notes[i].date);
                }
            }
        }
    }
    /*else{
        //first user ever
        var item = document.createElement("li");
        item.setAttribute("id","noSaved");
        var emptyNode = document.createTextNode("Empty");
        item.appendChild(emptyNode);
        var div = document.getElementById("saved");
        div.appendChild(item);
    }
    else if(){
        //no note saved user
        var item = document.createElement("li");
        item.setAttribute("id","noSaved");
        var emptyNode = document.createTextNode("Empty");
        item.appendChild(emptyNode);
        var div = document.getElementById("saved");
        div.appendChild(item);   
            
    }*/ 
}

function selectNote(clickedID){
    
   /*console.log(document.getElementById("saved").getElementsByTagName("a")); 
   
    //de-highlight 
    document.getElementById("saved").getElementsByTagName("a").style.color = "#337ab7";
   
    //highlight current selected
    
    document.getElementById(clickedID).style.color = "red";*/
    
    //console.log("id="+clickedID);
    var jsonData = JSON.parse(localStorage.getItem("allNotes"));
    
    document.getElementById("editTitle").innerHTML = "Edit "+" “"+ jsonData.notes[clickedID].title+"”";
    
    //edit
    document.getElementById("noteTitle").defaultValue = jsonData.notes[clickedID].title;
    
    document.getElementById("time").defaultValue =jsonData.notes[clickedID].time;
    
    document.getElementById("date").defaultValue =jsonData.notes[clickedID].date;
    
    document.getElementById("content").defaultValue =jsonData.notes[clickedID].content;
    
    itemToDelete = clickedID;
    console.log(itemToDelete);
    
    document.getElementById("deleteBtn").disabled = false;
}

function update(){
    var jsonData = JSON.parse(localStorage.getItem("allNotes"));
    
    //delete uoriginal
    //console.log(jsonData.notes[itemToDelete]);
    delete jsonData.notes[itemToDelete];
    
    //refresh
    //console.log(jsonData.notes[itemToDelete]);
    jsonData = JSON.stringify(jsonData);
    localStorage.setItem("allNotes", jsonData);
    
    alert("All changes are saved.");
    
}

function delNote(){
    var jsonData = JSON.parse(localStorage.getItem("allNotes"));
    
    
    //confirm delete
    var r = confirm("Delete"+" “"+jsonData.notes[itemToDelete].title+"”？");
    if (r == true) {
        delete jsonData.notes[itemToDelete];
    }
    
    //refresh saved section
    jsonData = JSON.stringify(jsonData);
    localStorage.setItem("allNotes", jsonData);
    
}

function showFB(){
    if(document.getElementById("titleFB")==null){
        
    var hint = document.createElement("p");
    hint.setAttribute("id","titleFB");
    
    var emptyNode = document.createTextNode( "Please at least enter a title");
    
    hint.appendChild(emptyNode);
    var div = document.getElementById("titleDiv");
    div.appendChild(hint);
        
    }
}

function removeFB(){
    checkExisting = document.getElementById("titleFB");
    
    if(checkExisting != null){
        elementToRemove = document.getElementById("titleFB");
        
        elementToRemove.parentNode.removeChild(elementToRemove);
    }
}

/*function search(){
    var jsonData = JSON.parse(localStorage.getItem("allNotes"));
    var keywork = document.getElementById("search").value;
    
    if(jsonData!=null){
        for(var e =0; e <jsonData.notes.length; e++){
            if(keyword == jsonData.notes[e].title||keyword == jsonData.notes[e].date||keyword == jsonData.notes[e].time||keyword == jsonData.notes[e].content){
                if(jsonData.notes[e].title==currentUser){
                       //use "e" to show search results
                }
            }
        }
    }
}*/





