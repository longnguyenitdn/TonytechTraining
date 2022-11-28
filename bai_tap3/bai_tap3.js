let isOpen = false;

const onclickOpenDetailModal = () => {

   document.getElementById("input_note_cover").classList.add("hiden");
   document.getElementById("input_note_detail").classList.remove("hiden");
}
const closeDetailModal = () => {
   document.getElementById("input_note_cover").classList.remove("hiden");
   document.getElementById("input_note_detail").classList.add("hiden");
}



document.body.addEventListener('click', e => {
   if (!isOpen) {
      const openNote = document.getElementById("input_note_cover");
      if (openNote.contains(e.target)) {
         onclickOpenDetailModal();
         isOpen=true;
      }
   }else{
      const closeNote= document.getElementById("input_note_detail");
      if(!closeNote.contains(e.target)){
         closeDetailModal();
         isOpen=false;
      }
   }
});