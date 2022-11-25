

const onclickOpenDetailModal =()=>{
   
      document.getElementById("input_note_cover").classList.add("hiden");
      document.getElementById("input_note_detail").classList.remove("hiden");
}
const closeDetailModal =()=>{
   document.getElementById("input_note_cover").classList.remove("hiden");
   document.getElementById("input_note_detail").classList.add("hiden");
}

document.getElementById("input_note").addEventListener("click",onclickOpenDetailModal);  

document.body.addEventListener('click', e => {
   if (!e.target.classList.contains('skip') ) {    
      closeDetailModal();
   }
});