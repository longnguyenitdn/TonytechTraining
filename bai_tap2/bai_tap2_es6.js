
let isAdd = true;
let editId = null;
let fieldSort = "";
let statusSort = "reset";
let checkedList = [];
let inputPersons = getListFromStorage("personList") || [];
let currrentPage = 1;
let perPage = 2;
let totalPage = 0;
let perUser = [];
let searchList=inputPersons;

const ARROW_DIRECTION_UP = "bi bi-caret-up-fill arrow";
const ARROW_DIRECTION_DOWN = "bi bi-caret-down-fill arrow";

const setIdCheckBox = e => {
   handleCheckBox();
   const checkBoxId = parseInt(e.target.id.slice(8));
   if (e.target.checked) {
      checkedList.push(checkBoxId)
   } else {
      checkedList = checkedList.filter(person => person !== checkBoxId);
   }
   showDeleteCheckedBtn(checkedList);
}

const removeListChecked = () => {
   inputPersons = inputPersons.filter(function (el) {
      return !checkedList.includes(el.id);
   });
   checkedList.length = 0;
   setListToStorage(inputPersons);
   showDeleteCheckedBtn(checkedList);
   renderUserPagination();
}

const handleAllCheckBoxStatus = e => {
   let checkList = document.querySelectorAll('.form-check-input');
   checkedList.length = 0;
   if (e.target.checked) {
      checkList.forEach(person => {
         person.checked = true;
      });
      inputPersons.forEach(person => checkedList.push(person.id));
   } else {
      checkList.forEach(person => {
         person.checked = false;
      });
      checkedList.length = 0;
   }
   showDeleteCheckedBtn(checkedList);
}




const displayPersonList = (list = perUser) => {
   
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
      node.addEventListener('change', setIdCheckBox);
   });
   document.getElementById("select_all_checked").addEventListener("change", handleAllCheckBoxStatus)
   renderPageNumber(searchList);
}

//total

const displayTotalCounter = () => {
   document.getElementById("total").innerHTML = "Total: " + inputPersons.length;

   let counter = inputPersons.reduce((next, key) => {
      if (key.email !== "") {
         next.countEmail += 1;
      }
      if (key.phone) {
         next.countPhone += 1
      }
      return next;
   }, { countEmail: 0, countPhone: 0 });

   document.getElementById("hasEmail").innerHTML = "Email: " + counter.countEmail;

   document.getElementById("hasPhone").innerHTML = "Phone: " + counter.countPhone;

   displayTotalCounterCondition(inputPersons);
}

const handleAddNewPerson = () => {
   let person = getValueFromForm();

   let check = checkInputImg(person);
   if (check) {
      document.getElementById("error").classList.add("hide");
      inputPersons.push(person);
      setListToStorage(inputPersons);
      renderUserPagination();
      closeModal();
   }
}


const handleRemovePerson = () => {
   let deleteId = parseInt(document.getElementById("deleteId").value);
   let deletedObj = inputPersons.find(person => person.id == deleteId);
   inputPersons = inputPersons.filter(person => person.id !== deleteId);
   setListToStorage(inputPersons);
   renderUserPagination();
   closeRemoveConfirm();
   openDeleteAlert(deletedObj);
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
   setListToStorage(inputPersons);
   renderUserPagination()
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
   renderUserPagination();
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
  
   renderUserPagination(searchList);
}



const renderUserPagination = (list = inputPersons) => {
   perUser = list.slice(
      (currrentPage - 1) * perPage,
      (currrentPage - 1) * perPage + perPage
   );
   displayPersonList();
}

const renderPageNumber = (list=inputPersons) => {
   document.getElementById("pagination").innerHTML = "";
   totalPage = Math.ceil(list.length / perPage);
   for (let i = 1; i <= totalPage; i++) {
      document.getElementById("pagination").innerHTML += `<li class="${currrentPage === i ? "checked-pagination" : ""}" id="${i}" onclick="handlePageNumber(${i},${list})">
      ${i}
      </li>`;
   }
}



const handlePageNumber = (num,list) => {
   currrentPage = num;
   perUser = list.slice(
      (currrentPage - 1) * perPage,
      (currrentPage - 1) * perPage + perPage
   );
   displayPersonList();
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

renderUserPagination();

document.getElementById("deleteByCheckBox").addEventListener("click", removeListChecked);

