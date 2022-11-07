
let isAdd = true;
let editId = null;
let inputPersons = [];
let deleteId = null;
let filterObj = {};




const display = () => {
   let key = document.getElementById("search").value;
   let searchArr = [];
   if (key == "") {
      searchArr = inputPersons;
   } else {
      searchArr = inputPersons.filter(checkAll);
      function checkAll(obj) {
         if (obj.name.includes(key) || obj.email.includes(key) || obj.phone.includes(key)) {
            return obj;
         }
      }
   }


   // var newArray = homes.filter(function (el) {
   //    return el.price <= 1000 &&
   //           el.sqft >= 500 &&
   //           el.num_of_beds >=2 &&
   //           el.num_of_baths >= 2.5;
   //  });
   let tableString = `<table class="table">
      <tbody>
      <tr> 
      <th scope="col" colspan="2">
      <input class="form-check-input" type="checkbox">
      <span class="all-checkbox">All</span>
      </th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th colspan="4"></th>
      </tr>`
   for (let i = 0; i < searchArr.length; i++) {
      tableString += `<tr> 
         <th class="check-box">
         <input class="form-check-input" type="checkbox">
         </th>
         <th scope="row"><img class="img_border" src="${URL.createObjectURL(searchArr[i].photo)}" alt="1"></th>
         <td>${searchArr[i].name}</td>
         <td>${searchArr[i].email}</td>
         <td>${searchArr[i].phone}</td>
         <td><i onclick="updateInput(${searchArr[i].id})" class="bi bi-pencil-square"></i> </td>
         <td class="remove-wrap"><i class="bi bi-trash" onclick="openRemove(${searchArr[i].id})"></i>
         </td>
         </tr>`;
   }
   tableString += "</tbody>";
   tableString += '</table>';
   document.getElementById("display").innerHTML = tableString;
   displayTotal();
}

const clearForm = () => {
   document.getElementById("my_form").reset();
   isAdd = true;
}

const open_modal = () => {
   document.getElementById("modal_wrapper").classList.remove("hide");
   if (isAdd) {
      document.getElementById("img_preview").src = "";
   }
}

const close_modal = () => {
   clearForm();
   indexEdit = null;
   document.getElementById("modal_wrapper").classList.add("hide");
}

//total
const displayCondition = () => {
   if (inputPersons.length > 0) {
      document.getElementById("total_wrap").classList.remove("hide");
   } else {
      document.getElementById("total_wrap").classList.add("hide");
   }
}
const displayTotal = () => {
   document.getElementById("total").innerHTML = "Total: " + inputPersons.length;
   document.getElementById("hasEmail").innerHTML = "Email: " + inputPersons.reduce(getEmail, 0);
   function getEmail(total, num) {
      if (num.email !== "") {
         return total + 1;
      } else return total;
   }
   document.getElementById("hasPhone").innerHTML = "Phone: " + inputPersons.reduce(getPhone, 0);
   function getPhone(total, num) {
      if (num.phone !== "") {
         return total + 1;
      } else {
         return total
      };
   }
   displayCondition();
}




const getValue = () => {
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

const checkInputImg = obj => {
   if (obj.photo) {
      return true;
   }
   document.getElementById("error").classList.remove("hide");
   document.getElementById("error").innerText = "Image can not be empty!"
   return false;
}
const add = () => {
   let person = getValue();
   let check = checkInputImg(person);
   if (check) {
      document.getElementById("error").classList.add("hide");
      inputPersons.push(person);
      display();
      close_modal();
   }
}

const openRemove = id => {
   document.getElementById("remove_conf").classList.remove("hide");
   document.getElementById("remove_conf").style.top = window.event.clientY - 40 + "px";
   document.getElementById("remove_conf").style.left = window.event.clientX + 20 + "px";
   deleteId = id;
}

const remove = () => {
   let tempArr = inputPersons.filter(person => person.id !== deleteId);
   inputPersons = tempArr;
   display();
   closeRemove();
   openDeleteAlert();
}
const closeRemove = () => {
   document.getElementById("remove_conf").classList.add("hide");
}

const updateInput = id => {
   clearForm();
   isAdd = false;
   editId = id;
   open_modal();
   filterObj = inputPersons.find(item => item.id === editId);
   let { name, email, phone, photo } = filterObj;
   document.getElementById("name").value = filterObj.name;
   document.getElementById("email").value = filterObj.email;
   document.getElementById("phone").value = filterObj.phone;
   const container = new DataTransfer();
   container.items.add(photo);
   document.getElementById("photo").files = container.files;
   document.getElementById("img_preview").src = URL.createObjectURL(photo);
}

const update = () => {
   let person = getValue();
   let { name, email, phone, photo } = person;
   filterObj.name = name;
   filterObj.email = email;
   filterObj.phone = phone;
   if (photo != null) {
      filterObj.photo = photo;
   }
   display()
   close_modal();
}
const openDeleteAlert = () =>{
   document.getElementById("deleteSuccess").classList.remove("hide");
   document.getElementById("delete_noti").innerText="Ban da xoa thanh cong ID: "+deleteId;
   setTimeout(closeDeleteAlert,2000);
}
const closeDeleteAlert = () =>{
   document.getElementById("deleteSuccess").classList.add("hide");
}



// Operate

const photo = document.getElementById('photo');
const image = document.getElementById('img_preview');
photo.addEventListener('change', (e) => {
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
      add();
   } else {
      update(indexEdit)
   }
});


