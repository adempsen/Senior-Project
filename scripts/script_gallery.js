
// Global JS CODE ALL PAGES for HEADER - FOOTER

document.addEventListener('DOMContentLoaded', function(){
    console.log("domcontent loaded");
    
    
    const dropdownBtn = document.querySelector('.drop-down-btn');
    const dropdownMenu = document.querySelector('.header-menu');
    dropdownBtn.addEventListener('click', function(){
        console.log("menu btn clicked");
      dropdownMenu.classList.toggle('active');
    });
  

const darkModeBtn = document.querySelector('.dark-btn');
darkModeBtn.addEventListener('click', function(){
    console.log("dark mode clicked");
    darkModeActivate();
});

const contrastModeBtn = document.querySelector('.contrast-btn');
contrastModeBtn.addEventListener('click', function(){
    console.log("contrast mode clicked");
    contrastModeActivate();
})

function darkModeActivate(){
    console.log("darkMode activate");
    const darkModeElements = document.querySelectorAll('.toggle-switch');
    darkModeElements.forEach(function(element){
        element.classList.toggle('darkMode');
    });
}
// Contrast Mode
function contrastModeActivate(){
    console.log("Holy Spirit activate!");
    const constrastModeElements = document.querySelectorAll('.toggle-switch');
    constrastModeElements.forEach(function(element){
        element.classList.toggle('contrastMode');
    });
}


// SUB Menu functions 

const vinSubNavBtn = document.getElementById("subBtn-vin");
const con_subNav_event = document.getElementById("subBtn-con");
const vin_subNav_div = document.getElementById('subDiv-vin');
const con_subNav_div = document.getElementById('subDiv-con');

vinSubNavBtn.addEventListener('click', function(){
        console.log("hidden nav click");
        vin_subNav_div.classList.toggle('subNavActive');
});

con_subNav_event.addEventListener('click', function(){
    console.log("hidden nav click");
    con_subNav_div.classList.toggle('subNavActive');
    

});



// MOCK SERVER URL

const gitHubEndPoint = "https://raw.githubusercontent.com/adempsen/mockAPI_me/main/new.json";
    let currentPage = 1;
    let itemsPerPage = 4;
    let currentCategory = ''; // Add a variable to track the current category
    let currentSubCategory = '';
    let maxPages = 1; // Initialize maxPages
    let products = [];
    let allEvent = document.getElementById("allProductsBtn");

// let currentSubCategory = '';

// MENU VARIABLES NOT YET USED
let vLivingEvent = document.getElementById("vLivingBtn");
let vDiningEvent = document.getElementById("vDiningBtn");
let vBedroomEvent = document.getElementById("vBedroomBtn");
// let vAllEvent = document.getElementById("vAllBtn");

// CONTEMPORARY menu button VARIABLES 
// let cLivingEvent = document.getElementById("cLivingBtn");
// let cDiningEvent = document.getElementById("cDiningBtn");
// let cBedroomEvent = document.getElementById("cBedroomBtn");
let cAllEvent = document.getElementById("cAllBtn");
// LIGHTING menu button VARIABLES 
let lAllEvent = document.getElementById("lAllBtn");
// ALL PRODUCTS menu button VARIABLES 


// EVENT LISTENERS 
// Vintage EVENTS

vLivingEvent.addEventListener('click', function(){
    currentCategory = 'vintage';
    currentSubCategory = 'living';
fetchProductsByCategory('vintage', 'living')
changePage(1, currentCategory);
});

// vDiningEvent.addEventListener('click', () => fetchProductsByCategory('vintage', 'dining'));
// vBedroomEvent.addEventListener('click', () => fetchProductsByCategory('vintage', 'dining'));
// vBedroomEvent.addEventListener('click', () => fetchProductsByCategory('vintage', 'bedroom'));
// vAllEvent.addEventListener('click', () => fetchProductsByCategory('vintage'));

// Contemporary EVENTS 

// cLivingEvent.addEventListener('click', () => fetchProductsByCategory('modern', 'living'));
// cDiningEvent.addEventListener('click', () => fetchProductsByCategory('modern', 'dining'));
// cBedroomEvent.addEventListener('click', function() {
// currentCategory = 'modern';
// currentSubCategory = 'bedroom';
// fetchAllProducts();
// });
cAllEvent.addEventListener('click', function(){
    changeCategory('modern');
});

function changeCategory(newCategory) {
    currentCategory = newCategory;
    currentPage = 1;
    fetchProductsForPage(currentPage, itemsPerPage, currentCategory);
};
// Lighting EVENTS 

// lAllEvent.addEventListener('click', () => fetchProductsByCategory('lighting', 'none'));
// change JSON server side to add subCat: "none" to lighting

// ALL Products EVENTS 
allEvent.addEventListener('click', () => fetchAllProducts()
);

// const previousPage = document.getElementById('productPrev');
// const nextPage = document.getElementById('productNext');

// previousPage.addEventListener('click', function(){
//     console.log('what we wanna do now is go back (back)');
//     changePage(currentPage -1);
// });

// nextPage.addEventListener('click', function(){
//     console.log('the only way forward is through)');
// changePage(currentPage + 1);
// });


// FETCH Products by category FUNCTION

// let products = [];


function fetchProductsByCategory(category, subcategory) {

    fetch(gitHubEndPoint)
    .then(response => {
        if(!response.ok) {
            throw new Error('index: fetch products category (response)', response);
        }
        return response.json();
    })
    .then(data => {
        console.log('data:', data);
        const filteredProducts = data.products.filter(product => product.cat === category && product.subCat === subcategory);
        // let categoryLength = filteredProducts.length;
        displayProducts(filteredProducts);
    })
    .catch(error => {
        console.error('index fetchproductsbycategory (data):', error);
    });
}




//  FETCH all Products FUNCTION

function fetchAllProducts() {
    console.log("FetchAllProducts Called");
    fetchProductsForPage(currentPage, itemsPerPage, currentCategory);
    console.log("Calling: fetchProductsForPage");
    
}

function fetchProductsForPage(page, itemsPerPage, category){
    console.log("fetchProductsForPage Called");
    fetch(`${gitHubEndPoint}?page=${page}&limit=${itemsPerPage}&category=${category}`)
    .then(response => {
        if(!response.ok) {
        throw new Error(`Fetch Products: ${response.status} ${response.statusText}`); 
        }
        return response.json();
    })
    .then(data => {
        console.log("data Fetched:", data);
        maxPages = Math.ceil(data.products.length / itemsPerPage);
        displayProducts(data.products);
        console.log("Calling: displayProducts");
    })
    .catch(error => {
        console.error('FetchProductsForPage Error:', error);
    });
}



function displayProducts(products) {
    console.log('diplayProducts Called');
    console.log("displaying Products:", products);
    // VARIABLES
    const productContainer = document.getElementById("product-container");
    const startIndex = (currentPage -1) * itemsPerPage;
    //  clear
    productContainer.innerHTML = '';

    for (let i = startIndex; i < Math.min(startIndex + itemsPerPage, products.length); i++) {
        const productElement = createProductElement(products[i]);
        productContainer.appendChild(productElement);
    }
    document.getElementById('currentPage').textContent = `Page ${currentPage}`;
    document.getElementById('maxPages').textContent = `of${maxPages}`;
}

const previousPage = document.getElementById('productPrev');
    const nextPage = document.getElementById('productNext');

    previousPage.addEventListener('click', function(){
        changePage(currentPage - 1);
    });

    nextPage.addEventListener('click', function(){
        changePage(currentPage + 1);
    });

    function changePage(newPage) {
        currentPage = newPage;
        if(currentPage < 1){
            currentPage = 1;
        }
        if( currentPage > maxPages){
            currentPage = maxPages;
        }
    
        fetchProductsForPage(currentPage, itemsPerPage, currentCategory);   
    }





// function createProductElement(product) {
//     console.log("creating product element:", product.title);

//     const productInnerDiv = document.createElement('div');

//     const productImg = document.createElement('img');
//     productImg.src = product.images.mobile;
//     productImg.alt = product.description;
//     productInnerDiv.appendChild(productImg);

//     const productTitle = document.createElement('h2');
//     productTitle.textContent = product.title;
//     productInnerDiv.appendChild(productTitle);

//     const productDescription = document.createElement('p');
//     productDescription.textContent = product.description;
//     productInnerDiv.appendChild(productDescription);

//     const productPrice = document.createElement('p');
//     productPrice.textContent = `$ ${product.price.toFixed(2)}`;
//     productInnerDiv.appendChild(productPrice);

//     return productInnerDiv;

// }



// function getTotalCategoryPages(category) {
//     const categoryProducts = data.products[category];
//     const totalItems = categoryProducts.length;
//     const totalPages = Math.cell(totalItems / itemsPerPage);

//     return totalPages;
// }



// Display products FUNCTION 




// DIV elements FUNCTION 
function createProductElement(product) {
    console.log("creating product element:", product.title);

    const productInnerDiv = document.createElement('div');

    const productImg = document.createElement('img');
    productImg.src = product.images.mobile;
    productImg.alt = product.description;
    productInnerDiv.appendChild(productImg);

    const productTitle = document.createElement('h2');
    productTitle.textContent = product.title;
    productInnerDiv.appendChild(productTitle);

    const productDescription = document.createElement('p');
    productDescription.textContent = product.description;
    productInnerDiv.appendChild(productDescription);

    const productPrice = document.createElement('p');
    productPrice.textContent = `$ ${product.price.toFixed(2)}`;
    productInnerDiv.appendChild(productPrice);

    return productInnerDiv;

}


















// DOMcontentLoaded
});