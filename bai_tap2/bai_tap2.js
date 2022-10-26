function open_modal(){

  let element= document.getElementById("modal");
  element.classList.remove("hide");
  document.getElementById("modal-wrapper").classList.remove("hide");
  document.getElementById("modal-backdrop").classList.remove("hide");
}
function close_modal(){
   
   let element=document.getElementById("modal");
   element.classList.add("hide");
   
}

