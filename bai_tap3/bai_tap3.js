const displayDetailNoteModal = () => {
   let obj = {};
   if (isAdd) {
      obj = { title: "", content: "" };
   } else {
      obj = notes.find(item => item.id == editId);
   }
   return ` <div id="input_note_detail" class="take-note-detail">
   <div class="flex-row flex-bet align-center">
      <input id="input_note_title" class="input skip" type="text" placeholder="Title" value="${obj.title}">
      <button class="pin-icon button-icon cursor font-sz17"><i class="fa-solid fa-thumbtack"></i></button>
   </div>
   <div>
      <input id="input_note_content" class="input skip" type="text" placeholder="Take a note..." value="${obj.content}"> 
   </div>
   <div class="flex-row flex-bet align-center">
      <div class="button-icon-wrap flex-row flex-bet align-center">
         <button class="button-icon cursor font-sz15"><i class="fa-solid fa-bullhorn"></i></button>
         <button class="button-icon cursor font-sz15"><i class="fa-solid fa-user-plus"></i></button>
         <button class="button-icon cursor font-sz15"> <i class="fa-solid fa-palette"></i></button>
         <button class="button-icon cursor font-sz15"><i class="fa-solid fa-image"></i></button>
         <button class="button-icon cursor font-sz15"><i class="fa-solid fa-file-arrow-down"></i></button>
         <button class="button-icon cursor font-sz15"><i class="fa-solid fa-ellipsis"></i></button>
         <button class="button-icon cursor font-sz15"><i class="fa-solid fa-angles-left"></i></button>
         <button class="button-icon cursor font-sz15"><i class="fa-solid fa-angles-right"></i></button>
      </div>
      <div><button id="close_detail_modal" class="btn-close button-icon cursor font-sz15">Close</button></div>
   </div>
</div>`;
}

const handleAddNewNote = () => {
   const note = getValueFromNoteDetail();
   if (note.title !== "" || note.content !== "") {
      notes.unshift(note);
      setListToStorage(notes);
      displayNotes();
      document.getElementById(`note${notes[0].id}`).classList.add("delay");
      setTimeout(() => {
         document.getElementById(`note${notes[0].id}`).classList.remove("delay");
      }, 1000);
   }
   closeDetailModal();
}


const onclickToEdit = e => {
   editId = parseInt(e.target.closest(".note").getAttribute("data-id"));
   setValueToDetailNote(notes.find(item => item.id === editId))
   document.getElementById("detail_edit_note_wrap").classList.remove("hiden");
   document.getElementById("detail_edit_note_content").innerHTML = displayDetailNoteModal();
   document.getElementById("close_detail_modal").addEventListener("click", closeDetailModal);
   document.getElementById("detail_edit_note_wrap").addEventListener("click", handleEditNote);
}


const handleEditNote = () => {
   let editObj = getValueFromNoteDetail();
   let { title, content } = editObj;
   notes = notes.map((item) => {
      if (item.id == editId) {
         item.title = title;
         item.content = content;
      }
      return item;
   })
   closeDetailModal();
   setListToStorage(notes);
   displayNotes()
}


const openOptionModal = e => {
   const openOption = document.getElementById("note_option");
   document.getElementById("optionId").value = parseInt(e.target.id.slice(11));
   openOption.classList.remove("hiden");
   openOption.style.top = window.event.clientY + 10 + "px";
   openOption.style.left = window.event.clientX - 20 + "px";
   e.stopPropagation();
   document.getElementById("delete_note").addEventListener("click", handleDeleteNote);
   document.body.addEventListener('click', e => {

      if (!openOption.contains(e.target)) {
         openOption.classList.add("hiden");
      }
   });
}
const closeOptionModal = () => {
   document.getElementById("note_option").classList.add("hiden");
}
const handleDeleteNote = () => {
   let deleteId = parseInt(document.getElementById("optionId").value);
   notes = notes.filter(person => person.id !== deleteId);
   setListToStorage(notes);
   closeOptionModal();
   displayNotes();
}

const displayNotes = () => {
   let noteString = "";
   for (i = 0; i < notes.length; i++) {
      noteString += `<div class="notes-cover flex-row">
      <div id="note${notes[i].id}" class="note" data-id="${notes[i].id}">
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
               <button id="btn_option_${notes[i].id}" class="btn-note-option button-icon cursor font-sz15 hiden display-note-icon"><i class="fa-solid fa-ellipsis"></i></button>
            </div>
         </div>
      </div>
   </div>`;
   }
   document.getElementById("display").innerHTML = noteString;
   document.querySelectorAll(".note .note-title-wrap").forEach(node => {
      node.addEventListener("click", onclickToEdit)
   });
   document.querySelectorAll(".btn-note-option").forEach(node => {
      node.addEventListener("click", openOptionModal)
   });
}

const clickOutside = () => {
   /* 
   1.to open Detail modal.
   2. to add new.
   */
   document.body.addEventListener('click', e => {
      if (!isOpen) {
         const openNote = document.getElementById("input_note_cover");
         if (openNote.contains(e.target)) {
            isAdd = true;
            openDetailModal();
         }
      } else {
         const closeNoteDetail = document.getElementById("input_note_detail");
         if (!closeNoteDetail.contains(e.target)) {
            handleAddNewNote();
         }
      }
   });
}
const handleMenuBtn = () => {
   const bodyContent = document.getElementById("body_content");
   const sideBar = document.getElementById("sidebar");
   if (!menuBtnStatus) {
      bodyContent.classList.add("menu-padding-left");
      sideBar.classList.add("click-menu");
      menuBtnStatus = true;
   } else {
      bodyContent.classList.remove("menu-padding-left");
      sideBar.classList.remove("click-menu");
      menuBtnStatus = false;
   }

}
const main = () => {
   notes = getListFromStorage("noteList") || [];
   clickOutside();
   displayNotes();
   document.getElementById("header_menu_icon").addEventListener("click", handleMenuBtn);
}

main();


