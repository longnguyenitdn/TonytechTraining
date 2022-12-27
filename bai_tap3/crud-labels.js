const displaySidebarLabel = () => {
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
const displayCheckboxLabelList = () => {
   let stringCheckboxLabel = `<label for="labelsAll">Choose a label:</label>
   <select name="labelsAll" id="labelsAll">`;
   for (i = 0; i < labels.length; i++) {
      stringCheckboxLabel += `<option value="${labels[i].id}">${labels[i].name}</option>`;
   }
   stringCheckboxLabel += `</select>`;
   stringCheckboxLabel += `<input id='btn_submit' class="btn-submit cursor btn-close" type="submit" value="Set Label">`;
   document.getElementById('labelAllCheckbox').innerHTML = stringCheckboxLabel;
   document.getElementById('btn_submit').addEventListener('click', handelAddLabelToCheckboxNote);
}

const handelAddLabelToCheckboxNote = () => {
   let labelId = parseInt(document.getElementById('labelsAll').value);
   checkboxListId.forEach(node => {
      let link = `/notes/${node}`;
      let method = 'PUT';
      let obj = notes.find(item => item.id === node)
      obj.noteLabelId = labelId;
      handleLabelInNote(link,method,obj);
      notes = notes.map(item => {
         if (item.id === node) {
            item.noteLabelId = labelId;
         }
         return item;
      })
   })
   checkboxListId.length=0;
   displayNotes();
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
         let link = '/labels';
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
         setLoading(false);

      } else {
         document.getElementById("exist_label").classList.remove("hiden");
      }
      clearEditLabelInput();
   }
}

const handleLabelInNote = async (link, method, obj) => {
   setLoading(true);
   try {
      await myFetch(link, method, obj)
   } catch (error) {
      console.log(error);
   }
   setLoading(false);
}

const handleRemoveLabel = async (id) => {
   let linkLabel = `/labels/${id}`;
   let methodLabel = 'DELETE';

   setLoading(true);
   try {
      await myFetch(linkLabel, methodLabel)
      labels = labels.filter(item => item.id !== id);
      notes.forEach(node => {
         if (node.noteLabelId === id) {
            let linkNote = `/notes/${node.id}`;
            let methodNote = 'PUT';
            let obj = {
               "title": node.title,
               "content": node.content,
               "noteLabelId": null
            }
            handleLabelInNote(linkNote, methodNote, obj);
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
      closeRemoveConfirmModal();
   } catch (error) {
      console.log(error);
   }
   setLoading(false);
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
      let link = `/labels/${editLabelId}`;
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
         displayLabelList();
         displayNotes();
         document.getElementById("exist_label").classList.add("hiden");
      } catch (error) {
         console.log(error);
      }
      setLoading(false);
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

const mainLabels = async () => {
   let link = '/labels';
   let method = 'GET';
   setLoading(true);
   try {
      labels = await myFetch(link, method)
      displayLabelList();
      document.getElementById("editLabels").addEventListener("click", openEditLabelModal);
      document.getElementById("remove_cancel_btn").addEventListener("click", closeRemoveConfirmModal);
      document.getElementById("remove_btn").addEventListener("click", () => {
         handleRemoveLabel(parseInt(document.getElementById("removeId").value));
      });
      removeLabelWrap.addEventListener("click", closeRemoveConfirmModal);


   } catch (error) {
      console.log(error);
   }
   setLoading(false);
}

mainLabels();