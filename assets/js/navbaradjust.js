const sectionOne = document.getElementById("section-one");
const sectionOneHeight = sectionOne.clientHeight;
const about = document.getElementById("about");
const navbar = document.getElementById("navbar");
var lastScrollTop = 0;
var scrollDirection = "d";

function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function () {
    let context = this, args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function navbarAdjust() {

  let st = window.pageYOffset || document.documentElement.scrollTop;

  if (st > lastScrollTop) {
    scrollDirection = "d";
  } else {
    scrollDirection = "u";
  }

  lastScrollTop = st <= 0 ? 0 : st;

  if (scrollDirection === "d") {
    if (window.pageYOffset >= sectionOneHeight) {
      navbar.classList.remove("not-fixed");
      navbar.classList.add("sticky");
    } else if (window.pageYOffset >= 50) {
      navbar.classList.remove("fixed-bottom");
      navbar.classList.add("not-fixed");
    }
  } else {
    if (window.pageYOffset < 50) {
      navbar.classList.remove("not-fixed");
      navbar.classList.add("fixed-bottom");
    } else if (window.pageYOffset < sectionOneHeight) {
      navbar.classList.remove("sticky");
      navbar.classList.add("not-fixed");
    }
  }
}

window.addEventListener('scroll', debounce(navbarAdjust));