import Slider from './slider';

// Главный слайдер наследуется от Slider
export default class MainSlider extends Slider {
    constructor(btns, nextBtns, prevBtns) {
        // Из Slider наследуюется свойство this.btns
        super(btns, nextBtns, prevBtns);
    }

    showSlides(n) {

        if (n > this.slides.length) {
            this.slideIndex = 1;
        }

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }


        // отображение скрытого блока на третей странице через 3 сек
        // try/catch для избавления от ошибок на страницах, где этого блока нет
        try {

            this.hiddenBlock.style.opacity = '0';

            if (n == 3) {
                
                this.hiddenBlock.classList.add('animated');
    
                setTimeout(() => {
                    this.hiddenBlock.style.opacity = '1';
                    this.hiddenBlock.classList.add('slideInUp');
                }, 3000);
            } else {
                this.hiddenBlock.classList.remove('slideInUp');
            }

        } catch(e) {}


        this.slides.forEach(slide => {
            slide.style.display = 'none';
            slide.classList.remove('fadeIn');
        });

        this.slides[this.slideIndex - 1].style.display = 'block';
        this.slides[this.slideIndex - 1].classList.add('animated', 'fadeIn');
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    bindTriggers() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {

                this.plusSlides(1);

            });

            // Клик по логотипу переводит на первую страницу
            btn.parentNode.previousElementSibling.addEventListener('click', (e) => {

            e.preventDefault();
            this.slideIndex = 1;
            this.showSlides(this.slideIndex);

            });

        });

        // Кнопки для страницы modules.html (их много, т.к. при переключении слайдов на каждом своя кнопка)
        this.prevBtns.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(-1);
            });
        });

        this.nextBtns.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(1);
            });
        });
    }

    render() {

        if (this.container) {
            // отображение скрытого блока на третей странице через 3 сек
        try {
            this.hiddenBlock = document.querySelector('.hanson');
        } catch(e) {}

        this.showSlides(this.slideIndex);

        this.bindTriggers();
 
        } 
    }
}