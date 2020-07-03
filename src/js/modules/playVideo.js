export default class VideoPlayer {
    constructor(triggers, overlay) {
        this.btns = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');

        // при создании нового экземпляра класса YT.Player мы создаем реакцию на событие 'onStateChange'. К этому событию привязываем метод this.onPlayerStateChange. Но! Т.к. он привязан к экземпляру нового объекта, то контекст теряется. Поэтому мы привязываем его к нужному контексту императивно
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    }

    // инициализируем кнопки
    bindTriggers() {
    
        this.btns.forEach((btn, i)=> {
            
            try {
                // получаем блок с закрытым видео
                const blockedElem = btn.closest('.module__video-item').nextElementSibling;
                // каждый второй элемент (если без остатка делится на 2)
                if (i % 2 ==0) {
                    // его родителю назначаем дата-атрибут "заблокировано"
                    blockedElem.setAttribute('data-disabled', 'true');
                }
            } catch(e) {}

            btn.addEventListener('click', () => {
                // Если блок не заблокирован, то производим действия (первая часть условия нужна, чтоб не возникала ошибка на другой странице)
                if (!btn.closest('.module__video-item') || btn.closest('.module__video-item').getAttribute('data-disabled') !== 'true') {
                     // получаем кнопку на которую кликнули (надо для того, чтобы далее отслеживать и разрешать просмотр следующего видео)
                    this.activeBtn = btn;
                    // если плеер уже был создан ранее, то прото показываем модалку. Если не был, то создаем новый
                    if (document.querySelector('iframe#frame')) {
                        this.overlay.style.display = 'flex';

                        if (this.path !== btn.getAttribute('data-url')) {
                            this.path = btn.getAttribute('data-url');
                            this.player.loadVideoById({videoId: this.path});
                        }
                    } else {
                        // вытаскиваем url из атрибута кнопки
                        this.path = btn.getAttribute('data-url');
                        // запускаем плеер
                        this.createPlayer(this.path);
                    }
                }
            });
        });

        this.close.addEventListener('click', () => {
            // включаем модальное окно с плеером
            this.overlay.style.display = 'none';
            this.player.stopVideo();

            // мой вариант решения проблемы с неоднократным включением плеера. Здесь при закрытии окна блок с iframe снова заменяется на первоначальный div
            // const frame = document.createElement('div');
            // frame.id = "frame";
            // document.getElementsByTagName('iframe')[0].replaceWith(frame);
        });
    }

    createPlayer(url) {
        // скрипт подключен в методе init, поэтому YT.Player "подтянется" из сети. Плеер будет вставляться на место блока "frame" в верстке
        this.player = new YT.Player('frame', {
            // настройки видео
            height: '100%',
            width: '100%',
            // уникальный ID видео
            videoId: `${url}`,
            // добавляем событие, чтоб отслеживать то, что видео просмотрено, можно открывать доступ к следующему
            // функция будет срабатывать при любом изменении состояния
            events: {
                'onStateChange': this.onPlayerStateChange
            }
        });

        // включаем модальное окно с плеером
        this.overlay.style.display = 'flex';
    }

    // открываем доступ к следующему видео (и меняем стили блока с видео, которое было недоступно для просмотра)
    onPlayerStateChange(state) {
        try {
            // получаем блок с закрытым видео
            const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling;
            // получаем картинку с треугольником (play), чтоб поставить ее вместо замка. Без параметра true будет скопирована только нода (без всего, что лежит внутри)
            const playBtn = this.activeBtn.querySelector('svg').cloneNode(true);

            // если видео закончено (номер состояний указаны в документации)
            if (state.data === 0) {
                // если класс closed существует,то мы его удаляем (Если до этого видео уже просмотрели, то класса уже не будет)
                if (blockedElem.querySelector('.play__circle').classList.contains('closed')) {
                    blockedElem.querySelector('.play__circle').classList.remove('closed');
                    // удаляем иконку с замочком
                    blockedElem.querySelector('svg').remove();
                    // вставляем иконку play
                    blockedElem.querySelector('.play__circle').appendChild(playBtn);
                    blockedElem.querySelector('.play__text').textContent = "play video";
                    blockedElem.querySelector('.play__text').classList.remove('attention');
                    blockedElem.style.opacity = 1;
                    blockedElem.style.filter = 'none';

                    blockedElem.setAttribute('data-disabled', 'false');
            }
        }
        } catch(e) {}
    }

    init() {

        // Проверка на наличие кнопок (защита от ошибок, возникающих при создании другого экземпляра класса)
        if (this.btns.length > 0) {
            
            // создаем новый тэг script, задаем ему src
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";

            // помещаем созданный тэг перед самым первым скриптовым тэгом
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            this.bindTriggers();
        }
    }
}