export default class VideoPlayer {
    constructor(triggers, overlay) {
        this.bnts = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
    }

    // инициализируем кнопки
    bindTriggers() {
    
        this.bnts.forEach(btn => {
            btn.addEventListener('click', () => {
                // если плеер уже был создан ранее, то прото показываем модалку. Если не был, то создаем новый
                if (document.querySelector('iframe#frame')) {
                    this.overlay.style.display = 'flex';
                } else {
                    // вытаскиваем url из атрибута кнопки
                    const path = btn.getAttribute('data-url');
                    // запускаем плеер
                    this.createPlayer(path);
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
        });

        // включаем модальное окно с плеером
        this.overlay.style.display = 'flex';
    }

    init() {

        // создаем новый тэг script, задаем ему src
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";

        // помещаем созданный тэг перед самым первым скриптовым тэгом
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        this.bindTriggers();
    }
}