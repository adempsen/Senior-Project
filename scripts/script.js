document.addEventListener('DOMContentLoaded', function(){
  console.log('hello');
  
  
  const hamburger = document.getElementById('hamburger');
  const headerNav = document.getElementById('header-mnu');
  let dropDownSvg = document.getElementById('dropdownSvg');
  const closeMenuSvg = `id="hamburgerSvg" class="toggle-switch" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width = "100%" height="100">
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
  const darkModeDefault = `id="dark-svg" class="toggle-switch" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="100%" height="100%">
  <path  stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 0 1-.5-18v0A9 9 0 0 0 20 15h.5a9 9 0 0 1-8.5 6Z"/>`;
  const lightModeSvg = `id="dark-svg" class="day-mode-svg toggle-switch" fill="none" viewBox="0 0 24 24">
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
  
     // CAROUSEL SLIDE SHOW  
  // variables/constants 
  
      const carousel = document.getElementById("slides-container");
    const slide = document.querySelector(".slide");
    const prevBtn = document.getElementById("previous-btn");
    const nextBtn = document.getElementById("next-btn");
    
    nextBtn.addEventListener("click", function(){
      console.log("next-btn clicked");
      const slideWidth = slide.clientWidth;
      carousel.scrollLeft += slideWidth;
    });
    
    prevBtn.addEventListener("click", function(){
      console.log("prev-btn clicked");
    const slideWidth = slide.clientWidth;
    carousel.scrollLeft -= slideWidth;
  
    });
  
  
      
  