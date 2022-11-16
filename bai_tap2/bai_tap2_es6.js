
let isAdd = true;
let editId = null;
let deleteId = null;
let fieldSort = "";
let statusSort = "reset";
let checkedList = [];
let removeAll=false;


const ARROW_DIRECTION_UP = "bi bi-caret-up-fill arrow";
const ARROW_DIRECTION_DOWN = "bi bi-caret-down-fill arrow";

const getListFromStorage = () => {
   return JSON.parse(localStorage.getItem("personList"));
}

let inputPersons = getListFromStorage() || [];

const setListToStorage = () => {
   localStorage.setItem('personList', JSON.stringify(inputPersons));
}

const showDeleteCheckedBtn = () => {
   document.getElementById("delete_multiple").innerHTML = checkedList.length;
   if (checkedList.length > 0) {
      document.getElementById("btn_show_checked").classList.remove("hide");
   } else {
      document.getElementById("btn_show_checked").classList.add("hide");
   }
}

const getTotalChecked = e => {
   if (e.target.checked) {
      checkedList.push(e.target.id.slice(8))
   } else {
      checkedList = checkedList.filter(person => person !== e.target.id.slice(8));
   }
   showDeleteCheckedBtn();

}

const removeListChecked = () => {
   if(removeAll){
      inputPersons.length=0;
      checkedList=[];
   }else{
      inputPersons = inputPersons.filter(person => {
         return !checkedList.includes(String(person.id))
      });
      checkedList.length = 0;
   }
   
   setListToStorage();
   
   showDeleteCheckedBtn();
   displayPersonList();
}

const handleAllChecked = e => {
   checkedList = document.querySelectorAll('.form-check-input');
   if (e.target.checked) {
      checkedList.forEach(person =>{
         person.checked = true;
      });
      removeAll=true;
      
   } else {
      checkedList.forEach(person =>{
         person.checked = false;
      });
      checkedList=[] ;
      removeAll=false;
   }
   showDeleteCheckedBtn();

}


   const displayPersonList = (list = inputPersons) => {
      let tableString = `<table class="table">
      <tbody>
         <tr>
            <th scope="col" colspan="2">
               <input class="form-check-input-all" id="select_all_checked" type="checkbox">
                  <span class="all-checkbox">All</span>
            </th>
            <th scope="col">
               <div id="name_arrow" class="flex-row-center hover-arrow">
                  <p id="name_arrow_direction" class="hide" ><i class=" ${fieldSort === "name" ? statusSort === "up" ? ARROW_DIRECTION_UP : ARROW_DIRECTION_DOWN : ""} "></i></p>
                  <p>Name</p>
               </div>
            </th>
            <th  scope="col">
               <div id="email_arrow" class="flex-row-center hover-arrow">
                  <p id="email_arrow_direction" class="hide"><i class=" ${fieldSort === "email" ? statusSort === "up" ? ARROW_DIRECTION_UP : ARROW_DIRECTION_DOWN : ""} "></i></p>
                  <p>Email</p>
               </div>
            </th>
            <th  scope="col">
               <div id="phone_arrow" class="flex-row-center hover-arrow">
                  <p id="phone_arrow_direction" class="hide"><i class=" ${fieldSort === "phone" ? statusSort === "up" ? ARROW_DIRECTION_UP : ARROW_DIRECTION_DOWN : ""} "></i></p>
                  <p>Phone</p>
               </div>
            </th>
            <th colspan="4"></th>
         </tr>`

      for (let i = 0; i < list.length; i++) {
         tableString += `<tr>
         <th class="check-box">
         <input class="form-check-input" type="checkbox" id="checkBox${list[i].id}">
         </th>
         <th scope="row"><img class="img_border" src="${list[i].photo instanceof File ? URL.createObjectURL(list[i].photo) : ""}" alt="1"></th>
         <td>${list[i].name}</td>
         <td>${list[i].email}</td>
         <td>${list[i].phone ? list[i].phone : ""}</td>
         <td><i onclick="onclickToEdit(${list[i].id})" class="bi bi-pencil-square pencil"></i> </td>
         <td class="remove-wrap"><i class="bi bi-trash trash" onclick="openRemoveConfirm(${list[i].id})"></i>
         </td>
         </tr>`;
      }

      tableString += "</tbody>";
      tableString += '</table>';
      document.getElementById("display").innerHTML = tableString;
      document.getElementById("name_arrow").addEventListener("click", sortListByName);
      document.getElementById("email_arrow").addEventListener("click", sortListByEmail);
      document.getElementById("phone_arrow").addEventListener("click", sortListByPhone);
      displayTotalCounter();
      document.querySelectorAll(".form-check-input").forEach(node => {
         node.addEventListener('change', getTotalChecked);
      });
      document.getElementById("select_all_checked").addEventListener("change", handleAllChecked)
   }



   const clearForm = () => {
      document.getElementById("my_form").reset();
      isAdd = true;
   }

   const openModal = () => {
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

   //total
   const displayTotalCounterCondition = () => {
      if (inputPersons.length > 0) {
         document.getElementById("total_wrap").classList.remove("hide");
      } else {
         document.getElementById("total_wrap").classList.add("hide");
      }
   }

   const displayTotalCounter = () => {
      document.getElementById("total").innerHTML = "Total: " + inputPersons.length;

      let counter = inputPersons.reduce((next, key) => {
         if (key.email !== "") {
            next.countEmail += 1;
         }
         if (key.phone !== "") {
            next.countPhone += 1
         }
         return next;
      }, { countEmail: 0, countPhone: 0 });

      document.getElementById("hasEmail").innerHTML = "Email: " + counter.countEmail;

      document.getElementById("hasPhone").innerHTML = "Phone: " + counter.countPhone;

      displayTotalCounterCondition();
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
      if (photo) {
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

   const handleAddNewPerson = () => {
      let person = getValueFromForm();

      let check = checkInputImg(person);
      if (check) {
         document.getElementById("error").classList.add("hide");
         inputPersons.push(person);
         setListToStorage();
         displayPersonList();
         closeModal();
      }
   }

   const openRemoveConfirm = id => {
      document.getElementById("remove_conf").classList.remove("hide");
      document.getElementById("remove_conf").style.top = window.event.clientY - 40 + "px";
      document.getElementById("remove_conf").style.left = window.event.clientX + 20 + "px";
      deleteId = id;
   }

   const closeRemoveConfirm = () => {
      document.getElementById("remove_conf").classList.add("hide");
   }

   const handleRemovePerson = () => {
      let deletedObj = inputPersons.find(person => person.id == deleteId);
      inputPersons = inputPersons.filter(person => person.id !== deleteId);
      setListToStorage();
      displayPersonList();
      closeRemoveConfirm();
      openDeleteAlert(deletedObj);
   }


   const openDeleteAlert = deletedObj => {
      document.getElementById("deleteSuccess").classList.remove("hide");
      document.getElementById("delete_noti").innerText = "Ban da xoa thanh cong: " + deletedObj.name;
      setTimeout(closeDeleteAlert, 2000);
   }

   const closeDeleteAlert = () => {
      document.getElementById("deleteSuccess").classList.add("hide");
   }


   const onclickToEdit = id => {
      clearForm();
      isAdd = false;
      editId = id;
      openModal();
      setValueToForm(inputPersons.find(item => item.id === editId));
   }

   const handleUpdatePerson = () => {
      let EditObj = getValueFromForm();
      let { name, email, phone, photo } = EditObj;
      inputPersons = inputPersons.map((item) => {
         if (item.id == editId) {
            item.name = name;
            item.email = email;
            item.phone = phone;
            if (photo) {
               item.photo = photo;
            };
         }
         return item;
      })
      setListToStorage();
      displayPersonList()
      closeModal();
   }

   const sortListByfield = (field) => {
      if (statusSort === "reset") {
         statusSort = "up"
      } else if (statusSort === "up") {
         statusSort = "down"
      } else if (statusSort === "down") {
         statusSort = "reset"
         fieldSort = "";
      }
      const compare = (a, b) => {
         if (statusSort === "reset") {
            if (a.id < b.id) {
               return -1;
            }
            if (a.id > b.id) {
               return 1;
            }
            return 0;
         }

         if (statusSort === "up") {
            if (a[field] < b[field]) {
               return 1;
            }
            if (a[field] > b[field]) {
               return -1;
            }
            return 0;
         }
         if (statusSort === "down") {
            if (a[field] < b[field]) {
               return -1;
            }
            if (a[field] > b[field]) {
               return 1;
            }
            return 0;
         }
      }
      inputPersons.sort(compare);
      displayPersonList();
   }

   const sortListByName = () => {
      fieldSort = "name";
      sortListByfield("name");
      document.getElementById("name_arrow_direction").classList.remove("hide");
   }
   const sortListByEmail = () => {
      fieldSort = "email";
      sortListByfield("email");
      document.getElementById("email_arrow_direction").classList.remove("hide");
   }
   const sortListByPhone = () => {
      fieldSort = "phone";
      sortListByfield("phone");
      document.getElementById("phone_arrow_direction").classList.remove("hide");

   }


   const handleSearch = () => {
      let key = document.getElementById("search").value;
      let searchList = [];
      const checkAll = obj => {
         if (obj.name.includes(key) || obj.email.includes(key) || "obj.phone".includes(key)) {
            return true;
         } else {
            return false;
         }
      }
      if (key == "") {
         searchList = inputPersons;
      } else {
         searchList = inputPersons.filter(checkAll);

      }
      displayPersonList(searchList);
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


   // Operate

   const photo = document.getElementById('photo');
   const image = document.getElementById('img_preview');
   photo.addEventListener('change', e => {
      if (e.target.files.length) {
         const src = URL.createObjectURL(e.target.files[0]);
         image.src = src;
      }
   });



   document.querySelector("#my_form").addEventListener("submit", e => {
      if (!e.isValid) {
         e.preventDefault();    //stop form from submitting
      }
      if (isAdd) {
         handleAddNewPerson();
      } else {
         handleUpdatePerson();
      }
   });

   document.getElementById("search").addEventListener('keyup', debounce(handleSearch, 2000));


   document.getElementById("addNewBtn").addEventListener("click", openModal);

   displayPersonList();


   document.getElementById("deleteByCheckBox").addEventListener("click", removeListChecked);

