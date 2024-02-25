document.addEventListener('DOMContentLoaded', function(){
    console.log("domcontent loaded");
// Global JS CODE ALL PAGES for HEADER - FOOTER
 
// HEADER CODE
const hamburger = document.getElementById('hamburger');
  const headerNav = document.getElementById('header-mnu');
  let dropDownSvg = document.getElementById('dropdownSvg');
  const closeMenuSvg = `id="hamburgerSvg" class="w-[44px] h-[44px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width = "100%" height="100">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 18 6m0 12L6 6"/>`;
  const defaultHamburger = `class="drop-down" id="dropdownSvg" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="100%" height="100%">
  <path stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h10"/>`;
  hamburger.addEventListener('click', function(){
      console.log('click');
  headerNav.classList.toggle('show');
  if(headerNav.classList.contains('show')){
      dropDownSvg.innerHTML = closeMenuSvg;
    }else{
      dropDownSvg.innerHTML = defaultHamburger;
    }
  })
  
  const accMenuBtn = document.getElementById('acc-menu-btn');
  const accDiv = document.getElementById('acc-container');
  accMenuBtn.addEventListener('click', function(){
      accDiv.classList.toggle('show');
      if(accDiv.classList.contains('show')){
        accMenuBtn.innerHTML = `<svg>class="toggle-switch" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width = "100%" height="100">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 18 6m0 12L6 6"/>`
      }else {
        accMenuBtn.innerHTML = `<svg class="toggle-switch" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9a3 3 0 0 1 3-3m-2 15h4m0-3c0-4.1 4-4.9 4-9A6 6 0 1 0 6 9c0 4 4 5 4 9h4Z"/>
      </svg>`
      }
  })
  

  
  
  const darkModeBtn = document.querySelector('.dark-btn');
  const darkModeElements = document.querySelectorAll('.toggle-switch');
  const darkModeIcon = document.getElementById('dark-svg');
  const darkModeDefault = `id="dark-svg" class="w-[44px] h-[44px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="100%" height="100%">
  <path  stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 0 1-.5-18v0A9 9 0 0 0 20 15h.5a9 9 0 0 1-8.5 6Z"/>`;
  const lightModeSvg = `<svg id="dark-svg" class="day-mode-svg" fill="none" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5V3m0 18v-2M7 7 5.7 5.7m12.8 12.8L17 17M5 12H3m18 0h-2M7 17l-1.4 1.4M18.4 5.6 17 7.1M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/>`
  
  darkModeBtn.addEventListener('click', function(){
      console.log("dark/light mode toggled");
      darkModeBtn.classList.toggle('active');
      if(darkModeBtn.classList.contains('active')){
          darkModeIcon.innerHTML = lightModeSvg;
      }else {
          darkModeIcon.innerHTML = darkModeDefault;
      }
      darkModeElements.forEach(function(element){
          element.classList.toggle('darkMode');
      });
  });
  
  
      const contrastModeBtn = document.querySelector('.contrast-btn');
      const contrastModeElements = document.querySelectorAll('.toggle-switch');
      contrastModeBtn.addEventListener('click', function(){
         console.log("contrast mode toggled");
         contrastModeElements.forEach(function(element){
             element.classList.toggle('contrastMode');
         });
  
     });

// SUB Menu functions 

// const vinSubNavBtn = document.getElementById("subBtn-vin");
// const con_subNav_event = document.getElementById("subBtn-con");
// const vin_subNav_div = document.getElementById('subDiv-vin');
// const con_subNav_div = document.getElementById('subDiv-con');

// vinSubNavBtn.addEventListener('click', function(){
//         console.log("hidden nav click");
//         vin_subNav_div.classList.toggle('subNavActive');
// });

// con_subNav_event.addEventListener('click', function(){
//     console.log("hidden nav click");
//     con_subNav_div.classList.toggle('subNavActive');
    

// });

// ---------------------------------------------------------------


// API PRODUCT PAGE 

const gitHubEndPoint = "https://raw.githubusercontent.com/adempsen/mockAPI_me/main/new.json";
const productContainer = document.getElementById('productContainer');
const allProducts = document.getElementById('allProducts');
const allVintage = document.getElementById('allVintage');
const allModern = document.getElementById('allModern');
const allLighting = document.getElementById('lighting');
// keeps track of which menu has been called. 
let allPcount = 1;
let allVcount = 1;
let allMcount = 1;
let allLcount = 1;
// keeps track of page count
let currentPage = 1;
// pages to make
let pages = 1;
// Items in category
let totalItems = '';
const itemsPerPage = 4;
// Start Index & End Index 
// let startIndex = (currentPage - 1) * itemsPerPage + 1;
// let endIndex = Math.min(Math.ceil(currentPage * itemsPerPage), totalItems);
// sub categories here
// event handelers 

// All Products Menu Event 
allProducts.addEventListener('click', function(){
    currentPage = 1;
    console.log('allProducts clicked');
productContainer.innerHTML = '';
console.log('clearing previous');
fetchAllProducts();

})
// All Vintage Menu Event 
allVintage.addEventListener('click', function(){
    currentPage = 1;
    console.log('allVintage clicked');
productContainer.innerHTML = '';
console.log('clearing previous');
fetchAllVintage();

})
// All Modern Menu Event 
allModern.addEventListener('click', function(){
    currentPage = 1;
    console.log('allModern Clicked');
    productContainer.innerHTML = '';
    console.log('clearing previous');
    fetchAllModern();
})
// All Lighting Menu Event 
allLighting.addEventListener('click', function(){
    currentPage = 1;
    console.log("allLighting Clicked");
    productContainer.innerHTML = '';
    console.log('clearing previous');
    fetchAllLighting();
})


//  Fetch ALL PRODUCTS
function fetchAllProducts(){
    console.log('ring ring hello');
    // clear product display
    productContainer.innerHTML = '';
    console.log('Clearing Previous');
    // resetting non active menu counters
    allVcount = 1;
    allMcount = 1;
    allLcount = 1;
    let allCallerId = fetchAllProducts;
    allPrevId = 'allprev';
    allNextId = 'allNext';
    pages = 9;
    allPcount = makeButtons(allPcount, allPrevId, allNextId, allCallerId, pages);
    console.log(`allPcount = ${allPcount}`);
    // now to call api 
    fetch(gitHubEndPoint)
    .then(response => {
        if(!response.ok){
            throw new Error("Trouble fetching JSON for fetchAllProducts: ", response);
        }
        return response.json();
    })
    .then(data =>{
        totalItems = 33;
        let startIndex = (currentPage - 1) * itemsPerPage;
        let endIndex = Math.ceil(currentPage * itemsPerPage);
        let allProductsData = data.products;
        let allProductsDisplayed = allProductsData.slice(startIndex, endIndex);
        console.log(allProductsDisplayed);
        // want to display only 4 items to the page at once

        for(let i = 0; i < allProductsDisplayed.length; i++){
            let content = appendProducts(allProductsDisplayed[i]);
            productContainer.appendChild(content);
        }
        
    })
    .catch(error => {
        console.log(`Catch Error for fetchAllProducts: `, error);
    })
    // slice data for pagination 
    // display to page

}
// fetch ALL VINTAGE PRODUCTS
function fetchAllVintage(){
    console.log('ring ring hello vintage');
    // clear product display
    productContainer.innerHTML = '';
    console.log('Clearing Previous');
    // resetting non active menu counters
    allPcount = 1;
    allMcount = 1;
    allLcount = 1;
    let allVcallerId = fetchAllVintage;
    allVprevId = 'allVprev';
    allVnextId = 'allVnext';
    pages = 4;
    allVcount = makeButtons(allVcount, allVprevId, allVnextId, allVcallerId, pages);
    console.log(`allVcount = ${allVcount}`);
    // now to call api 
    fetch(gitHubEndPoint)
    .then(response => {
        if(!response.ok){
            throw new Error("Trouble fetching JSON for fetchAllVintage: ", response);
        }
        return response.json();
    })
    .then(data =>{
        totalItems = 33;
        let startIndex = (currentPage - 1) * itemsPerPage;
        let endIndex = Math.ceil(currentPage * itemsPerPage);
        let allVintageData = data.products.filter(product => product.cat ==='vintage');
        let allVintageDisplayed = allVintageData.slice(startIndex, endIndex);
        console.log(allVintageDisplayed);
        // want to display only 4 items to the page at once

        for(let i = 0; i < allVintageDisplayed.length; i++){
            let content = appendProducts(allVintageDisplayed[i]);
            productContainer.appendChild(content);
        }
        
    })
    .catch(error => {
        console.log(`Catch Error for fetchAllVintage: `, error);
    })
    // slice data for pagination 
    // display to page

}

// fetch ALL MODERN PRODUCTS
function fetchAllModern(){
    console.log('ring ring hello Modern');
    // clear product display
    productContainer.innerHTML = '';
    console.log('Clearing Previous');
    // resetting non active menu counters
    allPcount = 1;
    allVcount = 1;
    allLcount = 1;
    let allMcallerId = fetchAllModern;
    allMprevId = 'allMprev';
    allMnextId = 'allMnext';
    pages = 3;
    allMcount = makeButtons(allMcount, allMprevId, allMnextId, allMcallerId, pages);
    console.log(`allMcount = ${allMcount}`);
    // now to call api 
    fetch(gitHubEndPoint)
    .then(response => {
        if(!response.ok){
            throw new Error("Trouble fetching JSON for fetchAllModern: ", response);
        }
        return response.json();
    })
    .then(data =>{
        totalItems = 33;
        let startIndex = (currentPage - 1) * itemsPerPage;
        let endIndex = Math.ceil(currentPage * itemsPerPage);
        let allModernData = data.products.filter(product => product.cat ==='modern');
        let allModernDisplayed = allModernData.slice(startIndex, endIndex);
        console.log(allModernDisplayed);
        // want to display only 4 items to the page at once

        for(let i = 0; i < allModernDisplayed.length; i++){
            let content = appendProducts(allModernDisplayed[i]);
            productContainer.appendChild(content);
        }
        
    })
    .catch(error => {
        console.log(`Catch Error for fetchAllModern: `, error);
    })
    // slice data for pagination 
    // display to page

}

// fetch ALL LIGHTING PRODUCTS
function fetchAllLighting(){
    console.log('ring ring hello Modern');
    // clear product display
    productContainer.innerHTML = '';
    console.log('Clearing Previous');
    // resetting non active menu counters
    allPcount = 1;
    allVcount = 1;
    allMcount = 1;
    let allLcallerId = fetchAllLighting;
    allLprevId = 'allLprev';
    allLnextId = 'allLnext';
    pages = 2;
    allLcount = makeButtons(allLcount, allLprevId, allLnextId, allLcallerId, pages);
    console.log(`allMcount = ${allMcount}`);
    // now to call api 
    fetch(gitHubEndPoint)
    .then(response => {
        if(!response.ok){
            throw new Error("Trouble fetching JSON for fetchAllLighting: ", response);
        }
        return response.json();
    })
    .then(data =>{
        totalItems = 33;
        let startIndex = (currentPage - 1) * itemsPerPage;
        let endIndex = Math.ceil(currentPage * itemsPerPage);
        let allLightingData = data.products.filter(product => product.cat ==='lighting');
        let allLightingDisplayed = allLightingData.slice(startIndex, endIndex);
        console.log(allLightingDisplayed);
        // want to display only 4 items to the page at once

        for(let i = 0; i < allLightingDisplayed.length; i++){
            let content = appendProducts(allLightingDisplayed[i]);
            productContainer.appendChild(content);
        }
        
    })
    .catch(error => {
        console.log(`Catch Error for fetchAllLighting: `, error);
    })
    // slice data for pagination 
    // display to page

}



// DYNAMIC PRODUCT DISPLAY BUTTONS
function makeButtons(countId, prev, next, fetchId, pages){
    const paginationDiv = document.getElementById("pagination");
    if(countId == 1 && paginationDiv != ''){
        paginationDiv.innerHTML = '';
        console.log('clearing old buttons');
    }
    if(countId == 1){
     let prev = document.createElement('button');
     prev.innerText = `<`;
        prev.className = "paginationBtn";
        prev.ariaLabel = "Load Previous Page Button";
        prev.addEventListener('click', function() {
            currentPage -= 1;
            if(currentPage < 1){
                currentPage = 1;
            }
            fetchId();
        })
        paginationDiv.appendChild(prev);
        let next = document.createElement('button');
        next.innerText = `>`;
        next.className = "paginationBtn";
        next.ariaLabel = "Load Next Page Button";
        next.addEventListener('click', function() {
            currentPage += 1;
            if(currentPage > pages){
                currentPage = pages;
            }
            fetchId();
        })
        paginationDiv.appendChild(next);
        console.log('creating pagination controls:');
    }else {
        console.log("count: ", countId);
    }
    countId = 100;
    console.log(`${fetchId.name} called.`);
    return countId;
    // need to make sure that the call count gets updated
    // so that more buttons aren't made when fetch gets called
}




// DISPLAY PRODUCTS TO PAGE
  function appendProducts(data){
    const productInnerDiv = document.createElement('div');
        productInnerDiv.className = "productCard";
        const productImg = document.createElement('img');
        productImg.src = data.images.mobile;
        productImg.alt = data.description;
        productInnerDiv.appendChild(productImg);
    
        const productTitle = document.createElement('h2');
        productTitle.textContent = data.title;
        productInnerDiv.appendChild(productTitle);
    
        const productDescription = document.createElement('p');
        productDescription.classList = 'productText';
        productDescription.textContent = data.description;
        productInnerDiv.appendChild(productDescription);
    
        const productPrice = document.createElement('p');
        productPrice.classList = 'productText';
        productPrice.textContent = `$ ${data.price.toFixed(2)}`;
        productInnerDiv.appendChild(productPrice);

        const addToCartBtn = document.createElement('button');
        addToCartBtn.innerText = 'Add To Cart';
        addToCartBtn.className = 'apiCartBtn';
        addToCartBtn.id = data.id;
        productInnerDiv.appendChild(addToCartBtn);
        addToCartBtn.addEventListener('click', function(event){
            console.log('cartbtn clicked');
            const buttonId = event.target.id;
            fetchProductData(buttonId);
        });
        return productInnerDiv;
  }


    let cart = {
        products: []
        };
        
        localStorage.setItem('itemsInCart', JSON.stringify(cart));
        cartBtns = document.querySelectorAll('.apiCartBtn');

    function fetchProductData(id){
        const productId = id;
        fetch(gitHubEndPoint)
        .then(response => response.json())
        .then(data => {
            const newCartItem = data.products.find(product => product.id == productId);
            appendCart(newCartItem);
            
        });
        
    }
   
    function appendCart(object){
        let productObject = object;
    
        let itemsInCart = localStorage.getItem('itemsInCart');
    
        let productData = {products: []};
    
        if(itemsInCart) {
             productData = JSON.parse(itemsInCart);
        }
        let newItem = productObject;
    
        productData.products.push(newItem);

        localStorage.setItem('itemsInCart', JSON.stringify(productData));
        console.log(productData);
    
    }


    // header script

    
    

});