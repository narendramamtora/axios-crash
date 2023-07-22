function saveToLocalStorage(event) {
    let submitName = event.target.username.value;
    let email = event.target.email.value;
    let number=event.target.number.value;
    event.preventDefault();
    let obj = {};
    obj.Name = submitName;
    obj.Email = email;
    obj.Number = number;
    // let obj_serialized = JSON.stringify(obj);
    // localStorage.setItem(obj.Email, obj_serialized);
    axios
      .post(
        "https://crudcrud.com/api/1f471821646e4c24b85e299abfc00c8e/appointment",
        obj
      )
      .then((response) => {
        showUserOnScreen(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // showUserOnScreen(obj);
  }
  window.addEventListener("DOMContentLoaded", () => {
    axios
      .get(
        "https://crudcrud.com/api/1f471821646e4c24b85e299abfc00c8e/appointment"
      )
      .then((res) => {
        // console.log(res);
        for (var i = 0; i < res.data.length; i++) {
          showUserOnScreen(res.data[i]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
  function showUserOnScreen(obj) {
    const parentElement = document.getElementById("my-form");
    const childElement = document.createElement("li");
    childElement.textContent = `${obj.Name}-${obj.Email} -${obj.Number}  `;
    const button = document.createElement("input");
    button.type = "button";
    button.value = "Delete";
    button.onclick = () => {
      // localStorage.removeItem(obj.Email);
      axios
        .delete(
          `https://crudcrud.com/api/1f471821646e4c24b85e299abfc00c8e/appointment/${obj._id}`
        )
        .then((res) => {
          // console.log(res);
        })
        .catch((err) => console.log(err));
      parentElement.removeChild(childElement);
    };
    const EditButton = document.createElement("input");
    EditButton.type = "button";
    EditButton.value = "Edit";
    EditButton.onclick = () => {
      // localStorage.removeItem(obj.Email);
      
      parentElement.removeChild(childElement);
      document.getElementById("id-name").value = obj.Name;
      document.getElementById("id-email").value = obj.Email;
      document.getElementById("id-number").value = obj.Number;
    };
    childElement.appendChild(button);
    childElement.appendChild(EditButton);
    parentElement.appendChild(childElement);
  }