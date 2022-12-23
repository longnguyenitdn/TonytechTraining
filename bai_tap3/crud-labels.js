const displaySidebarLabel = () => {
   setLoading(false);
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
   handleActiveSidebarMenu();
}

const displayEditLabelList = () => {
   setLoading(false);
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

const handleAddNewLabel = async () => {
   let isExist = false;
   const label = getValueFromLabelModal();
   if (label.name !== "") {
      if (labels.length !== 0) {
         isExist = labels.some(node => node.name === label.name)
      }
      if (!isExist) {
         let link = `${url}/labels`;
         let method = 'POST';
         let obj = label;
         setLoading(true);
         try {
            const newLabel = await myFetch(link, method, obj);
            labels.unshift(newLabel);
            displayLabelList();
            closeEditLabelBtn();
            document.getElementById("exist_label").classList.add("hiden");
         } catch (error) {
            console.log(error);
         }
      } else {
         document.getElementById("exist_label").classList.remove("hiden");
      }
      clearEditLabelInput();
   }
}
const handleClearLabelNote = async (link,method,obj) =>{
   await myFetch(link,method,obj)
}
const handleRemoveLabel = async (id) => {
   let linkLabel = `${url}/labels/${id}`;
   let methodLabel = 'DELETE';

   setLoading(true);
   try {
      await myFetch(linkLabel, methodLabel)
      labels = labels.filter(item => item.id !== id);
      notes.forEach (node =>  {
         if (node.noteLabelId === id) {
            let linkNote = `${url}/notes/${node.id}`;
            let methodNote = 'PUT';
            let obj = {
               "title": node.title,
               "content": node.content,
               "noteLabelId": null
            }
            handleClearLabelNote(linkNote,methodNote,obj);
         }
      })
      notes = notes.map(item => {
         if (item.noteLabelId == id) {
            item.noteLabelId = null;
         }
         return item;
      })
      displayLabelList();
      if (id == labelIdSidebar) {
         isFilter = false;
      }
      displayNotes();
      closeRemoveConfirmModal(removeLabelWrap, removeLabelConf);
   } catch (error) {
      console.log(error);

   }
}


const handleEditLabel = async () => {
   let isExist = false;
   let editLabelName = document.getElementById(`label-name${editLabelId}`).value;
   isExist = labels.some(item => {
      if (editLabelName === item.name) {
         if (item.id !== editLabelId) {
            document.getElementById("exist_label").classList.remove("hiden");
            displayEditLabelList();
            return true;
         }
         return true;
      }
   })
   if (!isExist) {
      let link = `${url}/labels/${editLabelId}`;
      let method = 'PUT';
      let obj = {
         "name": editLabelName
      }
      setLoading(true);
      try {
         await myFetch(link, method, obj)
         labels = labels.map(item => {
            if (item.id === editLabelId) {
               item.name = editLabelName;
            }
            return item;
         })
      } catch (error) {
         console.log(error);
      }
      displayLabelList();
      displayNotes();
      document.getElementById("exist_label").classList.add("hiden");
   }
   document.getElementById(`eLabelBtn${editLabelId}`).classList.add("hiden");

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
   let link = `${url}/labels`;
   let method = 'GET';
   setLoading(true);
   try {
      myFetch(link, method)
         .then(data => {
            labels = data
            displayLabelList();
            document.getElementById("editLabels").addEventListener("click", openEditLabelModal);
            document.getElementById("remove_cancel_btn").addEventListener("click", closeRemoveConfirmModal);
            document.getElementById("remove_btn").addEventListener("click", () => {
               handleRemoveLabel(parseInt(document.getElementById("removeId").value));
            });
            removeLabelWrap.addEventListener("click", closeRemoveConfirmModal);
         })
   } catch (error) {
      console.log(error);
   }
}

mainLabels();