const loadPhone = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    const noFound = document.getElementById('no-found-message');
    if (phones.length === 0) {
        noFound.classList.remove('d-none');
    }
    else {
        noFound.classList.add('d-none');
    }
    // console.log(phones);
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent = '';
    phones.forEach(phone => {
        // console.log(phone)
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-3">
            <img src="${phone.image}" class="card-img-top w-75 mx-auto" alt="...">
            <div class="card-body">
            <h5 class="card-title">${phone.brand}</h5>
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.</p>
            <button onclick="loadPhoneDetails('${phone.slug}')" type="button" href="#" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
            </div>
        </div>`;
        phonesContainer.appendChild(phoneDiv);
    });
    toggleSpinner(false);
}

const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function () {
    processSearch(10);
    // searchField.value = ''; 
})

document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
        // code for enter
    }
});

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
    console.log('lol')
})

const loadPhoneDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data)
}

const displayPhoneDetails = (phone) =>{
    document.getElementById('phoneDetailModalLabel').innerText = phone.name;
    document.getElementById('phone-details').innerHTML = `
    <img id="modalImage" class="img-fluid rounded-start" src="${phone.image}" alt="">
    <p>Release Date : ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
    <p>Release Date : ${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : 'No Cheapset Found'}</p>
    `
}

// loadPhone('apple');