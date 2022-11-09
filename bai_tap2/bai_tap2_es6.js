
let isAdd = true;
let editId = null;
let inputPersons = [];
let deleteId = null;
let statusSort = "down";

const searchAll = () => {
   let key = document.getElementById("search").value;
   let searchList = [];
   if (key == "") {
      searchList = inputPersons;
   } else {
      searchList = inputPersons.filter(checkAll);
      function checkAll(obj) {
         if (obj.name.includes(key) || obj.email.includes(key) || obj.phone.includes(key)) {
            return true;
         } else {
            return false;
         }
      }
   }
   return searchList;
}
const displayPersonList = () => {
   let searchList = searchAll();
   let tableString = `<table class="table">
      <tbody>
         <tr>
            <th scope="col" colspan="2">
               <input class="form-check-input" type="checkbox">
                  <span class="all-checkbox">All</span>
            </th>
            <th scope="col">
               <div id="name_arrow" class="flex-row-center hover-arrow">
                  <p id="name_arrow_direction><i class="bi bi-caret-up-fill arrow"></i></p>
                  <p>Name</p>
               </div>
            </th>
            <th  scope="col">
               <div id="email_arrow" class="flex-row-center hover-arrow">
               <p><i class="bi bi-caret-up-fill arrow"></i></p>
                  <p>Email</p>
               </div>
            </th>
            <th  scope="col">
               <div id="phone_arrow" class="flex-row-center hover-arrow">
               <p><i class="bi bi-caret-up-fill arrow"></i></p>
                  <p>Phone</p>
               </div>
            </th>
            <th colspan="4"></th>
         </tr>`
   for (let i = 0; i < searchList.length; i++) {
      tableString += `<tr> 
         <th class="check-box">
         <input class="form-check-input" type="checkbox">
         </th>
         <th scope="row"><img class="img_border" src="${URL.createObjectURL(searchList[i].photo)}" alt="1"></th>
         <td>${searchList[i].name}</td>
         <td>${searchList[i].email}</td>
         <td>${searchList[i].phone}</td>
         <td><i onclick="onclickToEdit(${searchList[i].id})" class="bi bi-pencil-square"></i> </td>
         <td class="remove-wrap"><i class="bi bi-trash" onclick="openRemoveConfirm(${searchList[i].id})"></i>
         </td>
         </tr>`;
   }
   tableString += "</tbody>";
   tableString += '</table>';
   document.getElementById("display").innerHTML = tableString;
   displayTotalCounter();
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
   let phone = document.getElementById("phone").value;
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
const setValueToForm = (editObj) => {
   let { name, email, phone, photo } = editObj;
   document.getElementById("name").value = name;
   document.getElementById("email").value = email;
   document.getElementById("phone").value = phone;
   const container = new DataTransfer();
   container.items.add(photo);
   document.getElementById("photo").files = container.files;
   document.getElementById("img_preview").src = URL.createObjectURL(photo);
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
   displayPersonList()
   closeModal();
}


let searchKey = document.getElementById("search");
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


const sortList = () => {
   if (statusSort !== "up") {
      console.log("run");
      let byField = inputPersons.slice(0);
      byField.sort(function (a, b) {
         var x = a.name.toLowerCase();
         var y = b.name.toLowerCase();
         return x < y ? -1 : x > y ? 1 : 0;
      });
      document.getElementById("name_arrow_direction").innerHTML='<i class="bi bi-caret-up-fill"></i>';
      statusSort = "up";
   } else {
      let byField = inputPersons.slice(0);
      byField.sort(function (a, b) {
         var x = a.name.toLowerCase();
         var y = b.name.toLowerCase();
         return x < y ? 1 : x > y ? -1 : 0;
      });
   document.getElementById("name_arrow_direction").innerText='<i class="bi bi-caret-down-fill"></i>';
   
      statusSort = "down";
   }
   displayPersonList();
}


// const sortListDown = field => {
//    statusSort="down"
//    inputPersons.sort(function(a,b){return b.field-a.field})
//    displayPersonList();
// }


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

searchKey.addEventListener('keyup', debounce(function () {
   displayPersonList();
}, 2000));


document.getElementById("addNewBtn").addEventListener("click", openModal);

document.getElementById("name_arrow").addEventListener("click", sortList);

