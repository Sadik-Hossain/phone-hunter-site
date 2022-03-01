// https://openapi.programming-hero.com/api/phones?search=${searchText}
const toggleSpinner = (displayStyle) => {
  document.getElementById("spinner").style.display =displayStyle;
};
const searchBox = () => {
  const searchBox = document.getElementById("search-box").value;
  toggleSpinner('block');
  loadPhones(searchBox.toLowerCase());
  console.log(searchBox);
  document.getElementById("search-box").value = "";
};
//------------------Fetch Data------------------------------
const loadPhones = (searchText) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showPhones(data.data));
};
//-------------------Search Result----------------------------
const showPhones = (phones) => {
  const showDiv = document.getElementById("show");
  showDiv.textContent = "";
  console.log(phones.length);
  console.log(phones.slice(0, 20));
  console.log(phones.slice(0));
  const first20Res = phones.slice(0, 20);
  const allRes = phones.slice(0);
  if (phones.length === 0) {
    showDiv.innerHTML = `<p class = "text-danger text-center mx-auto">Sorry nothing found</p>`;
  }
  first20Res.forEach((phone) => {
    // showAll(phone);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
   
    <div class="card h-100 mx-auto text-center" style="width: 18rem">
            <img
              class="w-50 mx-auto p-3"
              src="${phone.image}"
              alt="..."
            />
            <div class="card-body">
              <h4 class="card-title">${phone.phone_name}</h4>
              <p class="card-text">brand: ${phone.brand}</p>
              <button onclick='getId("${phone.slug}")' class="btn btn-primary" >
              <a class="nav-link text-white" href="#header">Details</a>
              
               </button>
            </div>
          </div>
    `;
    showDiv.appendChild(div);
    toggleSpinner('none ');
  });
  document.getElementById("show-all-btn").style.display = "block";
};
// -----------Phone ID------------------------------
// https://openapi.programming-hero.com/api/phone/${id}
const getId = (PhoneIds) => {
  const url = `https://openapi.programming-hero.com/api/phone/${PhoneIds}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showDetails(data.data));
};
//---------------Detail section---------------------------
const showDetails = (phoneDetails) => {
  console.log(phoneDetails.image);
  const detailsDiv = document.getElementById("detail");
  detailsDiv.textContent = "";
  const div = document.createElement("div");
  div.innerHTML = `
  <h3 class='text-center'>Product Details</h3>
  <div class="container border my-3">
    <div class="d-flex flex-row">
        <div class=" flex-fill p-3">
            <img
              class="img-fluid p-3 "
              src="${phoneDetails.image}"
              alt="..."
            />

        </div>
        <div class=" flex-fill p-3">
            <h4>${phoneDetails.name} </h4>
            <p>${
              phoneDetails.releaseDate
                ? phoneDetails.releaseDate
                : "release date not found"
            }</p>
            <p><span class='fw-bold'>Storage: </span>${
              phoneDetails.mainFeatures.storage
            }</p>
            <p><span class='fw-bold'>Display: </span>${
              phoneDetails.mainFeatures.displaySize
            }</p>
            <p><span class='fw-bold'>Chipset: </span>${
              phoneDetails.mainFeatures.chipSet
            }</p>
            <p><span class='fw-bold'>Memory:  </span>${
              phoneDetails.mainFeatures.memory
            }</p>
        </div>
    </div>
  </div>
 
 `;
  detailsDiv.appendChild(div);
};

//-------------ShowAll------------------------------------
/* const showAll = (phone) => {
  const showDiv = document.getElementById("show");
  // showDiv.textContent = "";
  const div = document.createElement("div");
  div.classList.add("col");
  div.innerHTML = `
    <div class="card h-100 mx-auto text-center" style="width: 18rem">
            <img
              class="w-50 mx-auto p-3"
              src="${phone.image}"
              alt="..."
            />
            <div class="card-body">
              <h4 class="card-title">${phone.phone_name}</h4>
              <p class="card-text">brand: ${phone.brand}</p>
              <button onclick='getId("${phone.slug}")' class="btn btn-primary" >
              Details
               </button>
            </div>
          </div>
    `;
  showDiv.appendChild(div);
  document.getElementById("show-all-btn").style.display = "block";
}; */

// ------------------Scrolling Effect Function-----------------
window.onscroll = function () {
  myFunction();
};

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}
