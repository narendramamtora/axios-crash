
function callvalue(){
    var myObj={
// document.getElement(by something) is an single element selector and which is used to if you want to select single things
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        number: document.getElementById("mnumber").value
        };
    let eemail=document.getElementById("email").value


    
    
    axios.post("https://crudcrud.com/api/fb08b4f29f8c48ab8923b8b72c41b968/appointment" , myObj)
    .then((response)=>{
        
        console.log(response)
    })
    .catch((err)=>{
        console.log(err)
    })
    
    let myObj_serialzed=JSON.stringify(myObj);
    //   localStorage.setItem(eemail,myObj_serialzed)
    
 return myObj

}       
//if we want to take values of class = '.name' as same used below for id = '#name'
var myForm=document.querySelector('#my-form');
var nameInput=document.querySelector('#name');
var emailInput=document.querySelector('#email');
var number =document.querySelector('#mnumber');
var userList=document.querySelector('#users');

// submit event - it takes 2 thing 
// 1st Event which we are want to happen
// 2nd function which we want to be happen when we select it 
myForm.addEventListener('submit', onsubmit);//if not working  try onsubmit

//delete event
userList.addEventListener('click', removeItem)
userList.addEventListener('click', editItem)

//Add item
function onsubmit(e){
    e.preventDefault();
    
    var objinner=callvalue()

    axios.get("https://crudcrud.com/api/fb08b4f29f8c48ab8923b8b72c41b968/appointment" , objinner)

    .then((response)=>{
    
        console.log(response)
    })
    .catch((rab)=>{
        console.log(rab)
    })




    const li=document.createElement('li');
    li.id=emailInput.value   
    li.name=nameInput.value
    li.num=number.value

    li.appendChild(document.createTextNode(`${nameInput.value} - ${emailInput.value} - ${number.value}`));    
   
    // Create del button element
  var deleteBtn = document.createElement('button');
  var editBtn = document.createElement('button');
   // Add classes to del button
   deleteBtn.className = 'btnbtnbtn';
   editBtn.className = 'btnedit';
   // Append text node
   deleteBtn.appendChild(document.createTextNode('delete'));
   editBtn.appendChild(document.createTextNode('edit'));
  // Append button to li
   li.appendChild(deleteBtn);  
   li.appendChild(editBtn);
   userList.appendChild(li);   
    }

//remove items
function removeItem(e){
    if(e.target.classList.contains('btnbtnbtn')){
        var li=e.target.parentElement;
        userList.removeChild(li) 
        const key  = li.id;
        localStorage.removeItem(key);

               //update
               nameInput.value='';
               emailInput.value='';
               number.value='';       
    }
}

    function editItem(e){
    if(e.target.classList.contains('btnedit')){
        var li=e.target.parentElement;
        userList.removeChild(li) 
        const key  = li.id;
        const n=li.num;
        const na=li.name;
        localStorage.removeItem(key);
    
        //update
        nameInput.value=na;
        emailInput.value=key;
        number.value=n;
    }
}