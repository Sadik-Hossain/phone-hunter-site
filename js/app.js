// https://openapi.programming-hero.com/api/phones?search=${searchText}
//-----------Spinner & hide result----------------------------
const toggleSpinner = (displayStyle) => {
  document.getElementById("spinner").style.display = displayStyle;
};
const toggleSearchResult = (displayStyle) => {
  document.getElementById("toggle-show").style.display = displayStyle;
};
const toggleDetail = (displayStyle) => {
  document.getElementById("toggle-detail").style.display = displayStyle;
};
//-------------------getting Input Value------------------------
const searchBox = () => {
  const searchBox = document.getElementById("search-box").value;
  toggleSpinner("block");
  toggleSearchResult("none");
  loadPhones(searchBox.toLowerCase());
  console.log(searchBox);
  document.getElementById("search-box").value = "";
  document.getElementById("detail").textContent = "";
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

  const first20Res = phones.slice(0, 20);

  if (phones.length === 0) {
    showDiv.innerHTML = `<p class = "text-danger text-center mx-auto">Sorry nothing found</p>`;
    document.getElementById("show-all-btn").style.display = "none";
  } else {
    first20Res.forEach((phone) => {
      const div = document.createElement("div");
      div.classList.add("col");

      div.innerHTML = `
      
    <div class=" card border-dark h-100 mx-auto text-center bg-color-1 " style="width: 18rem">
            <img
              class="w-50 mx-auto p-3"
              src="${phone.image}"
              alt="..."
            />
            <div class="card-body ">
              <h4 class="card-title">${phone.phone_name}</h4>
              <p class="card-text">brand: ${phone.brand}</p>
              <button onclick='getId("${phone.slug}")' class="btn btn-dark" >
              <a class="nav-link text-white" href="#header">Details</a>
              
               </button>
            </div>
          </div>
    `;
      showDiv.appendChild(div);
      document.getElementById("show-all-btn").style.display = "block";
    });
  }
  toggleSpinner("none");
  toggleSearchResult("block");
};
// -----------Phone ID------------------------------
// https://openapi.programming-hero.com/api/phone/${id}
const getId = (PhoneIds) => {
  toggleSpinner("block");
  toggleDetail("none");

  const url = `https://openapi.programming-hero.com/api/phone/${PhoneIds}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showDetails(data.data));
};
//---------------Detail section---------------------------
const showDetails = (phoneDetails) => {
  console.log(phoneDetails.mainFeatures.sensors);
  phoneDetails.mainFeatures.sensors.forEach(element => {
    console.log(element)
  });
    //mainFeatures.sensors
  const detailsDiv = document.getElementById("detail");
  detailsDiv.textContent = "";
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="container border-dark my-3">
  <h3 class='text-center'>Product Details</h3>
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
 const sensorDiv = document.createElement('div')
sensorDiv.innerHTML=`
<h3 class='text-center'>Sensor</h3>
`
  detailsDiv.appendChild(div);
  detailsDiv.appendChild(sensorDiv);
  toggleSpinner("none");
  toggleDetail("block");
};

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
