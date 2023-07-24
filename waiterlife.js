function getTableElement(chooseTable) {
    switch (chooseTable) {
      case "table1":
        return document.getElementById("table1");
      case "table2":
        return document.getElementById("table2");
      case "table3":
        return document.getElementById("table3");
      default:
        return null;
    }
  }

function saveToServer(event) {
    let choosePrice = event.target.chooseprice.value;
    let chooseDish = event.target.choosedish.value;
    let chooseTable=event.target.choosetable.value;
    event.preventDefault();
   
    if (!choosePrice || !chooseDish) {
        console.log("Please fill in all the required fields.");
        return;
      }

    let obj = {};
    obj.Price = choosePrice;
    obj.Dish = chooseDish;
    obj.Table = chooseTable;    
    
    axios
      .post(
        "https://crudcrud.com/api/a388490e34ca4eb68c30ff51b62c6898/waiter",
        obj
      )
      .then((response) => {
        showUserOnScreen(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
      window.addEventListener("DOMContentLoaded", () => {
        axios
          .get(
            "https://crudcrud.com/api/a388490e34ca4eb68c30ff51b62c6898/waiter"
          )
          .then((res) => {
            for (var i = 0; i < res.data.length; i++) {
              showUserOnScreen(res.data[i]);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });

      function showUserOnScreen(obj) {
        const tableElement = getTableElement(obj.Table);
        if (!tableElement) {
          console.log("Invalid table selected.");
          return;
        }
        const childElement = document.createElement("li");
        childElement.textContent = `${obj.Price}-${obj.Dish} -${obj.Table}  `;
        const button = document.createElement("input");
        button.type = "button";
        button.value = "Delete";
        button.onclick = () => {
           axios
            .delete(
              `https://crudcrud.com/api/a388490e34ca4eb68c30ff51b62c6898/waiter/${obj._id}`
            )
            .then((res) => {
              tableElement.removeChild(childElement);
            })
            .catch((err) => console.log(err));
        };
        childElement.appendChild(button);
        tableElement.appendChild(childElement);

      }