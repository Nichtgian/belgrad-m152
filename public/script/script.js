const COLORPROPERTIES = [
  { name: "--main-primary", light: "#0077c2", dark: "#8e0000" },
  { name: "--main-secondary", light: "#42a5f5", dark: "#d50000" },
  { name: "--main-tertiary", light: "#80d6ff", dark: "#ff1744" }
];

const SLIDEIMAGES = [
  { src: "https://via.placeholder.com/200x100.png?text=Image 1", alt: "image 1 alt" },
  { src: "https://via.placeholder.com/800x300.png?text=Image 2", alt: "image 2 alt" },
  { src: "https://via.placeholder.com/300x500.png?text=Image 3", alt: "image 3 alt" }
];

const DAYINMS = 24 * 60 * 60 *1000;

let lastWindowInnerWidth = window.innerWidth;
let currentSlideImage = 0;

initializeTheme();
changeMenu();

window.onresize = () => {
  let newInnerWidth = window.innerWidth;
  if (lastWindowInnerWidth <= 500 && window.innerWidth > 500) {
    changeMenu();
  }
  lastWindowInnerWidth = newInnerWidth;
}

function skipSlide(direction) {
  currentSlideImage = calculateNewImageIndex(direction, currentSlideImage, SLIDEIMAGES);

  let newSlideImage = SLIDEIMAGES[currentSlideImage];
  let sliderElement = document.getElementById("sliderImage");
  sliderElement.src = newSlideImage.src;
  sliderElement.alt = newSlideImage.alt;
  sliderElement.style.animation = "none";

  setTimeout(() => {
    sliderElement.style.animation = '';
  }, 1);
}

function calculateNewImageIndex(direction, currentIndex, slides) {
  let index = currentIndex;

  if (direction < 0) {
    index--;
    if (index < 0) {
      index = slides.length -1;
    }
  } else {
    index++;
    if (index >= slides.length) {
      index = 0;
    }
  }

  return index;
}

function zoomAttraction(buttonElement) {
  let attraction = buttonElement.parentNode;
  let collapse = !attraction.classList.contains("zoomed");

  collapseAllAttractions();

  if (collapse) {
    attraction.classList.add("zoomed");
    buttonElement.innerHTML = "<img src='src/icon/expand_less.svg' alt='icon expand_less'>";

    let contentContainer = attraction.querySelectorAll(".content")[0];
    contentContainer.querySelectorAll("span, img").forEach((contentElement) => {
      contentElement.style.display = "block";
    });
  }
}

function collapseAllAttractions() {
  let attractions = document.getElementById("attractions");
  attractions =  attractions.querySelectorAll("#attractions > .col");

  attractions.forEach((col) => {
    let button = col.querySelectorAll("button")[0];
    let contentContainer = col.querySelectorAll(".content")[0];
    contentContainer.querySelectorAll("span:not(.preview), img").forEach((contentElement) => {
      contentElement.style.display = "none";
    });

    col.classList.remove("zoomed");
    button.innerHTML = "<img src='src/icon/expand_more.svg' alt='icon expand_more'>";
  });
}

function changeMenu() {
  let menuButton = document.getElementById("menu");
  let ul = menuButton.parentNode.querySelectorAll("ul")[0];

  if (window.innerWidth > 500 || menuButton.innerHTML.includes("menu.svg")) {
    menuButton.innerHTML = "<img src='src/icon/close.svg' alt='icon close menu'>";
    ul.style.display = "flex";
  } else {
    menuButton.innerHTML = "<img src='src/icon/menu.svg' alt='icon open menu'>";
    ul.style.display = "none";
  }
}

function initializeTheme() {
  document.getElementById("toggle").style.display = "block";
  document.getElementById("toggle-placeholder").style.display = "none";

  let currentTheme = getCookie("theme");
  if (currentTheme == null || currentTheme == undefined) {
    setCookie("theme", "blue");
  } else {
    toggleTheme(currentTheme);
  }
}

function changeTheme() {
  let currentTheme = getCookie("theme");
  if (currentTheme == "red" || currentTheme == null || currentTheme == undefined) {
    setCookie("theme", "blue");
    toggleTheme("blue");
  } else {
    setCookie("theme", "red");
    toggleTheme("red");
  }
}

function toggleTheme(color) {
  let root = document.documentElement;
  let toggleButton = document.getElementById("toggle");

  if (color == "blue") {
    toggleButton.innerHTML = "<img src='src/icon/toggle_off.svg' alt='icon toggle theme off'>";
  } else {
    toggleButton.innerHTML = "<img src='src/icon/toggle_on.svg' alt='icon toggle theme on'>";
  }

  COLORPROPERTIES.forEach((property) => {
    let theme = color == "blue" ? property.light : property.dark;
    root.style.setProperty(property.name, theme);
  });
}

function setCookie(name, value) {
    let expires = new Date(new Date().getTime() + (100 * DAYINMS)).toUTCString();
    document.cookie = name + "=" + value + "; expires=" + expires + "; path=/";
}

function getCookie(name) {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");

  if (parts.length == 2) {
    return parts
      .pop()
      .split(";")
      .shift();
  }
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
