export default class Difference {
    constructor(oldOfficer, newOfficer, items) {
        this.oldOfficer = document.querySelector(oldOfficer);
        this.newOfficer = document.querySelector(newOfficer);
        try {
            this.oldItems = this.oldOfficer.querySelectorAll(items);
            this.newItems = this.newOfficer.querySelectorAll(items);
        } catch(e) {}
        this.oldCounter = 0;
        this.newCounter = 0;
    }

    hideItems(items) {
        try {
            // скрываем все карточки, кроме последней
            items.forEach((item, i, arr) => {
            if (i !== arr.length -1) {
                item.style.display = 'none';
            }
        });
        } catch(e) {

        }

    }

    bindTriggers(container, items, counter) {
        try {
            container.querySelector('.plus').addEventListener('click', () => {
                // при клике открывается одна из скрытых карточек (и увеличивается счетчик, чтоб в следующий раз открыть следующую)
                if (counter !== items.length -2) {
                    items[counter].style.display = 'flex';
                    items[counter].classList.add('animated', 'fadeIn');
                    counter++;
                // Когда доходим до последней карточки, то открываем ее и убираем кнопку
                } else {
                    items[counter].style.display = 'flex';
                    items[counter].classList.add('animated', 'fadeIn');
                    items[items.length - 1].remove();
                }
            });
        } catch(e) {}

    }

    init() {
        this.hideItems(this.oldItems);
        this.hideItems(this.newItems);
        this.bindTriggers(this.oldOfficer,  this.oldItems, this.oldCounter);
        this.bindTriggers(this.newOfficer,  this.newItems, this.newCounter);
    }
 }