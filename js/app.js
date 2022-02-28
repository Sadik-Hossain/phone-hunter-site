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
    console.log(phone);
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
              <a href="#" class="btn btn-primary">Details</a>
            </div>
          </div>
    `;
    showDiv.appendChild(div);
  });
};
