const loadPhone = async() =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=iphone`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data);
}

const displayPhones = phones =>{
    console.log(phones)
}

loadPhone()