export default class Accordion {
    constructor(btn) {
        this.btns = document.querySelectorAll(btn);
    }

    bindTrigger() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                const content = btn.nextElementSibling;
                content.style.display = 'block';
                // content.classList.add('animated', 'fadeInDown');
                content.style.maxHeight =  content.scrollHeight + 80 + "px";
            });
        });
    }

    init() {
        
        this.bindTrigger();
        
    }
}