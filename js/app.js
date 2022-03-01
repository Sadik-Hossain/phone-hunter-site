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
  document.getElementById("show-all-btn").style.display = "none";
  loadPhones(searchBox.toLowerCase());
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
  const first20Result = phones.slice(0, 20);
  if (phones.length === 0) {
    showDiv.innerHTML = `<p class = "text-danger text-center mx-auto">Sorry nothing found</p>`;
    document.getElementById("show-all-btn").style.display = "none";
  } else {
    first20Result.forEach((phone) => {
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
              <button onclick='getId("${phone.slug}")' class="btn btn-dark">
              <a class="nav-link text-white" href="#header">Details</a>
               </button>
            </div>
          </div>
    `;
      showDiv.appendChild(div);
      if (phones.length > 20) {
        document.getElementById("show-all-btn").style.display = "block";
      }
    });
  }
  toggleSpinner("none");
  toggleSearchResult("block");
};
// -----------Phone ID fetch------------------------------
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
  const detailsDiv = document.getElementById("detail");
  detailsDiv.textContent = "";

  const div = document.createElement("div");
  div.classList.add("flex-fill");
  div.classList.add("text-center");
  div.innerHTML = `
  <img class='img-fluid p-3'
    src="${phoneDetails.image}"
    alt=""
  />
  <h3>${phoneDetails.name}</h3>
  <p>${
    phoneDetails.releaseDate
      ? phoneDetails.releaseDate
      : "release date not found"
  }</p>
`;
  const mainDiv = document.createElement("div");
  mainDiv.classList.add("flex-fill");
  mainDiv.classList.add("justify-content-center");
  // --------------Main Feature----------------------------
  for ([key, value] of Object.entries(phoneDetails?.mainFeatures)) {
    const textDiv = document.createElement("div");
    textDiv.classList.add("flex-fill");

    textDiv.innerHTML = `
   <p style='word-break: break-all;'><span class='fw-bold'> ${key}:</span> ${value}</p>
    `;
    mainDiv.appendChild(textDiv);
  }
  // -----------------Other feature----------------------------
  for ([key, value] of Object.entries(
    phoneDetails.others ? phoneDetails.others : ""
  )) {
    const textDiv2 = document.createElement("div");
    textDiv2.classList.add("flex-fill");

    textDiv2.innerHTML = `
   <p style='word-break: break-all;'><span class='fw-bold'> ${key}:</span> ${value}</p>
    `;
    mainDiv.appendChild(textDiv2);
  }
  detailsDiv.appendChild(div);
  detailsDiv.appendChild(mainDiv);
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
