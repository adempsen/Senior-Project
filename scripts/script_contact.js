// FORM VALIDATION AND REGEX
// constants
document.addEventListener("DOMContentLoaded", function(){
    console.log("contact page DOMcontent loaded");
    const form = document.getElementById("user-form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const commentInput = document.getElementById("comment");
    // error message divs
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");
    const commentError = document.getElementById("commentError");
    // form reset
    const formReset = function(){
      console.log("resetting form");
      console.log("resetting name");
      nameError.innerHTML = "";
      console.log("resetting email");
      emailError.innerHTML = "";
      console.log("resetting phone");
      phoneError.innerHTML = "";
      console.log("resetting comments");
      commentError.innerHTML = "";
    };
    
    
    form.addEventListener("submit", function(event){
    console.log("submit attempted");
    // regex
    const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)?$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\d{10,}$/;
    const commentRegex = /^[A-Za-z.,?!@#&*+=_\s-]{10,}$/;
    
    if(!nameRegex.test(nameInput.value)){
      console.log("invalid name");
      event.preventDefault();
      nameError.innerHTML = `<p class="invalid">Please enter Valid Name</p>`
    }else{
      nameError.innerHTML = "";
    } 
    if(!emailRegex.test(emailInput.value)){
      console.log("invalid email");
      event.preventDefault();
      emailError.innerHTML = `<p class="invalid">Please enter Valid Email</p>`
    }else{
      emailError.innerHTML = "";
    }
    if(!phoneInput.value == "" && !phoneRegex.test(phoneInput.value)){
      console.log("invalid phone number");
      event.preventDefault();
      phoneError.innerHTML = `<p class="invalid">Please enter phone number</p>`
    }else {
      phoneError.innerHTML = "";
    }
    if(!commentRegex.test(commentInput.value)){
      console.log("invalid comment input");
      event.preventDefault();
      commentError.innerHTML = `<p class="invalid">Please enter at least 10 characters. Special Characters not allowed.</p>`
    }else {
      commentError.innerHTML = "";
    }
    if(!nameError.innerHTML && !emailError.innerHTML && !phoneError.innerHTML && !commentError.innerHTML){
      console.log("form submited");
      alert("Form Submited Sucsessfully. Thank you for contacting Metro Eclectic.");
      setTimeout(formReset, 0);
      form.reset();
    }  
    });
  });