const phoneData = (searchText,dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showPhones(data.data,dataLimit))
}
const showPhones = (phones,dataLimit) => {
    const container = document.getElementById("phone-container");
    container.textContent = "";
    // display 10 phones
    const showAll = document.getElementById("show-all");
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0, 10);
        showAll.classList.remove("d-none")
    } else{
showAll.classList.add("d-none")
    }
    
    // No phone found
    const noPhoneFound = document.getElementById("no-phone-found");
    if (phones.length === 0) {
        noPhoneFound.classList.remove("d-none")
    } else {
        noPhoneFound.classList.add("d-none")
    }

    // All phone 
    phones.forEach(phone => {
        console.log(phone.image);
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
                     <div class="card">
                        <img src="${phone.image}" class="card-img-top p-3" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                                to additional content. This content is a little bit longer.</p>
                                <button onclick ="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                        </div>
                    </div>
        `
        container.appendChild(div);
        // stop loading 
        toggleSpinner(false)
    });

}

const processSearch = (dataLimit ) =>{
    toggleSpinner(true)
    const inputField = document.getElementById("input-field")
    const searchText = inputField.value;
    phoneData(searchText, dataLimit);
}

document.getElementById("btn-search").addEventListener('click', function () {

    processSearch(10)
    // start loading
    // console.log(searchText);
});

// search input key event handler

document.getElementById("input-field").addEventListener('keypress',function(e){
    if(e.key == "Enter"){
        processSearch(10)
    }
})

const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById("loader");
    if(isLoading){
        loaderSection.classList.remove("d-none")
    }else{
        loaderSection.classList.add("d-none")
    }
}

// show more than 10 phone

document.getElementById("btn-show-all").addEventListener('click',function(){
processSearch();
});

const loadPhoneDetails =id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data)) 
}

const displayPhoneDetails = phone =>{
console.log(phone);
const modalTitle = document.getElementById("phoneDetailModalLabel");
modalTitle.innerText = phone.name;
const phoneDetails = document.getElementById("phone-details");
phoneDetails.innerHTML = `
<p>Brand: ${phone.brand}</p>
<p> Release date: ${phone.releaseDate? phone.releaseDate:'No Release date found'}</p>
<p>Bluetooth: ${phone.others.Bluetooth? phone.others.Bluetooth:"No bluetooth found"}</p>
<p>Storage: ${phone.mainFeatures.memory? phone.mainFeatures.memory:"No memory found"}</p>
`
}

phoneData('apple');

