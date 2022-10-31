let persons = [];
let isAdd = true;
let indexEdit = null;
function open_modal() {
   document.getElementById("modal_wrapper").classList.remove("hide");
}

function close_modal() {
   clearForm();
   document.getElementById("modal_wrapper").classList.add("hide");

}

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
         '<div>' +
         '<td ><i onclick="remove(' + i + ')" class="bi bi-trash"></i>' +
         '<div class="remove-conf btn btn-primary">' +
         '<p>Delete it?</p>' +
         '<button id="delete" type="submit" class="btn btn-danger">OK</button>' +
         '<button type="button" class="btn btn-danger">Cancel</button>' +
         '</div>'
      '</td>' +
         '</div>' +
         '</tr>';
   }
   tableString += '</tbody>';
   tableString += '</table>';
   document.getElementById("display").innerHTML = tableString;

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
}

function remove(index) {
   let conf = confirm("Ban chac chan muon xoa!: " + persons[index].name);
   if (conf) {
      persons.splice(index, 1);
      display(persons);
   }
}

function add() {
   if (isAdd) {
      let person = getValue();
      persons.push(person);
      display(persons);
      close_modal();
   } else {
      update(indexEdit);
   }

}

function update(index) {

   let person = getValue();

   persons[index].name = person.name;
   persons[index].email = person.email;
   persons[index].phone = person.phone;
   persons[index].photo = person.file[0];
   display(persons)
   close_modal();
}

function updateInput(index) {
   console.log(persons);
   console.log(persons[index])
   isAdd = false;
   indexEdit = index;
   open_modal();
   document.getElementById("name").value = persons[index].name;
   document.getElementById("email").value = persons[index].email;
   document.getElementById("phone").value = persons[index].phone;
   document.getElementById("photo").files = files[0];

}

const photo = document.getElementById('photo');
const image = document.getElementById('img-preview');
photo.addEventListener('change', (e) => {
   if (e.target.files.length) {
      const src = URL.createObjectURL(e.target.files[0]);
      image.src = src;
   }
});



document.querySelector("#my_form").addEventListener("submit", function (e) {
   if (!e.isValid) {
      e.preventDefault();    //stop form from submitting
   }
   add();
});

