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
        
        // добавляем первому слайду класс активности (если он не кнопка)
        if (!this.slides[0].closest('button')) {
            this.slides[0].classList.add(this.activeClass);
        }
        
        // если передан параметр animated, то задаем нужным элементам прозрачность
        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
        // условия для решения проблемы с кнопками (они в одном из слайдеров содержатся в верстке вместе со слайдами. В какой-то момент возникает баг при котором сами кнопки становятся слайдами)
        if (this.slides[1].tagName == 'BUTTON' && this.slides[2].tagName) {
            this.container.appendChild(this.slides[0]);
            this.container.appendChild(this.slides[1]);
            this.container.appendChild(this.slides[2]);
            this.decorizeSlides();
        } else if (this.slides[1].tagName == 'BUTTON') {
            this.container.appendChild(this.slides[0]);
            this.container.appendChild(this.slides[1]);
            this.decorizeSlides();
        } else {
            this.container.appendChild(this.slides[0]);
            this.decorizeSlides();
        }
    }

    bindTriggers() {
        // при нажатии на next первый слайд перемещается в конец списка слайдов
        this.next.addEventListener('click', () => this.nextSlide());

        // при нажатии на prev последний слайд перемещается в начало списка слайдов
        this.prev.addEventListener('click', () => {

            for (let i = this.slides.length -1; i > 0; i--) {
                if (this.slides[i].tagName !== 'BUTTON') {
                    let active = this.slides[i];
                    this.container.insertBefore(active, this.slides[0]);
                    this.decorizeSlides();
                    break;
                }
            }            
        });
    }

    init() {
        this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start
        `;

        this.bindTriggers();
        this.decorizeSlides();

        // Если параметр autoplay передан, то включается автопереключение слайдов
        if (this.autoplay) {
            setInterval(() => this.nextSlide(), 5000);
        }
    }
}