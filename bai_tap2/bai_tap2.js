function open_modal(){

  let element= document.getElementById("modal-wrapper");
  element.classList.remove("hide");

}
function close_modal(){
   
   let element=document.getElementById("modal");
   element.classList.add("hide");
   
}
let persons=[];
display(persons);
function display(inputPersons){
   let tableString='<table class="table">'+
   '<tbody>'+
      '<tr>'+
         '<th scope="col" colspan="2">'+
            '<input class="form-check-input" type="checkbox">'+
            '<span class="all-checkbox">All</span>'+
         '</th>'+
         '<th scope="col">Name</th>'+
         '<th scope="col">Email</th>'+
         '<th scope="col">Phone</th>'+
         '<th colspan="4"></th>'+
      '</tr>';
      // for (let i=0;i<inputPersons.lenghth;i++) {
      //    tableString+='<tr>'+
      //    '<th class="check-box">'+
      //       '<input class="form-check-input" type="checkbox">'+
      //    '</th>'+
      //    '<th scope="row"><img class="img_border" src="https://cho77.com/wp-content/uploads/2022/05/lionel-messi-1024x576.jpg" alt="1"></th>'+
      //    '<td>Messi</td>'+
      //    '<td>m@gmail</td>'+
      //    '<td>00000000</td>'+
      //    '<td><i class="bi bi-pencil-square"></i></td>'+
      //    '<td><i class="bi bi-trash"></i></td>'+
      // '</tr>';
      // }
      tableString+='</tbody>';
   tableString+='</table>';
   document.getElementById("display").innerHTML=tableString;


}
function add(){
   let name=document.getElementById("name")?.value;
   let email=document.getElementById("email")?.value;
   let phone=document.getElementById("phone")?.value;
   let photo=document.getElementById("photo")?.value;
   let person={};
   person.name=name;
   person.email=email;
   person.phone=phone;
   person.photo=photo;
   persons.push(person);
   console.log(persons);
   
}
