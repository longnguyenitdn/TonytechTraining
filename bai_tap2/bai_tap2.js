let persons = [];

function open_modal(key) {
   let element = document.getElementById("modal_wrapper");
   element.classList.remove("hide");
   if (key === "edit") {
      document.getElementById("submit_btn").style.display = "none";
      document.getElementById("update_btn").style.display = "inline-block";
   } else {
      document.getElementById("submit_btn").style.display = "inline-block";
      document.getElementById("update_btn").style.display = "none";
   }
}

function close_modal() {
   clearForm();
   let element = document.getElementById("modal_wrapper");
   element.classList.add("hide");
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
         '<th scope="row"><img class="img_border" src="' + URL.createObjectURL(inputPersons[i].photo[0]) + '" alt="1"></th>' +
         '<td>' + inputPersons[i].name + '</td>' +
         '<td>' + inputPersons[i].email + '</td>' +
         '<td>' + inputPersons[i].phone + '</td>' +
         '<td><i onclick="updateInput(' + i + ')" class="bi bi-pencil-square"></i></td>' +
         '<td><i onclick="remove(' + i + ')" class="bi bi-trash"></i></td>' +
         '</tr>';
   }
   tableString += '</tbody>';
   tableString += '</table>';
   document.getElementById("display").innerHTML = tableString;
}


function add() {
   let name = document.getElementById("name").value;
   let email = document.getElementById("email").value;
   let phone = document.getElementById("phone").value;
   let photo = document.getElementById("photo").files;
   let person = {};
   person.name = name;
   person.email = email;
   person.phone = phone;
   person.photo = photo;
   persons.push(person);
   display(persons);
   close_modal();
}


function clearForm() {
   let form = document.getElementById("my_form");
   form.reset()
}



document.querySelector("#my_form").addEventListener("submit", function (e) {
   if (!e.isValid) {
      e.preventDefault();    //stop form from submitting
   }
   add();
   clearForm();
});


function remove(index) {
   let conf = confirm("Ban chac chan muon xoa!:" + persons[index].name);
   if (conf) {
      persons.splice(index, 1);
      display(persons);
   }
}


function updateInput(index) {
   open_modal('edit');
   document.getElementById("name").value = persons[index].name;
   document.getElementById("email").value = persons[index].email;
   document.getElementById("phone").value = persons[index].phone;
   document.getElementById("update_btn").addEventListener("click", update);

   function update() {
      let name = document.getElementById("name").value;
      let email = document.getElementById("email").value;
      let phone = document.getElementById("phone").value;
      let photo = document.getElementById("photo").files;
      persons[index].name = name;
      persons[index].email = email;
      persons[index].phone = phone;
      persons[index].photo = photo;
      display(persons);
      close_modal();
   }
}




