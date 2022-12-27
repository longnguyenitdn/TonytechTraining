const displayDetailNoteModal = () => {
   let obj = {};
   if (isAdd) {
      obj = { title: "", content: "", noteLabelId: "" };
   } else {
      obj = notes.find(item => item.id == editId);
   }
   return ` <div id="input_note_detail" class="take-note-detail">
   <div class="flex-row flex-bet align-center">
      <input id="input_note_title" class="input-note-title input skip" type="text" placeholder="Title" value="${obj.title}">
      <button class="pin-icon button-icon cursor font-sz17"><i class="fa-solid fa-thumbtack"></i></button>
   </div>
   <div>
      <input id="input_note_content" class="input-note-content input skip" type="text" placeholder="Take a note..." value="${obj.content}"> 
      <input type="hidden" id="input_note_label" class="input-note-content input skip" type="text"  value="${obj.noteLabelId}"> 
   </div>
   <div class="flex-row flex-bet align-center">
      <div class="button-icon-wrap flex-row flex-bet align-center">
         <button class="button-icon cursor font-sz15"><i class="fa-solid fa-bullhorn"></i></button>
         <button class="button-icon cursor font-sz15"><i class="fa-solid fa-user-plus"></i></button>
         <button class="button-icon cursor font-sz15"> <i class="fa-solid fa-palette"></i></button>
         <button class="button-icon cursor font-sz15"><i class="fa-solid fa-image"></i></button>
         <button class="button-icon cursor font-sz15"><i class="fa-solid fa-file-arrow-down"></i></button>
         <button class="option-btn button-icon cursor font-sz15"><i class="fa-solid fa-ellipsis"></i></button>
         <button class="button-icon cursor font-sz15"><i class="fa-solid fa-angles-left"></i></button>
         <button class="button-icon cursor font-sz15"><i class="fa-solid fa-angles-right"></i></button>
      </div>
      <div><button id="close_detail_modal" class="btn-close button-icon cursor font-sz15">Close</button></div>
   </div>
</div>`;
}

const handleAddNewNote = () => {
   const note = getValueFromNoteDetail();
   const link = '/notes';
   const option = 'POST';
   if (note.title !== "" || note.content !== "") {
      setLoading(true);

      myFetch(link, option, note)
         .then(data => {
            notes.unshift(data);
            displayNotes();
            setTimeout(() => {
               document.getElementById(`note${notes[0].id}`).classList.add("delay");
               setTimeout(() => {
                  document.getElementById(`note${notes[0].id}`).classList.remove("delay");
               }, 300);
            }, 200);
         })
         .catch(error => {
            console.log(error);
         })
         .finally(() => {
            setLoading(false);

         })
   }
   closeDetailModal();
}


const onclickToEdit = e => {
   editId = parseInt(e.target.closest(".note").getAttribute("data-id"));
   document.getElementById("detail_edit_note_content_wrap").classList.remove("hiden");
   document.getElementById("detail_edit_note_content").innerHTML = displayDetailNoteModal();
   document.getElementById("close_detail_modal").addEventListener("click", closeDetailModal);
   document.getElementById("detail_edit_note_wrap").addEventListener("click", handleEditNote);
}

const handleEditNote = () => {
   let editObj = getValueFromNoteDetail();
   let { title, content, noteLabelId } = editObj;
   let link = `/notes/${editId}`;
   let method = 'PUT';
   setLoading(true);

   myFetch(link, method, editObj)
      .then(() => {
         notes = notes.map(item => {
            if (item.id === editId) {
               item.title = title;
               item.content = content;
               item.noteLabelId = noteLabelId;
            }
            return item;
         })
         closeDetailModal();
         displayNotes();
      })
      .catch(error => {
         console.log(error);
      })
      .finally(() => {
         setLoading(false);

      })
}

const displayHandleLabelModal = () => {
   closeOptionModal();
   let stringHandleLabelModal = `<div class="handle-label">
   <div class="handle-label-cover">
      <h5 class="text-black">Label note</h5>
      <input class="input text-black" type="text" placeholder="Enter label name">
   </div>
   <div class="handle-label-list flex-col">`;
   for (let i = 0; i < labels.length; i++) {
      stringHandleLabelModal += `<div class="handle-label-row flex-row align-center cursor id="label_row${labels[i].id}" data-labelId="${labels[i].id}">
            <input class="checkbox-label cursor" type="checkbox" id="checkbox${labels[i].id}">
            <label for="checkbox${labels[i].id}" class="text-black cursor">${labels[i].name}</label>
         </div>`;
   }
   stringHandleLabelModal += `</div>
   </div>`;

   document.getElementById("note_option_label").innerHTML = stringHandleLabelModal;


   document.querySelectorAll(".checkbox-label").forEach(node => {
      node.addEventListener("change", e => {
         handleAddNewLabeltoNote(e.target.id);

      });
   })
   handleCheckBoxStatus();
}

const handleAddNewLabeltoNote = id => {
   labelId = parseInt(id.slice(8));
   let editNote = notes.find(item => item.id === parseInt(document.getElementById("optionId").value))
   let { title, content } = editNote;
   let link = `/notes/${parseInt(document.getElementById("optionId").value)}`;
   let option = 'PUT';
   let objCheckBox = document.getElementById(id);
   if (objCheckBox.checked) {
      let obj = {
         "title": title,
         "content": content,
         "noteLabelId": labelId
      }
      setLoading(true);

      myFetch(link, option, obj)
         .then(() => {
            notes.map(item => {
               if (item.id === parseInt(document.getElementById("optionId").value)) {
                  item.noteLabelId = labelId;
               }
            });
            handleCheckBoxStatusAfterClick();
            displayNotes();
         })
         .catch(error => {
            console.log(error);
         })
         .finally(() => {
            setLoading(false);

         })
   } else {
      let obj = {
         "title": title,
         "content": content,
         "noteLabelId": null
      }
      setLoading(true);

      myFetch(link, option, obj)
         .then(() => {
            notes.map(item => {
               if (item.id === parseInt(document.getElementById("optionId").value)) {
                  item.noteLabelId = null;
               }
            });
            handleCheckBoxStatusAfterClick();
            displayNotes();
         })
         .catch(error => {
            console.log(error);
         })
         .finally(() => {
            setLoading(false);
         })
   }

}

const handleCheckBoxStatus = () => {
   let optionId = document.getElementById("optionId").value;
   let note = notes.find(item => item.id == optionId);
   labels.forEach(node => {
      if (node.id === note.noteLabelId) {
         document.getElementById(`checkbox${node.id}`).checked = true;
      } else {
         document.getElementById(`checkbox${node.id}`).checked = false;
      }
   })
}

const handleCheckBoxStatusAfterClick = () => {
   labels.forEach(node => {
      if (node.id !== labelId) {
         document.getElementById(`checkbox${node.id}`).checked = false;
      }
   })
}

const openOptionModal = e => {
   document.getElementById("optionId").value = parseInt(e.target.id.slice(11));
   openOption.classList.remove("hiden");
   openOptionCover.style.top = window.event.clientY + 10 + "px";
   openOptionCover.style.left = window.event.clientX - 20 + "px";
   e.stopPropagation();
}

const closeOptionLabelModal = () => {
   document.getElementById("note_option_label").innerText = "";
}

const closeOptionModal = () => {
   document.getElementById("note_option").classList.add("hiden");
}

const handleDeleteNote = () => {
   let deleteId = parseInt(document.getElementById("optionId").value);
   const link = `/notes/${deleteId}`;
   const option = 'DELETE';
   setLoading(true);

   myFetch(link, option)
      .then(() => {
         notes = notes.filter(item => item.id !== deleteId)
         closeOptionModal();
         displayNotes();
      })
      .catch(error => {
         console.log(error);
      })
      .finally(() => {
         setLoading(false);

      })
}

const removeLabelFromNote = e => {
   let removeNoteId = parseInt(e.target.id.slice(14));
   let editNote = notes.find(item => item.id === removeNoteId)
   let { title, content, noteLabelId } = editNote;
   let link = `/notes/${removeNoteId}`;
   let option = 'PUT';
   let obj = {
      "title": title,
      "content": content,
      "noteLabelId": null
   }
   setLoading(true);

   myFetch(link, option, obj)
      .then(() => {
         notes.map(item => {
            if (item.id == removeNoteId) {
               return item.noteLabelId = "";
            }
         })
         displayNotes();
      })
      .catch(error => {
         console.log(error);
      })
      .finally(() => {
         setLoading(false);
      })
   e.stopPropagation();
}

const showAllNotes = () => {
   isFilter = false;
   displayNotes();
}

const displayNotesWithFilter = () => {
   let list = [];
   if (isFilter) {
      list = filterList;
   } else {
      list = notes;
   }
   return list;
}

const handleCheckBoxAll = id => {
   const checkAllId = parseInt(id.slice(12));
   let isExist = checkboxListId.some(node => {
      if (checkAllId === node) {
         return true;
      }
   })

   if (isExist) {
      checkboxListId = checkboxListId.filter(item => item !== checkAllId);
      document.getElementById(`note_wrap${checkAllId}`).classList.remove("border-checkbox");
   } else {
      checkboxListId.push(checkAllId);
      document.getElementById(`note_wrap${checkAllId}`).classList.add("border-checkbox");
   }
   if (checkboxListId.length === 0) {
      document.getElementById('labelAllCheckbox').classList.add('hiden');
   } else {
      document.getElementById('labelAllCheckbox').classList.remove('hiden');
   }
}

const displayNotes = () => {
   let list = displayNotesWithFilter();
   let noteString = "";
   if (list.length !== 0) {
      for (i = 0; i < list.length; i++) {
         let labelInNote = labels.find(item => item.id === list[i].noteLabelId);
         noteString += `<div class="notes-cover flex-row">
         <div id="note${list[i].id}" class="note" data-id="${list[i].id}">
            <div id='note_wrap${list[i].id}' class="note-wrap">
            <button id='btn_checkAll${list[i].id}' class='btn-checkAll btn-bg cursor'><i class="fa-solid fa-check avoid-clicks"></i></button>
               <div class="note-title-wrap">
                  <div class="flex-row flex-bet">
                     <span id="note_title" class="note_title pad10">${list[i].title}</span>
                     <button class="button-icon cursor font-sz15 hiden display-note-icon note-pin-icon"><i class="fa-solid fa-thumbtack"></i></button>
                  </div>
                  <div class="note-content-cover">
                     <p id="note_content" class="note_content pad10">${list[i].content}</p>
                  </div>               
                  <div id="list_label${list[i].id}" class="list-label ${labelInNote ? "" : "hiden"}">
                  <p id="list_label_name${list[i].id}">${labelInNote ? labelInNote.name : ""}</p>
                  <button id="removeLabelBtn${list[i].id}" class="remove-label-btn button-icon cursor"><i class="fa-solid fa-xmark avoid-clicks"></i></button>
               </div>
               </div>
               <div class="note-icon flex-row flex-bet">
                  <button class="button-icon cursor font-sz15 hiden display-note-icon"><i class="fa-solid fa-bullhorn"></i></button>
                  <button class="button-icon cursor font-sz15 hiden display-note-icon"><i class="fa-solid fa-user-plus"></i></button>
                  <button class="button-icon cursor font-sz15 hiden display-note-icon"><i class="fa-solid fa-palette"></i></button>
                  <button class="button-icon cursor font-sz15 hiden display-note-icon"><i class="fa-solid fa-image"></i></button>
                  <button class="button-icon cursor font-sz15 hiden display-note-icon"><i class="fa-solid fa-file-arrow-down"></i></button>
                  <button id="btn_option_${list[i].id}" class="btn-note-option button-icon cursor font-sz15 hiden display-note-icon"><i class="fa-solid fa-ellipsis"></i></button>
               </div>
            </div>
         </div>
      </div>`;
      }
   } else {
      noteString = `<p class="nothing">${NOTI_NOT_FOUND}</p>`;
   }
   document.getElementById("display").innerHTML = noteString;
   document.querySelectorAll(".list-label .remove-label-btn").forEach(node => {
      node.addEventListener("click", removeLabelFromNote)
   });
   document.querySelectorAll(".note .note-title-wrap").forEach(node => {
      node.addEventListener("click", onclickToEdit)
   });
   document.querySelectorAll(".btn-note-option").forEach(node => {
      node.addEventListener("click", openOptionModal)
   });
   document.querySelectorAll('.btn-checkAll').forEach(node => {
      node.addEventListener("click", e => {
         handleCheckBoxAll(e.target.id)
      });
   })
}

const clickOutside = () => {
   /* 
   1.to open Detail modal.
   2. to add new.
   */
   document.body.addEventListener('click', e => {
      if (!isOpen) {
         const openNote = document.getElementById("input_note");
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
   const sideBarWrap = document.getElementById("sidebar_wrap");
   if (!menuBtnStatus) {
      bodyContent.classList.add("menu-padding-left");
      sideBarWrap.classList.add("click-menu");
      menuBtnStatus = true;
   } else {
      bodyContent.classList.remove("menu-padding-left");
      sideBarWrap.classList.remove("click-menu");
      menuBtnStatus = false;
   }
}

const mainNotes = () => {
   let link = '/notes';
   let option = 'GET';
   setLoading(true);
   myFetch(link, option)
      .then(data => {
         notes = data;
         displayNotes();
         clickOutside();
         document.getElementById("header_menu_icon").addEventListener("click", handleMenuBtn);
         document.getElementById("sidebar_btn_note").addEventListener("click", showAllNotes);
         document.getElementById("handle_label").addEventListener("click", displayHandleLabelModal);
         document.getElementById("delete_note").addEventListener("click", handleDeleteNote);
         document.body.addEventListener('click', e => {
            if (!openOption.contains(e.target)) {
               closeOptionModal();
            }
         });
         document.body.addEventListener('click', e => {
            if (!document.getElementById("note_option_cover").contains(e.target)) {
               closeOptionLabelModal();
            }
         });
      })
      .catch(error => {
         console.log(error);
      })
      .finally(() => {
         setLoading(false);
      })
}

mainNotes();


