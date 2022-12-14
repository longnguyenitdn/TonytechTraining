const displaySidebarLabel = () => {
   let stringLabel = "";
   for (i = 0; i < labels.length; i++) {
      stringLabel += `<div id="sidebar_labels${labels[i].id}" class="sidebar-labels flex-row sidebar-row align-center cursor">
      <button  class=" button-icon sidebar-btn cursor avoid-clicks"><i class="fa-solid fa-tag avoid-clicks"></i></button>
      <p class="sidebar-text hiden avoid-clicks">${labels[i].name}</p>
   </div>`;
   }
   document.getElementById("labels").innerHTML = stringLabel;
   document.querySelectorAll(".sidebar-labels").forEach(node => {
      node.addEventListener("click", filterLabelByTagName);
   })
}

const displayEditLabelList = () => {
   let stringEditLabel = "";
   for (i = 0; i < labels.length; i++) {
      stringEditLabel += `<div id="labels_row${labels[i].id}" class="labels-row flex-row align-center flex-bet">
      <button class="button-icon cursor">
      <i class="fa-solid fa-tag "></i>
      <i id="rbtn${labels[i].id}" class="eraser fa-solid fa-eraser"></i>
      </button>
      <input id="label-name${labels[i].id}" class="label-name input" value="${labels[i].name}">
      <button id="eLabelBtn${labels[i].id}" class="edit-label-name button-icon cursor hiden"><i class="fa-solid fa-check"></i></button>
   </div>`;
   }
   document.getElementById("labels_list_edit").innerHTML = stringEditLabel;
   document.querySelectorAll(".eraser").forEach(node => {
      node.addEventListener("click", e => {
         document.getElementById("removeId").value = parseInt(e.target.id.slice(4));
         openRemoveConfirmModal(removeLabelWrap, removeLabelConf);
      })
   })
   document.querySelectorAll(".label-name").forEach(node => {
      node.addEventListener("click", e => {
         if (node.contains(e.target)) {
            editLabelId = parseInt(e.target.id.slice(10));
            handleEditLabelToSaveBtn();
         }
      })
   })
}


const filterLabelByTagName = e => {
   isFilter=true;
   let labelIdSidebar = parseInt(e.target.id.slice(14));
   filterList = notes.filter(item => labelIdSidebar == item.noteLabelId);
   displayNotes();
}



const handleAddNewLabel = () => {
   const label = getValueFromLabelModal();
   if (label.name) {
      labels.unshift(label);
      setListToStorage("labelList", labels);
      displayLabelList();
      clearEditLabelInput();
      closeEditLabelBtn();
   }
}

const handleRemoveLabel = () => {
   const deleteId = document.getElementById("removeId").value;
   labels = labels.filter(item => item.id !== parseInt(deleteId));
   setListToStorage("labelList", labels);
   displayLabelList();
   closeRemoveConfirmModal(removeLabelWrap, removeLabelConf);
}

const handleEditLabel = () => {
   const editLabelName = document.getElementById(`label-name${editLabelId}`).value;
   labels = labels.map(item => {
      if (item.id == editLabelId) {
         item.name = editLabelName;
      }
      return item;
   })
   setListToStorage("labelList", labels);
   displayLabelList();
   displayNotes();
   document.getElementById(`eLabelBtn${editLabelId}`).classList.add("hiden");
}

const mainLabels = () => {
   labels = getListFromStorage("labelList") || [];
   displaySidebarLabel();
   document.getElementById("editLabels").addEventListener("click", openEditLabelModal);
}


mainLabels();