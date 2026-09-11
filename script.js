'use strict';

const addEventOnElements = function (elements, evenType, callBack){
    for (let i = 0, len = elements.length; i < len; i++ ){
        elements[i].addEventListener(evenType, callBack);
    }
}

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function(){
    if (window.scrollY > 100){
        header.classList.add("active");
    } else {
        header.classList.remove("active");
    }
})

const sliders = document.querySelectorAll("[data-slider]");

const initSlider = function (currentSlider) {
    const sliderContainer = currentSlider.querySelector("[data-slider-container]");
    const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
    const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

    let currentSlidePos = 0;

    const moveSliderItem = function () {
        sliderContainer.style.transform =
            `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
    };

    const slideNext = function () {
        const slideEnd =
            currentSlidePos >= sliderContainer.childElementCount - 1;

        if (slideEnd) {
            currentSlidePos = 0;
        } else {
            currentSlidePos++;
        }

        moveSliderItem();
    };

    const slidePrev = function () {
        if (currentSlidePos <= 0) {
            currentSlidePos = sliderContainer.childElementCount - 1;
        } else {
            currentSlidePos--;
        }

        moveSliderItem();
    };

    sliderNextBtn.addEventListener("click", slideNext);
    sliderPrevBtn.addEventListener("click", slidePrev);
};

for (let i = 0, len = sliders.length; i < len; i++) {
    initSlider(sliders[i]);
}