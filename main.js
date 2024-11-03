let noteArea=document.querySelector(".note-area");
let Title=document.querySelector(".tittle");
let noteText=document.querySelector(".note-text");
let Notes=document.querySelector(".notes");
let Note=document.querySelector(".note");

const ShawNoteArea = () =>{
    noteText.style='display:block';
    noteArea.classList.add('note-now');
    Title.setAttribute('placeholder','title');
    Title.style ='font-size:20px';


}
const hideNoteArea= () =>{
    noteText.style='display:none';
    noteArea.classList.remove('note-now')

}
// qeebta marka wx tirto lagu dhigaayo local storageka
const AddNoteLocalStorage= (note) => {

    if(note.length < 0){
        return;
    }
    console.log(note);

    let oldNote;

    if(localStorage.getItem("notes") === null){
        oldNote= [];

    }else{
        oldNote=JSON.parse(localStorage.getItem('notes'));
   
    }

    oldNote.push(note);

    localStorage.setItem('notes',JSON.stringify(oldNote))
}

const GetNotesFromLocalSrorage=()=>{
    let oldNote;

    if(localStorage.getItem("notes") === null){
        oldNote= [];

    }else{
        oldNote=JSON.parse(localStorage.getItem('notes'));
   
    }
    oldNote.forEach(note => {
        Notes.innerHTML+=`
        <div class="note">
                    <h3 class="title-text" id="title-text">${note[0]}</h3>
                    <p class="note-blog ">${note[1]}
                    </p>
                    <i class="fa-solid fa-trash "></i>
                </div>` ;
        
    });

}

// inaa ka deleded localstorageka 
const deleteFromLocalStorage= (deletedNote) => {
    let oldNote;

    if(localStorage.getItem("notes") === null){
        oldNote= [];

    }else{
        oldNote=JSON.parse(localStorage.getItem('notes'));
   
    }
    // mapka wxu qabanayaa arry kuso waregaysaa mar walpa wxy so qabaneysaa array markas lamarayo
    oldNote.map((note,index) => {

        if(note[0] == deletedNote.children[0].textContent.trim() && note[1] ==
            deletedNote.children[1].textContent.trim()){
                // console.log("YEsss")
                oldNote.splice(index,1);
                return oldNote;
            }

    })
    localStorage.setItem('notes',JSON.stringify(oldNote));
}


// page wx dul yaalo marku so load gareesmo =domContentLoade
document.addEventListener("DOMContentLoaded",GetNotesFromLocalSrorage)


const addNote=(t,n)=>{
    Notes.innerHTML+=`
    <div class="note">
                <h3 class="title-text" id="title-text">${t}</h3>
                <p class="note-blog ">${n}
                </p>
                <i class="fa-solid fa-trash "></i>
            </div>` 
            Title.value ='';noteText.value ='';
}


noteArea.addEventListener('click',ShawNoteArea);

document.addEventListener('click',(event)=>{
    let isclicked = noteArea.contains(event.target);
    if(!isclicked){
        hideNoteArea();
        if(Title.value.length===0 && noteText.value.length===0){
            return;
        }
        else{
            AddNoteLocalStorage([Title.value, noteText.value]);
            addNote(Title.value,noteText.value);
            
        }
      
    }
})

document.addEventListener("mouseover",(event)=>{
    if(event.target.classList.contains('note')){
        event.target.querySelector('i').classList.add('show');
    }
})


document.addEventListener("mouseout",(event)=>{
    if(event.target.classList.contains('note')){
        event.target.querySelector('i').classList.remove('show');
    }
})

document.addEventListener("click",(event)=>{
    if(event.target.classList.contains("fa-trash")){
      event.target.parentElement.remove();
      deleteFromLocalStorage(event.target.parentElement);
        
    }
})


// finish this project at 31-10-2024 night-friday