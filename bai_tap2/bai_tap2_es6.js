let persons = [];
let isAdd = true;
let indexEdit = null;



const display = (inputPersons) => {
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
   for (let i = 0; i < inputPersons.length; i++) {
      tableString += `<tr> 
         <th class="check-box">
         <input class="form-check-input" type="checkbox">
         </th>
         <th scope="row"><img class="img_border" src="${URL.createObjectURL(inputPersons[i].photo)}" alt="1"></th>
         <td>${inputPersons[i].name}</td>
         <td>${inputPersons[i].email}</td>
         <td>${inputPersons[i].phone}</td>
         <td><i onclick="updateInput(${i})" class="bi bi-pencil-square"></i> </td>
         <td class="remove-wrap" ><i class="bi bi-trash" onclick="openRemove(${i})"></i>
         <div id="remove_conf${i}" class="remove-conf hide">
         <p>Are you sure to delete?</p>
         <button id="delete"  type="submit" onclick="closeRemove(${i})"> No </button>
         <button type="button" onclick="remove(${i})" > Yes </button>
         </div>
         </td>
         </tr>`;
   }
   tableString += "</tbody>";
   tableString += '</table>';
   document.getElementById("display").innerHTML = tableString;
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

const openRemove = i => {
   for (let j = 0; j < persons.length; j++) { 
      document.getElementById("remove_conf" + j).classList.add("hide");
   }
   document.getElementById("remove_conf" + i).classList.remove("hide");
}

const remove = index => {
   persons.splice(index, 1);
   display(persons);
}
const closeRemove = i => {
   document.getElementById("remove_conf" + i).classList.add("hide");
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
      photo: files[0]
   }
   return person;
}
const checkInputImg = (obj) => {
   if (obj.photo) {
      return true;
   }
   document.getElementById("error").classList.remove("hide");
   document.getElementById("error").innerText = "Image can not be empty!"
   return false;
}
const add = () =>{
   let person = getValue();
   let check = checkInputImg(person);
   if (check) {
   document.getElementById("error").classList.add("hide");
      persons.push(person);
      display(persons);
      close_modal();
   }

}


const clearForm = () => {
   document.getElementById("my_form").reset();
   isAdd = true;
}

const update = index => {
   let person = getValue();
   let { name, email, phone, photo } = person;
   persons[index].name = name;
   persons[index].email = email;
   persons[index].phone = phone;
   if (photo != null) {
      persons[index].photo = photo;
   }
   display(persons)
   close_modal();
}

const updateInput = index => {
   clearForm();
   isAdd = false;
   indexEdit = index;
   open_modal();
   let { name, email, phone, photo } = persons[index];
   document.getElementById("name").value = name;
   document.getElementById("email").value = email;
   document.getElementById("phone").value = phone;
   const container = new DataTransfer();
   container.items.add(photo);
   document.getElementById("photo").files = container.files;
   document.getElementById("img_preview").src = URL.createObjectURL(photo);
}


const photo = document.getElementById('photo');
const image = document.getElementById('img_preview');
photo.addEventListener('change', (e) => {
   if (e.target.files.length) {
      const src = URL.createObjectURL(e.target.files[0]);
      image.src = src;
   }
});



document.querySelector("#my_form").addEventListener("submit", (e) => {
   if (!e.isValid) {
      e.preventDefault();    //stop form from submitting
   }
   if (isAdd) {
      add();
   } else {
      update(indexEdit)
   }
});

