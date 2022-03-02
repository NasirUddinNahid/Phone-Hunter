// Showing Invalid Error
function firstError(err) {
    return (document.getElementById("Invalid").style.display = err);
}



// unknown product error
function secondError(errTwo) {
    return document.getElementById("unknown").style.display = errTwo;
}


// taking the value from the search field
const searchInputValue = (field) => {
    const searchInput = document.getElementById(field);
    const searchInputValues = searchInput.value;
    return searchInputValues;
};



document.getElementById("search-button").addEventListener("click", () => {
    if (searchInputValue("serch-field") === "") {
        firstError("inherit");
    } else {
        fetch(
            `https://openapi.programming-hero.com/api/phones?search=${searchInputValue(
                "serch-field"
            )}`
        )
            .then((res) => res.json())
            .then((data) => {
                showDataOnUi(data);
                phoneDetail();
            })
            .catch((error) => console.log("hello"));
    }
});



const showDataOnUi = (product) => {
    console.log(product.data.length);
    if (product.data.length == 0) {
        secondError("inherit")
    } else {
        const productWrapper = document.getElementById("product-wrapper");
        productWrapper.innerHTML = "";
        const productElement = product.data;
        secondError("none")
        firstError("none");
        productElement.slice(0, 20).forEach((element) => {
            console.log(element.length);
            const div = document.createElement("div");
            div.classList.add("product");
            div.innerHTML = `
      <img src="${element.image}" alt="">
      <h3 class="brand-name">${element.brand}</h3>
      <h3 class="product-name">${element.phone_name}</h3>
      <a id="detail-btn" href="#" data-slug=${element.slug}>Detail</a>
      `;
            productWrapper.appendChild(div);
        });
    }

};


function phoneDetail() {
    document
        .getElementById("product-wrapper")
        .addEventListener("click", function (E) {
            if (E.target.matches("#detail-btn")) {
                const slug = E.target.dataset.slug;
                console.log(slug);
                fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
                    .then((response) => response.json())
                    .then((d) => phoneDetailUi(d));
            }
        });
}


const phoneDetailUi = (data) => {
    console.log(data.data);
    const detailsProductDiv = document.getElementById("product-detail-wrapper");
    detailsProductDiv.innerHTML = `
    <img src="${data.data.image}" alt="">
    <p>${data.data.mainFeatures.chipSet}</p>
    <p>${data.data.mainFeatures.displaySize}</p>
    <p>${data.data.mainFeatures.memory}</p>
    <p>${data.data.releaseDate}</p>
    <p>${data.data.mainFeatures.sensors}</p>
    <p>Blutooth: ${data.data.others.Bluetooth}</p>
    <p>Gps: ${data.data.others.GPS}</p>
    <p>Nfc: ${data.data.others.NFC}</p>
    <p>Nfc: ${data.data.others.Radio}</p>
    <p>Nfc: ${data.data.others.USB}</p>
    <p>Nfc: ${data.data.others.WLAN}</p>
    
    `;
};