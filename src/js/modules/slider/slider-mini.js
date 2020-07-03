import Slider from './slider';

export default class MiniSlider extends Slider {
    constructor(container, prev, next, activeClass, animate, autoplay) {
        super(container, prev, next, activeClass, animate, autoplay);
    }

    decorizeSlides() {
        // убираем со всех слайдов класс активности (если он не передан, ничего не происходит) и прозрачность
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            // если передан параметр animated, то задаем нужным элементам прозрачность
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });
        
        this.slides[0].classList.add(this.activeClass);
        
        // если передан параметр animated, то задаем нужным элементам прозрачность
        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
        // Моя версия решения проблемы с кнопками (они в одном из слайдеров содержатся в верстке вместе со слайдами. В какой-то момент возникает баг при котором сами кнопки становятся слайдами)
        // при нажатии на next первый слайд перемещается в конец списка слайдов
        this.container.appendChild(this.slides[0]);
        if (this.slides[0].tagName !== 'BUTTON') {
            this.decorizeSlides(); 
        } else {
            this.nextSlide(); 
        }

        // Остановка автопереключения слайдов при наведении на кнопки или слайды
        this.prev.addEventListener('mouseenter', () => clearInterval(this.autoChangeSlide));
        this.next.addEventListener('mouseenter', () => clearInterval(this.autoChangeSlide));
        this.container.addEventListener('mouseenter', () => clearInterval(this.autoChangeSlide));
       
    }

    prevSlide() {
        // Моя версия решения проблемы с кнопками
        // при нажатии на prev последний слайд перемещается в начало списка слайдов
        let lastSlide = this.slides[this.slides.length - 1];
        this.container.insertBefore(lastSlide, this.slides[0]);
            if (lastSlide.tagName !== 'BUTTON') {
                this.decorizeSlides();
            } else {
                this.prevSlide();
            }
    }

    autoPlay() {
        this.autoChangeSlide = setInterval(() => this.nextSlide(), 1000);
    }

    bindTriggers() {
    
        this.next.addEventListener('click', () => this.nextSlide());
        this.prev.addEventListener('click', () => this.prevSlide());

    }

    init() {
        try {
            this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start
            `;

            let autoChangeSlide;

            this.bindTriggers();
            this.decorizeSlides();

            // Если параметр autoplay передан, то включается автопереключение слайдов
            if (this.autoplay) {
                this.autoPlay();

                // запуск автопереключения слайдов при покидании курсора кнопок и слайдов
                this.next.addEventListener('mouseleave', () => this.autoPlay());
                this.prev.addEventListener('mouseleave', () => this.autoPlay());
                this.container.addEventListener('mouseleave', () => this.autoPlay());

        }
        } catch(e) {}
    }
}