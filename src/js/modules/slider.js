export default class Slider {
    constructor(page, btns) {
        this.page = document.querySelector(page);
        this.slides = this.page.children;
        this.btns = document.querySelectorAll(btns);
        this.slideIndex = 1;
    }

    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }

        if (n < 1) {
            this.slideIndex = this.slideIndex.length;
        }

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

    render() {

        // отображение блока на третей странице через 3 сек
        try {
            this.hiddenBlock = document.querySelector('.hanson');
        } catch(e) {}
        

        this.showSlides(this.slideIndex);

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
    }
}
