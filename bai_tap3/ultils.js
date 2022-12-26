
const myFetch = (link,option,obj) => {
   let urlFetch ="http://localhost:3000";
   urlFetch += link;
   return fetch(urlFetch, {
      method:option,
      headers: {
         'Content-Type': 'application/json'
      },
      body: option==='GET' ? undefined : JSON.stringify(obj ? obj : {})
   })
   .then(res => res.json())
}

const setLoading = (statusLoading)=>{
if(statusLoading===true){
   document.getElementById("loading_modal").classList.remove("hiden");
}else{
   document.getElementById("loading_modal").classList.add("hiden");
}
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
      document.getElementById("detail_edit_note_content_wrap").classList.add("hiden");
   }
   isOpen = false;
}

const getValueFromNoteDetail = () => {
   let title = document.getElementById("input_note_title").value;
   let content = document.getElementById("input_note_content").value;
   let noteLabelId=parseInt(document.getElementById("input_note_label").value);

   const note = {
      title,
      content,
      noteLabelId: noteLabelId ? noteLabelId : null
   }
   return note;
}

// const setValueToDetailNote = editObj => {
//    let { title, content, noteLabelId } = editObj;
//    document.getElementById("input_note_title").value = title;
//    document.getElementById("input_note_content").value = content;
//    document.getElementById("input_note_label").value = noteLabelId;
// }


/*------------Labels------------*/

const closeRemoveConfirmModal = () => {
   removeLabeConfirmlWrap.classList.add("hiden");
}
const openRemoveConfirmModal = () => {
   removeLabeConfirmlWrap.classList.remove("hiden");
}

const displayLabelList = () => {
   displaySidebarLabel();
   displayEditLabelList();
}

const clearEditLabelInput = () => {
   document.getElementById("input_new_label").value = "";
}

const closeEditLabelBtn = () => {
   btnLeftLabel.classList.add("hiden");
   btnRightLabel.classList.add("hiden");
   clearEditLabelInput();
}

const getValueFromLabelModal = () => {
   const name = document.getElementById("input_new_label").value;
   const label = {
      name
   }
   return label;
}

const openEditLabelBtn = () => {
   btnLeftLabel.classList.remove("hiden");
   btnRightLabel.classList.remove("hiden");
   btnLeftLabel.addEventListener("click", closeEditLabelBtn);
   btnRightLabel.addEventListener("click", handleAddNewLabel);
}

const closeEditLabelModal = () => {
   
   editLabelContentWrap.classList.add("hiden");
}

const openEditLabelModal = () => {
   
   editLabelContentWrap.classList.remove("hiden");
   document.getElementById("input_new_label").addEventListener("click", openEditLabelBtn);
   document.getElementById("btn_done_edit_modal").addEventListener("click", closeEditLabelModal);
   displayEditLabelList();
   editWrapLabel.addEventListener("click", closeEditLabelModal);
}

const handleEditLabelToSaveBtn = () => {
   document.querySelectorAll(".edit-label-name").forEach(node => {
      if (parseInt(node.id.slice(9)) === editLabelId) {
         node.classList.remove("hiden");
         node.addEventListener("click", handleEditLabel);
      } else {
         node.classList.add("hiden");
      }
   })
}