
let addBtn = document.getElementById('addBtn');
showNotes();
importantNote(index = null);

addBtn.addEventListener('click',(e)=>{
   
    let addText = document.getElementById('addText');
    let addTitle = document.getElementById('addTitle');


    let notes  = localStorage.getItem('notes');

    if(notes == null){
        notesObj = [];  // Creating a empty Object
    }
    else{
        notesObj = JSON.parse(notes); // Making Object from string by parse method of JSON
    }
    let myObj = {
        title : addTitle.value, 
        text : addText.value,
        checked : ""
        
    };
    // myObj.date = new Date;
    // console.log(myObj)

    if(addText.value.length >0 && addTitle.value.length >0){
        notesObj.push(myObj);  // pushing notes into notes Object 
    }
    localStorage.setItem('notes', JSON.stringify(notesObj)); //And set the notes into local storage
    addText.value = "" // assigned it empty for next tym taking notes 
    addTitle.value = "" // assigned it empty for next tym taking notes 
    showNotes();
    importantNote(index = null);

})

// FUNCTION FOR SHOWING NOTES ON SCREEN ------------------>>>>>>>>>>>>>>>>>>>>>>
function showNotes(){
    let notes  = localStorage.getItem('notes');

    if(notes == null){
        notesObj = [];  // Creating a empty Object
    }
    else{
        notesObj = JSON.parse(notes); // Making Object from string by parse method of JSON
    }

    let html = "";
    notesObj.forEach((element, index) =>{
        var today = new Date();
        var date = today.getDate() + '-' + (today.getMonth()+1) + '-' + today.getFullYear();
        notesObj[index].date = date;  

        html += `<div class="noteCard card m-2 items-center" style="width: 16rem;">
                    <div class="card-body">
                        <h5 class="card-title fw-bold d-inline">${element.title}</h5>
                        <span id="star${index}" class="star fa fa-star m-6 ${element.checked}" ></span>
                        <span id="" class="ms-2">${date}</span>
                        <hr>
                        <p id="noteDescription" class="card-text">${element.text}</p>
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-sm btn-danger me-2 ">Delete</button>
                        <button id="${index}" onclick="importantNote(this.id)" class="btn btn-sm btn-warning ">Important</button>
                    </div>
                </div>`
    })
    

    let showContent = document.getElementById('notesContainer');
    if(notesObj.length != 0){
    showContent.innerHTML = html;
    } 
    else{
        showContent.innerHTML = `<h6 class="text-center">Empty Notes, Adding Some usefull notes here. </h6>
                                <img src="img/emptyNotes3.png" class=" mx-auto  w-50" alt="Empty Notes">`
    }
    localStorage.setItem('notes', JSON.stringify(notesObj));
    importantNote(index = null);
    
}


// function for deleting notes ------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function deleteNote(index){
    let notes  = localStorage.getItem('notes');
    if(notes == null){
        notesObj = [];  // Creating a empty Object
    }
    else{
        notesObj = JSON.parse(notes); // Making Object from string by parse method of JSON
    }

    notesObj.splice(index, 1);  // this method delete the note by index 
    console.log(notesObj)
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes()

}


//Add event listener for SEARCH NOTES FUNCTIONALITY    --------------->>>>>>>>>>>>>>>>>>>>>>>>
let search = document.getElementById('search');

search.addEventListener('input', ()=>{

    let inputVal = search.value.toLowerCase();
    let cardNotes = document.getElementsByClassName('noteCard');

    Array.from(cardNotes).forEach((element)=>{
        let cartText = element.getElementsByTagName("p")[0].innerText;

        if(cartText.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })

    importantNote(index = null);

})

//Important notes   -------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function importantNote(index=null){

    if(index != null){
        let notes  = localStorage.getItem('notes');
        if(notes == null){
            notesObj = [];  // Creating a empty Object
        }
        else{
            notesObj = JSON.parse(notes); // Making Object from string by parse method of JSON
        }

        //Adding and removing important note star from local storage
        let star = document.getElementById(`star${index}`);
        if(Array.from(star.classList).includes('checked')){
            star.classList.remove('checked');
            notesObj[index].checked = ""
        }
        else{
            star.classList.add('checked');
            notesObj[index].checked = "checked";
        }

        localStorage.setItem('notes', JSON.stringify(notesObj)); //And set the notes into local storage
    }

}

