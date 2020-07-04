// В начале импортировали Slider (т.к. в нем был функционал главного слайдера)
// import Slider from './modules/slider';

// Потом стали изучать наследование. Функционал главного слайдера перенесли в slider-main.js
import MainSlider from './modules/slider/slider-main';
import MiniSlider from './modules/slider/slider-mini';

import VideoPlayer from './modules/playVideo';
import Difference from './modules/difference';
import Form from './modules/form';
import Accordion from "./modules/accordion";
import Download from "./modules/download";

window.addEventListener('DOMContentLoaded', () => {
    // первый вариант (главный слайдер в slider.js, в качестве аргументов - переменные)
    // const slider = new Slider('.page', '.next');
    // slider.render();

    // новый вариант (главный слайдер в main-slider.js, аргумент - объект)
    const slider = new MainSlider({btns: ".next", container: ".page"});
    slider.render();

    const modulesPageSlider = new MainSlider({btns: ".next", container: ".moduleapp", nextBtns: ".nextmodule", prevBtns: ".prevmodule"});
    modulesPageSlider.render();

    const showUpSlider = new MiniSlider({
        container: ".showup__content-slider",
        prev: ".showup__prev",
        next: ".showup__next",
        activeClass: 'card-active',
        animate: true
    });
    showUpSlider.init();

    const modulesSlider = new MiniSlider({
        container: ".modules__content-slider",
        prev: ".modules__info-btns .slick-prev",
        next: ".modules__info-btns .slick-next",
        activeClass: 'card-active',
        animate: true,
        autoplay: true
    });
    modulesSlider.init();

    const feedSlider = new MiniSlider({
        container: ".feed__slider",
        prev: ".feed__slider .slick-prev",
        next: ".feed__slider .slick-next",
        activeClass: 'feed__item-active'
    });
    feedSlider.init();

    new VideoPlayer('.showup .play', '.overlay').init();
    new VideoPlayer('.module__video-item .play', '.overlay').init();

    // другой вариант создания экзмемпляра и вызова метдода
    new Difference('.officerold', '.officernew', '.officer__card-item').init();

    new Form('.form').init();

    new Accordion('.module__info-show').init();

    new Download('.download').init();
});