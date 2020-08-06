// Slideshow Animation
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("slides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" highlight", "");
  }
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " highlight";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

// Building Dynamic Navigation Bar
const sections = document.querySelectorAll('section');
const navigation = document.getElementById('nav_list');
// const startingTime = performance.now (); //check the performance of this code block
const fragment = document.createDocumentFragment(); // using a DocumentFragment to speed up performance

for (const section of sections) {
    const navigationUl = document.createElement('li');
    navigationUl.innerHTML = `<a class="menu_link ${section.id}" href="#${section.id}"> ${section.dataset.nav}</a>`; //section.dataset.nav extracts the data-nav attribute
    fragment.appendChild(navigationUl);
}

navigation.appendChild(fragment); // reflow and repaint here --once! Without the fragment would have 4 reflows and repaints (1 for each loop iteration)
// const endingTime = performance.now ();
// console.log('This code took ' + (endingTime - startingTime) + ' milliseconds.');

// Add class 'active' to section when it is near top of viewport
function makeActive() {
  for (const section of sections) {
      const box = section.getBoundingClientRect();  // get coordinates of each section element
      let link = section.id;
      let navLink = document.querySelector(`.${link}`);
      if (box.top <= 150 && box.bottom >= 150) {
          section.classList.add('active_class');
          navLink.classList.add('active');
      }
      else {
          section.classList.remove('active_class');
          navLink.classList.remove('active');
      }
  }
}

document.addEventListener("scroll", function () {
  makeActive();
});

// Scroll smoothly to the desired section
document.querySelector('#nav_list').addEventListener("click", function (event) {
  if (event.target.nodeName === 'A') {
      event.preventDefault();
      let targetName = event.target.getAttribute("href"); 
      window.scrollTo ({
          top: document.querySelector(targetName).offsetTop,
          behavior: "smooth"
  });
}
});

// Hide the Navigation bar when the user is not scrolling
let timer = null;
document.addEventListener('scroll', function () {
    const hideNav = document.querySelector('nav');
    if(timer !== null) {
        clearTimeout(timer);
        hideNav.style.display = "flex";
    }
    timer = setTimeout(function () {
        hideNav.style.display = "none";
    }, 2000);
});

// Get the button
const myButton = document.getElementById("backToTop");

// When the user scrolls down 35px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 35 || document.documentElement.scrollTop > 35) {
    myButton.style.display = "flex";
  } 
  else {
    myButton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  window.scrollTo ({
      top: 0,
      behavior: "smooth"
  });
}

myButton.addEventListener("click", function() {
  console.log("You clicked back to top");
});

// Collapsible menu
let coll = document.getElementsByClassName("collapsible");
let n;

for (n = 0; n < coll.length; n++) {
  coll[n].addEventListener("click", function() {
    let content = this.nextElementSibling;
    if (content.style.display === "flex") {
      content.style.display = "none";
    } else {
      content.style.display = "flex";
    }
  });
} 