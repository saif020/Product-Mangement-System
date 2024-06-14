let title = document.getElementById("title");
let price = document.getElementById("price");
let ads = document.getElementById("ads");
let taxes = document.getElementById("taxes");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let button = document.getElementById("submit");

let mode = "create";
let tempIndex;

let searchMode = "title";

// get the total price of the product
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +ads.value + +taxes.value;
    let finalResult = result - +discount.value;
    total.innerHTML = finalResult;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "red";
  }
}

// add the product
let dataProd;
if (localStorage.Product != null) {
  dataProd = JSON.parse(localStorage.Product);
} else {
  dataProd = [];
}

button.onclick = function () {
  let newProd = {
    title: title.value.toLowerCase(),
    price: price.value,
    ads: ads.value,
    taxes: taxes.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (title.value != "" && category.value != "" && price.value != "") {
    if (mode === "create") {
      if (newProd.count > 1) {
        for (let i = 0; i < newProd.count; i++) {
          dataProd.push(newProd);
        }
      } else {
        dataProd.push(newProd);
      }
    } else {
      dataProd[tempIndex] = newProd;
      mode = "create";
      button.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  }

  // save in localstorage
  localStorage.setItem("Product", JSON.stringify(dataProd));
  showData();
};

function clearData() {
  title.value = "";
  price.value = "";
  ads.value = "";
  taxes.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// read the data
function showData() {
  let table = "";
  getTotal();

  for (let i = 0; i < dataProd.length; i++) {
    table += `
    <tr>
            <td>${i + 1}</td>
            <td>${dataProd[i].title}</td>
            <td>${dataProd[i].price}</td>
            <td>${dataProd[i].taxes}</td>
            <td>${dataProd[i].ads}</td>
            <td>${dataProd[i].discount}</td>
            <td>${dataProd[i].total}</td>
            <td>${dataProd[i].category}</td>
            <td><button id="update" onclick = 'updateData(${i})'>update</button></td>
            <td><button onclick = 'deleteData(${i})' id="delete">delete</button></td>
          </tr>
    
    `;
  }

  document.getElementById("tbody").innerHTML = table;
  let btnDeleteAll = document.getElementById("deleteAll");
  if (dataProd.length > 0) {
    btnDeleteAll.innerHTML = `
      <button onclick = 'deleteAll()'>delete all (${dataProd.length})</button>
      `;
  } else {
    btnDeleteAll.innerHTML = "";
  }
}

showData();

// delete the product data
function deleteData(i) {
  dataProd.splice(i, 1);
  localStorage.Product = JSON.stringify(dataProd);
  showData();
}

function deleteAll() {
  localStorage.clear();
  dataProd.splice(0);
  showData();
}

// Updating the data
function updateData(i) {
  title.value = dataProd[i].title;
  price.value = dataProd[i].price;
  ads.value = dataProd[i].ads;
  taxes.value = dataProd[i].taxes;
  discount.value = dataProd[i].discount;

  category.value = dataProd[i].category;
  count.style.display = "none";
  button.innerHTML = "Update";
  mode = "update";
  tempIndex = i;

  getTotal();

  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Searching the Data
function getSearchMode(id) {
  let search = document.getElementById("search");

  if (id == "searchTitle") {
    searchMode = "title";
  } else {
    searchMode = "category";
  }

  search.placeholder = `Seacrh By ${searchMode}`;
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";

  for (let i = 0; i < dataProd.length; i++) {
    if (searchMode == "title") {
      if (dataProd[i].title.includes(value.toLowerCase())) {
        table += `
          <tr>
            <td>${i}</td>
            <td>${dataProd[i].title}</td>
            <td>${dataProd[i].price}</td>
            <td>${dataProd[i].taxes}</td>
            <td>${dataProd[i].ads}</td>
            <td>${dataProd[i].discount}</td>
            <td>${dataProd[i].total}</td>
            <td>${dataProd[i].category}</td>
            <td><button id="update" onclick = 'updateData(${i})'>update</button></td>
            <td><button onclick = 'deleteData(${i})' id="delete">delete</button></td>
          </tr>`;
      }
    } else {
      if (dataProd[i].category.includes(value.toLowerCase())) {
        table += `
          <tr>
            <td>${i}</td>
            <td>${dataProd[i].title}</td>
            <td>${dataProd[i].price}</td>
            <td>${dataProd[i].taxes}</td>
            <td>${dataProd[i].ads}</td>
            <td>${dataProd[i].discount}</td>
            <td>${dataProd[i].total}</td>
            <td>${dataProd[i].category}</td>
            <td><button id="update" onclick = 'updateData(${i})'>update</button></td>
            <td><button onclick = 'deleteData(${i})' id="delete">delete</button></td>
          </tr>`;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}
