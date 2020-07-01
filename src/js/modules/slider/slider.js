export default class Slider {
    // в первом варианте (для одного слайдера) передавали в конструктор аргументы
    // constructor(page, btns) {
    // в основном варианте передаем в конструктор объект. Если при создании экземпеляра не был передан объект, то ошибки не будет, т.к. задали значение по умолчанию путой объект (={})
    // Используем деструктуризацию объекта, поэтому все значения можно задавать в любом порядке
    // null в качестве дефолтных значений, т.к. в этом случае querySelector не будут выдвыать ошибку
    constructor({container = null, btns = null, next = null, prev = null, activeClass = '', animate, autoplay} = {}) {
        this.container = document.querySelector(container);
        this.slides = this.container.children;
        this.btns = document.querySelectorAll(btns);
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoplay = autoplay;
        this.slideIndex = 1;
    }



    // далее идет функционал главного слайдера (который переключает страницы). Делали его изначально, но затем изменили структуру. Перенесли весь функционал в slider-main.js
    // showSlides(n) {
    //     if (n > this.slides.length) {
    //         this.slideIndex = 1;
    //     }

    //     if (n < 1) {
    //         this.slideIndex = this.slideIndex.length;
    //     }

    //     try {

    //         this.hiddenBlock.style.opacity = '0';

    //         if (n == 3) {
                
    //             this.hiddenBlock.classList.add('animated');
    
    //             setTimeout(() => {
    //                 this.hiddenBlock.style.opacity = '1';
    //                 this.hiddenBlock.classList.add('slideInUp');
    //             }, 3000);
    //         } else {
    //             this.hiddenBlock.classList.remove('slideInUp');
    //         }

    //     } catch(e) {}


    //     this.slides.forEach(slide => {
    //         slide.style.display = 'none';
    //         slide.classList.remove('fadeIn');
    //     });

    //     this.slides[this.slideIndex - 1].style.display = 'block';
    //     this.slides[this.slideIndex - 1].classList.add('animated', 'fadeIn');
    // }

    // plusSlides(n) {
    //     this.showSlides(this.slideIndex += n);
    // }

    // render() {

    //     // отображение блока на третей странице через 3 сек
    //     try {
    //         this.hiddenBlock = document.querySelector('.hanson');
    //     } catch(e) {}
        

    //     this.showSlides(this.slideIndex);

    //     this.btns.forEach(btn => {
    //         btn.addEventListener('click', () => {

    //             this.plusSlides(1);

    //         });

    //         // Клик по логотипу переводит на первую страницу
    //         btn.parentNode.previousElementSibling.addEventListener('click', (e) => {

    //         e.preventDefault();
    //         this.slideIndex = 1;
    //         this.showSlides(this.slideIndex);

    //         });

    //     });
    // }
}
