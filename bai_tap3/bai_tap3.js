let isOpen = false;
let notes = [];


const clearNoteDetail = () =>{
   document.getElementById("note_title").value="";
   document.getElementById("note_content").value="";
}
const onclickOpenDetailModal = () => {
   document.getElementById("input_note_cover").classList.add("hiden");
   document.getElementById("input_note_detail").classList.remove("hiden");
}
const closeDetailModal = () => {
   document.getElementById("input_note_cover").classList.remove("hiden");
   document.getElementById("input_note_detail").classList.add("hiden");
}
const getValueFromNote = () => {
   let title = document.getElementById("note_title").value;
   let content = document.getElementById("note_content").value;
   console.log(title,content);
   const note = {
      title,
      content
   }
   return note;
}

const handleAddNewNote = () => {
   const note = getValueFromNote();
   if (note.title !== "" || note.content !== "") {
      notes.push(note);
   }
displayNotes();
clearNoteDetail()
}

const displayNotes = () => {
   let noteString = "";
   for (i = 0; i < notes.length; i++) {
      noteString += `<div class="notes-cover flex-row">
      <div id="note" class="note">
         <div class="note-wrap">
            <div class="note-title-wrap">
               <div class="flex-row flex-bet">
                  <span id="note_title" class="note_title pad10">${notes[i].title}</span>
                  <button class="button-icon cursor font-sz15 hiden display-note-icon note-pin-icon"><i class="fa-solid fa-thumbtack"></i></button>
               </div>
               <div class="note-content-cover">
                  <p id="note_content" class="note_content pad10">${notes[i].content}</p>
               </div>
            </div>
            <div class="note-icon flex-row flex-bet">
               <button class="button-icon cursor font-sz15 hiden display-note-icon"><i class="fa-solid fa-bullhorn"></i></button>
               <button class="button-icon cursor font-sz15 hiden display-note-icon"><i class="fa-solid fa-user-plus"></i></button>
               <button class="button-icon cursor font-sz15 hiden display-note-icon"><i class="fa-solid fa-palette"></i></button>
               <button class="button-icon cursor font-sz15 hiden display-note-icon"><i class="fa-solid fa-image"></i></button>
               <button class="button-icon cursor font-sz15 hiden display-note-icon"><i class="fa-solid fa-file-arrow-down"></i></button>
               <button class="button-icon cursor font-sz15 hiden display-note-icon"><i class="fa-solid fa-ellipsis"></i></button>
            </div>
         </div>
      </div>
   </div>`;
   }
   document.getElementById("display").innerHTML=noteString;
}

document.body.addEventListener('click', e => {
   if (!isOpen) {
      const openNote = document.getElementById("input_note_cover");
      if (openNote.contains(e.target)) {
         onclickOpenDetailModal();
         isOpen = true;
      }
   } else {
      const closeNote = document.getElementById("input_note_detail");
      if (!closeNote.contains(e.target)) {
         handleAddNewNote();
         closeDetailModal();
         isOpen = false;
      }
   }
});


