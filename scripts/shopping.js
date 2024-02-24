document.addEventListener('DOMContentLoaded', function(){


   
    
    


let itemsIncart = JSON.parse(localStorage.getItem('itemsInCart'));
console.log("objects: ", itemsIncart);
// let editableArray = Array.from(itemsIncart.products);

const cartTotal = document.getElementById("totalDamage");
// let itemCount = 0;
let itemIndex = 0;
let sourceArray = [];
let altArray = [];
let count = 1;


loadCart(itemsIncart);





function loadCart(object){
    console.log('calling loadcart');
    console.log("loading data: ", object);

    let cartData = object;
    let totalCost = 0;
    count = 0;
    const cartDiv = document.getElementById('shopping-cart-container');
    cartDiv.innerHTML = ``;
    if(cartData && cartData.products && cartData.products.length > 0){

        cartData.products.forEach(product => {
            let cartItem = createProduct(product, count);
            cartDiv.appendChild(cartItem);

        totalCost += parseFloat(product.price);
        count += 1;
});
let cartStatusDisplay = document.getElementById('cart-status');
cartStatusDisplay.innerText = `Items in Cart: ${cartData.products.length}`;
let cartTotal = document.getElementById("totalDamage");
cartTotal.innerText = 'Total: $' + totalCost.toFixed(2);
updateSideBarDisplay();
    }

}

const sideBarBtnPrev = document.getElementById("side-bar-img-prev");
const sideBarBtnNext = document.getElementById("side-bar-img-next");

sideBarBtnNext.addEventListener('click', function(){
    console.log('next item display clicked');
    itemIndex = itemIndex + 1;
    if(itemIndex >= sourceArray.length){
        itemIndex = sourceArray.length -1;
    }
    updateSideBarDisplay();
})
sideBarBtnPrev.addEventListener('click', function(){
    itemIndex = itemIndex - 1;
    if(itemIndex <= 0){
        itemIndex = 0;
    }
    updateSideBarDisplay();
})

function updateSideBarDisplay(){
    let sideBarImg = document.getElementById('side-bar-img');
   let imgDescription = document.getElementById('sideBarP');
   if (sourceArray.length > 0 && itemIndex >= 0 && itemIndex < sourceArray.length) {
    sideBarImg.src = sourceArray[itemIndex];
    sideBarImg.alt = altArray[itemIndex];
    imgDescription.innerText = altArray[itemIndex];
} else {
    // Handle the case when there are no more items in the array
    sideBarImg.src = "/assets/hero-logo-placeholder.png";
    imgDescription.innerText = '';
}
}

const cartDiv = document.getElementById('shopping-cart-container');

cartDiv.addEventListener('click', function(event) {
  if (event.target.classList.contains('qtyRemove')) {
    let btnId = event.target.id;
    let removeThisId = btnId.match(/\d+/)[0];
    let removeIndex = removeThisId - 1;
    console.log("removeArrayIndex: ", removeIndex);
    console.log("remove cart item: ", removeThisId);
    const cartItemContainer = event.target.closest('.cart-item-container');
    updateAndDisplay(removeThisId);
    if(cartItemContainer){
        cartItemContainer.remove();
    }
  }
});

function updateAndDisplay(indexID) {
    console.log(`incoming: index: ${indexID}`);
    let index = indexID;
    let storageData = JSON.parse(localStorage.getItem('itemsInCart'));
    if (storageData.products.length <= 1) {
        // If no items are left, set products to an empty array
        storageData.products = [];
        sourceArray = [];
        altArray = [];
        localStorage.setItem('itemsInCart', JSON.stringify(storageData));
        let cartStatusDisplay = document.getElementById('cart-status');
        cartStatusDisplay.innerText = `Your Cart Is Empty`;
        let cartTotal = document.getElementById("totalDamage");
        cartTotal.innerText = 'Total: $0:00';
        console.log(`outgoing: ${storageData.products}/${sourceArray}/${altArray}`);
    }
    if (storageData.products && storageData.products.length > 0) {
        storageData.products.splice(index, 1);
        localStorage.setItem('itemsInCart', JSON.stringify(storageData));
        sourceArray.splice(index, 1);
        altArray.splice(index, 1);
    } 
    console.log(`outgoing: ${storageData.products}/${sourceArray}/${altArray}`);
    updateSideBarDisplay();
    loadCart(storageData);
   }

function createProduct(item, count){
    let product = item;
    let id = count;
    let cartItem = document.createElement('div');
    cartItem.className = "cart-item";
    cartItem.id = `item${id}`;
    // wrapper for image and title - cartItem child
    let cartImgDiv = document.createElement('div');
    cartImgDiv.className = "cart-item-img-wrapper";
    cartItem.appendChild(cartImgDiv);
    // image - cartImgDiv Child
    let cartImg = document.createElement('img');
    cartImg.src = product.images.mobile;
    sourceArray.push(cartImg.src);
    cartImg.alt = product.description;
    altArray.push(cartImg.alt);
    console.log(sourceArray, altArray);
    cartImgDiv.appendChild(cartImg);
    // item title - cartImgDiv child
    let itemTitle = document.createElement('p');
    itemTitle.innerText = product.title;
    cartImgDiv.appendChild(itemTitle);
   
    // wrapper for qty items - cartItem child
    let qtyWrapper = document.createElement('div');
    qtyWrapper.className = "cart-item-qty-wrapper";
    cartItem.appendChild(qtyWrapper);
    // wrapper for buttons - qtyWrapper child
    let qtyBtnWrapper = document.createElement('div');
    qtyBtnWrapper.className = "qty-btn-wrapper";
    qtyWrapper.appendChild(qtyBtnWrapper);
    let lessQtyBtn = document.createElement('button');
    lessQtyBtn.innerText = 'Remove';
    lessQtyBtn.className = "qtyRemove im-a-button";
    lessQtyBtn.id = `qtyRemoveId${id}`;
    qtyBtnWrapper.appendChild(lessQtyBtn);
   
    return cartItem;
}

const cancelBtn = document.getElementById('clearCart');
cancelBtn.addEventListener('click', function(){
clearCart();
})

function clearCart() {
    // Clear display
    const cartDiv = document.getElementById('shopping-cart-container');
    cartDiv.innerHTML = '';

    // Reset values
    itemIndex = 0;
    sourceArray = [];
    altArray = [];

    // Clear local storage
    localStorage.removeItem('itemsInCart');

    // Update side bar display with default values
    updateSideBarDisplay();
    loadCart();
}



const paymentForm = document.getElementById('cart-payment');
const checkOutBtn = document.getElementById('checkOut');

checkOutBtn.addEventListener('click', function(){
    console.log('checkout clicked');
    paymentForm.classList.toggle('show');
});

const paymentSubmitBtn = document.getElementById("payment-submit-btn");
paymentSubmitBtn.addEventListener('click', function(){
    validateForm();
})

function validateForm() {
    const cardholder = document.getElementById('cardholder').value;
    const cardnumber = document.getElementById('cardnumber').value;
    const expiration = document.getElementById('expiration').value;
    const cvv = document.getElementById('cvv').value;

    // Simple validation example
    if (!cardholder || !cardnumber || !expiration || !cvv) {
        alert('Please fill in all fields.');
        return false;
    }

    // Regular expressions for validation
    const cardNumberPattern = /^[0-9]{16}$/;
    const expirationPattern = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
    const cvvPattern = /^[0-9]{3}$/;

    if (!cardNumberPattern.test(cardnumber)) {
        alert('Please enter a valid card number.');
        return false;
    }

    if (!expirationPattern.test(expiration)) {
        alert('Please enter a valid expiration date (MM/YY).');
        return false;
    }

    if (!cvvPattern.test(cvv)) {
        alert('Please enter a valid CVV.');
        return false;
    }

    return true; // Allow form submission
}

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
})

});


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

