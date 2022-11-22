const getListFromStorage = (sList) => {
   return JSON.parse(localStorage.getItem(sList));
}


const setListToStorage = (list) => {
   localStorage.setItem('personList', JSON.stringify(list));
}


const showDeleteCheckedBtn = (checkedList) => {
   document.getElementById("delete_multiple").innerHTML = checkedList.length;
   if (checkedList.length > 0) {
      document.getElementById("btn_show_checked").classList.remove("hide");
   } else {
      document.getElementById("btn_show_checked").classList.add("hide");
   }
}


const handleCheckBox = () => {
   flag = true;
   document.querySelectorAll(".form-check-input").forEach(node => {
      if (!node.checked) {
         flag = false;
      }
   });
   if (flag) {
      document.getElementById("select_all_checked").checked = true;
   } else {
      document.getElementById("select_all_checked").checked = false;

   }
}

const clearForm = () => {
   document.getElementById("my_form").reset();
   isAdd = true;
}

const openModal = () => {
   document.getElementById("search").value="";
   document.getElementById("modal_wrapper").classList.remove("hide");
   if (isAdd) {
      document.getElementById("img_preview").src = "";
   }
}

const closeModal = () => {
   clearForm();
   indexEdit = null;
   document.getElementById("modal_wrapper").classList.add("hide");
}


const displayTotalCounterCondition = (list) => {
   if (list.length > 0) {
      document.getElementById("total_wrap").classList.remove("hide");
   } else {
      document.getElementById("total_wrap").classList.add("hide");
   }
}

const getValueFromForm = () => {
   let name = document.getElementById("name").value;
   let email = document.getElementById("email").value;
   let phone = parseInt(document.getElementById("phone").value);
   let files = document.getElementById("photo").files;
   const person = {
      name,
      email,
      phone,
      photo: files[0],
      id: Date.now()
   }
   return person;
}

const setValueToForm = editObj => {
   let { name, email, phone, photo } = editObj;
   document.getElementById("name").value = name;
   document.getElementById("email").value = email;
   document.getElementById("phone").value = phone;
   if (photo instanceof File) {
      const container = new DataTransfer();
      container.items.add(photo);
      document.getElementById("photo").files = container.files;
      document.getElementById("img_preview").src = URL.createObjectURL(photo);
   }
}

const checkInputImg = obj => {
   if (obj.photo) {
      return true;
   }
   document.getElementById("error").classList.remove("hide");
   document.getElementById("error").innerText = "Image can not be empty!"
   return false;
}

const closeRemoveConfirm = () => {
   document.getElementById("remove_conf").classList.add("hide");
}

const openDeleteAlert = deletedObj => {
   document.getElementById("deleteSuccess").classList.remove("hide");
   document.getElementById("delete_noti").innerText = "Ban da xoa thanh cong: " + deletedObj.name;
   setTimeout(closeDeleteAlert, 2000);
}

const closeDeleteAlert = () => {
   document.getElementById("deleteSuccess").classList.add("hide");
}

const debounce = (func, delay) => {
   let debounceTimer
   return function () {
      const context = this
      const args = arguments
      clearTimeout(debounceTimer)
      debounceTimer
         = setTimeout(() => func.apply(context, args), delay)
   }
}

const openRemoveConfirm = (id) => {
   document.getElementById("remove_conf").classList.remove("hide");
   document.getElementById("remove_conf").style.top = window.event.clientY - 40 + "px";
   document.getElementById("remove_conf").style.left = window.event.clientX + 20 + "px";
   document.getElementById("deleteId").value = id;
}