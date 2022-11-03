let persons = [];
let isAdd = true;
let indexEdit = null;
let deleteIndex=null;


function display(inputPersons) {
   let tableString = '<table class="table">' +
      '<tbody>' +
      '<tr>' +
      '<th scope="col" colspan="2">' +
      '<input class="form-check-input" type="checkbox">' +
      '<span class="all-checkbox">All</span>' +
      '</th>' +
      '<th scope="col">Name</th>' +
      '<th scope="col">Email</th>' +
      '<th scope="col">Phone</th>' +
      '<th colspan="4"></th>' +
      '</tr>';
   for (let i = 0; i < inputPersons.length; i++) {
      tableString += '<tr>' +
         '<th class="check-box">' +
         '<input class="form-check-input" type="checkbox">' +
         '</th>' +
         '<th scope="row"><img class="img_border" src="' + URL.createObjectURL(inputPersons[i].photo) + '" alt="1"></th>' +
         '<td>' + inputPersons[i].name + '</td>' +
         '<td>' + inputPersons[i].email + '</td>' +
         '<td>' + inputPersons[i].phone + '</td>' +
         '<td><i onclick="updateInput(' + i + ')" class="bi bi-pencil-square"></i> </td>' +
         '<td class="remove-wrap" ><i class="bi bi-trash" onclick="openRemove('+i+')"></i>' +
         '</td>' +
         '</tr>';
   }
   tableString += '</tbody>';
   tableString += '</table>';
   
   document.getElementById("display").innerHTML = tableString;
}


function close_modal() {
   clearForm();
   indexEdit = null;
   document.getElementById("modal_wrapper").classList.add("hide");
}

function open_modal() {
   document.getElementById("modal_wrapper").classList.remove("hide");
   if(isAdd){
      document.getElementById("img_preview").src = "";
   }
}


function openRemove(index) {
   document.getElementById("remove_conf").classList.remove("hide");
   document.getElementById("remove_conf").style.position="absolute";
   document.getElementById("remove_conf").style.top=window.event.clientY-40+"px";
   document.getElementById("remove_conf").style.left=window.event.clientX+20+"px";
   deleteIndex=index;
}



function closeRemove(){
   document.getElementById("remove_conf").classList.add("hide");
}

function getValue() {
   let name = document.getElementById("name").value;
   let email = document.getElementById("email").value;
   let phone = document.getElementById("phone").value;
   let files = document.getElementById("photo").files;
   let person = {};
   person.name = name;
   person.email = email;
   person.phone = phone;
   person.photo = files[0];
   return person;
}


function clearForm() {
   document.getElementById("my_form").reset();
   isAdd = true;
}


function remove() {
         persons.splice(deleteIndex, 1);
         display(persons);
         document.getElementById("remove_conf").classList.add("hide");
      } 



function add() {
   let person = getValue();
   console.log(person)
   persons.push(person);
   console.log(persons)
   display(persons);
   close_modal();
}

function update() {
   let person = getValue();
   persons[indexEdit].name = person.name;
   persons[indexEdit].email = person.email;
   persons[indexEdit].phone = person.phone;
   if(person.photo!=null){
      persons[indexEdit].photo = person.photo;
   }
   display(persons)
   close_modal();
}

function updateInput(index) {
   clearForm();
   isAdd = false;
   indexEdit = index;
   open_modal();
   document.getElementById("name").value = persons[index].name;
   document.getElementById("email").value = persons[index].email;
   document.getElementById("phone").value = persons[index].phone;
   const container = new DataTransfer();
   container.items.add(persons[index].photo);
   document.getElementById("photo").files = container.files;
   document.getElementById("img_preview").src = URL.createObjectURL(persons[index].photo);
}


const photo = document.getElementById('photo');
const image = document.getElementById('img_preview');
photo.addEventListener('change', (e) => {
   if (e.target.files.length) {
      const src = URL.createObjectURL(e.target.files[0]);
      image.src = src;
   }
});



document.querySelector("#my_form").addEventListener("submit",  (e) => {
   if (!e.isValid) {
      e.preventDefault();    //stop form from submitting
   }
   if (isAdd) {
      add(); 
   } else {
      update(indexEdit)
   }
});

