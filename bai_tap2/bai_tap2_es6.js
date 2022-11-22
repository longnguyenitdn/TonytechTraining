
let isAdd = true;
let editId = null;
let fieldSort = "";
let statusSort = "reset";
let checkedList = [];
let inputPersons = getListFromStorage("personList") || [];
let currrentPage = 1;
let perPage = 2;
let searchList = [];
let startPage = (currrentPage - 1) * perPage;
let endPage = startPage + perPage;
let key = document.getElementById("search").value;
const NOTI_NOT_FOUND="Nothing to show! Please clear your seaching infomation or use add new func. Thank you!";


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
   resetCurrentpage()
   handleSearch()
}




const displayPersonList = () => {
   let list = getPersonListWithCondition();
   
   let tableString = `<table class="table">
      <tbody>
         <tr>
            <th scope="col" colspan="2" class="check-input-all" >
               <input class="form-check-input-all" id="select_all_checked" type="checkbox">
                  <span class="all-checkbox">All</span>
            </th>
            <th scope="col">
               <div id="name_arrow" class=" hover-arrow">
                  <p id="name_arrow_direction" class="hide arrow-absolute" ><i class=" ${fieldSort === "name" ? statusSort === "up" ? ARROW_DIRECTION_UP : ARROW_DIRECTION_DOWN : ""} "></i></p>
                  <p class="text-mid">Name</p>
               </div>
            </th>
            <th  scope="col">
               <div id="email_arrow" class=" hover-arrow">
                  <p id="email_arrow_direction" class="hide arrow-absolute"><i class=" ${fieldSort === "email" ? statusSort === "up" ? ARROW_DIRECTION_UP : ARROW_DIRECTION_DOWN : ""} "></i></p>
                  <p class="text-mid">Email</p>
               </div>
            </th>
            <th  scope="col">
               <div id="phone_arrow" class=" hover-arrow">
                  <p id="phone_arrow_direction" class="hide arrow-absolute"><i class=" ${fieldSort === "phone" ? statusSort === "up" ? ARROW_DIRECTION_UP : ARROW_DIRECTION_DOWN : ""} "></i></p>
                  <p class="text-mid">Phone</p>
               </div>
            </th>
            <th colspan="4"></th>
         </tr>`

   startPage = (currrentPage - 1) * perPage;
   endPage = startPage + perPage;

   for (let i = startPage; i < (endPage < list.length ? endPage : list.length); i++) {
      tableString += `<tr>
         <td class="check-box">
         <input class="form-check-input" type="checkbox" id="checkBox${list[i].id}">
         </td>
         <td scope="row" class="text-left"><img class="img_border" src="${list[i].photo instanceof File ? URL.createObjectURL(list[i].photo) : "https://image.shutterstock.com/image-vector/fail-stamp-square-grungy-red-260nw-1726293580.jpg"}" alt="1"></td>
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
   document.getElementById("select_all_checked").addEventListener("change", handleAllCheckBoxStatus);
   renderPageNumber(list);
   document.querySelectorAll(".pagination").forEach(node => {
      node.addEventListener('click', handlePageNumber);
   });
   if(list.length===0){
     document.getElementById("display").innerText=NOTI_NOT_FOUND;
   }
   
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

const handleTransferLastPageNumber = () => {
   currrentPage = Math.ceil(inputPersons.length / perPage)
}

const handleAddNewPerson = () => {
   let person = getValueFromForm();
   let check = checkInputImg(person);
   if (check) {
      document.getElementById("error").classList.add("hide");
      inputPersons.push(person);
      closeModal();
      setListToStorage(inputPersons);
      handleTransferLastPageNumber();
      handleSearch();
   }
}

const resetCurrentpage = () => {
   if (currrentPage > inputPersons.length / perPage) {
      currrentPage--;
   }
}


const handleRemovePerson = () => {
   let deleteId = parseInt(document.getElementById("deleteId").value);
   let deletedObj = inputPersons.find(person => person.id == deleteId);
   inputPersons = inputPersons.filter(person => person.id !== deleteId);
   setListToStorage(inputPersons);
   resetCurrentpage()
   closeRemoveConfirm();
   openDeleteAlert(deletedObj);
   handleSearch();

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
   handleSearch()
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
   handleSearch();
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

const getPersonListWithCondition = () =>{
   if(key==""){
      return inputPersons;
   }else{
      return searchList;
   }
}
const handleAllCheckBoxStatus = e => {
   checkedList.length = 0;
   let inputList=getPersonListWithCondition();
   
   let checkList = inputList.slice(startPage, (endPage < inputList.length ? endPage : inputList.length));
   
   if (e.target.checked) {
      checkList.forEach(person => {
         document.getElementById(`checkBox${person.id}`).checked = true;
         checkedList.push(person.id);
      });

   } else {
      checkList.forEach(person => {
         document.getElementById(`checkBox${person.id}`).checked = false;
      });
      checkedList.length = 0;
   }
   showDeleteCheckedBtn(checkedList);
}


const handleSearch = () => {
   currrentPage = 1;
   key = document.getElementById("search").value;
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
   displayPersonList();
}


const renderPageNumber = (list) => {
   let totalPage = Math.ceil(list.length / perPage);
   document.getElementById("pagination").innerHTML = "";
   for (let i = 1; i <= totalPage; i++) {
      document.getElementById("pagination").innerHTML += `<li class=" ${currrentPage === i ? "checked-pagination pagination" : "pagination"}" id="page_${i}">${i}
      </li>`;
   }
}

const handlePageNumber = e => {
   currrentPage = parseInt(e.target.id.slice(5));
   checkedList.length = 0;
   showDeleteCheckedBtn(checkedList);
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


document.getElementById("search").addEventListener('keyup', debounce(handleSearch, 1500));

document.getElementById("addNewBtn").addEventListener("click", openModal);

displayPersonList();

document.getElementById("btn_show_checked").addEventListener("click", removeListChecked);

