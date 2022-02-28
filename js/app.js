// https://openapi.programming-hero.com/api/phones?search=${searchText}
const searchBox = () => {
  const searchBox = document.getElementById("search-box").value;
  loadPhones(searchBox.toLowerCase());
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
  phones.forEach((phone) => {
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
              <button onclick='getId("${phone.slug}")' class="btn btn-primary">Details</button>
            </div>
          </div>
    `;
    showDiv.appendChild(div);
  });
};
// -----------Phone ID------------------------------
// https://openapi.programming-hero.com/api/phone/${id}
const getId = (PhoneIds) => {
  const url = `https://openapi.programming-hero.com/api/phone/${PhoneIds}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showDetails(data.data));
};
const showDetails = (phoneDetails) => {
  console.log(phoneDetails.image);
  const detailsDiv = document.getElementById("detail");

  const div = document.createElement("div");
  div.innerHTML = `
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
