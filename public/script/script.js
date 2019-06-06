let currentSlideImage = 0;
let slideImages = [
  { src: "https://via.placeholder.com/200x100.png?text=Image 1", alt: "image 1 alt" },
  { src: "https://via.placeholder.com/800x300.png?text=Image 2", alt: "image 2 alt" },
  { src: "https://via.placeholder.com/300x500.png?text=Image 3", alt: "image 3 alt" }
];

function skipSlide(direction) {
  currentSlideImage = calculateNewImageIndex(direction, currentSlideImage, slideImages);

  let newSlideImage = slideImages[currentSlideImage];
  let sliderElement = document.getElementById("sliderImage");
  sliderElement.src = newSlideImage.src;
  sliderElement.alt = newSlideImage.alt;
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
