const getListFromStorage = (list) => {
   return JSON.parse(localStorage.getItem(list));
}

const setListToStorage = (list) => {
   localStorage.setItem('noteList', JSON.stringify(list));
}

const clearNoteDetail = () => {
   document.getElementById("input_note_title").value = "";
   document.getElementById("input_note_content").value = "";
}

const openDetailModal = () => {
   document.getElementById("input_note_cover").classList.add("hiden");
   document.getElementById("detail_note").innerHTML = displayDetailNoteModal();
   document.getElementById("close_detail_modal").addEventListener("click", closeDetailModal);
   isOpen = true;
}

const closeDetailModal = () => {
   clearNoteDetail();
   if (isAdd) {
      document.getElementById("input_note_cover").classList.remove("hiden");
      document.getElementById("detail_note").innerHTML = "";
      isAdd = false;
   } else {
      document.getElementById("detail_edit_note_content").innerHTML = "";
      document.getElementById("detail_edit_note_wrap").classList.add("hiden");
   }
   isOpen = false;
}

const getValueFromNoteDetail = () => {
   let title = document.getElementById("input_note_title").value;
   let content = document.getElementById("input_note_content").value;
   const note = {
      id: Date.now(),
      title,
      content
   }
   return note;
}

const setValueToDetailNote = editObj => {
   let { title, content } = editObj;
   document.getElementById("note_title").value = title;
   document.getElementById("note_content").value = content;
}