const displaySidebarLabel = () => {
   console.log(labels);
   let stringLabel = "";
   for (i = 0; i < labels.length; i++) {
      stringLabel += `<div id="sidebar_labels${labels[i].id}" class="sidebar-labels flex-row sidebar-row align-center cursor active-menu">
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
            oldLabelName = document.getElementById(`label-name${editLabelId}`).value;
            handleEditLabelToSaveBtn();
         }
      })
   })
}


const filterLabelByTagName = e => {
   isFilter = true;
   labelIdSidebar = parseInt(e.target.id.slice(14));
   filterList = notes.filter(item => labelIdSidebar == item.noteLabelId);
   displayNotes();
}


const handleAddNewLabel = () => {
   let isExist = false;
   const label = getValueFromLabelModal();
   if (label.name !== "") {
      if (labels.length !== 0) {
         isExist = labels.some(node => node.name === label.name)
      }
      if (!isExist) {
         labels.unshift(label);
         setListToStorage("labelList", labels);
         displayLabelList();
         closeEditLabelBtn();
         document.getElementById("exist_label").classList.add("hiden");
      } else {
         document.getElementById("exist_label").classList.remove("hiden");
      }
      clearEditLabelInput();

   }

}

const handleRemoveLabel = (id) => {
   labels = labels.filter(item => item.id !== id);
   setListToStorage("labelList", labels);
   notes = notes.map(item => {
      if (item.noteLabelId == id) {
         item.noteLabelId = null;
      }
      return item;
   })
   setListToStorage("noteList", notes);
   displayLabelList();
   if (id == labelIdSidebar) {
      isFilter = false;
   }
   displayNotes();
   closeRemoveConfirmModal(removeLabelWrap, removeLabelConf);
}


const handleEditLabel = () => {
   let isExist = false;
   let editLabelName = document.getElementById(`label-name${editLabelId}`).value;
   isExist = labels.some(item => {
      if (editLabelName === item.name) {
         if (item.id !== editLabelId) {
            document.getElementById("exist_label").classList.remove("hiden");
            return true;
         }
         return true;
      }
   })
   if (!isExist) {
      labels = labels.map(item => {
         if (item.id === editLabelId) {
            item.name = editLabelName;
         }
         return item;
      })
      setListToStorage("labelList", labels);
      document.getElementById(`eLabelBtn${editLabelId}`).classList.add("hiden");
      displayLabelList();
      displayNotes();
      document.getElementById("exist_label").classList.add("hiden");
   }


}

const handleActiveSidebarMenu = () => {
   document.querySelectorAll(".active-menu").forEach(node => {
      node.addEventListener("click", e => {
         document.querySelectorAll(".active").forEach(node2 => {
            node2.classList.remove("active");
         })
         node.classList.add("active");
      })
   });
}

const mainLabels = () => {
   labels = getListFromStorage("labelList") || [];
   displaySidebarLabel();
   document.getElementById("editLabels").addEventListener("click", openEditLabelModal);
   handleActiveSidebarMenu();

}

mainLabels();