export default class Form {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll('input');
        this.message = {
            success: "Данные отправлены!",
            loading: "Подождите, идет отправка..",
            failure: "Что-то пошло не так.."
        };

        this.path = './assets/question.php';
    }

    clearInputs() {
        this.inputs.forEach(input => {
            input.value = '';
        });
    }

    // валидация ввода символов в поле email
    checkMailInputs() {
        const mailInputs = document.querySelectorAll('[type = "email"]');
    
        mailInputs.forEach(input => {
            // предотвращаем возможность вставить в строку кириллицу символы даже путем копирования
            input.addEventListener('input', () => {
                input.value = input.value.replace(/[а-яё]/ig, '');
            });
            input.addEventListener('keypress', function(e) {
                // проверяем диапазон значений в начале строки (т.к. стоит ^) и запрещаем вводить другие символы
                if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
                    e.preventDefault();
                }
            });
        });
    }

    initMask() {
        let setCursorPosition = (pos, elem) => {
            // устанавливаем фокус на элементе (Но мне кажется это не обязательно)
            elem.focus();
    
            // перемещает каретку после +7, если поместили в самое начало (чтоб нельзя было удалить +7)
            elem.addEventListener('click', () => {
                if (elem.selectionStart <= 2) {
                    elem.selectionStart = 2;
                }
            });
    
            // Этот вариант предложил Петриченко. Используем метод выделения (т.к. начало и конец выделения совпадают, то курсор просто ставится на это место). Видимо это сделано для фокуса Tab'ом, т.к. мышью можно и так поставить в любое место. Не все бразуеры поддерживают этот метод. Проверяем: если поддерживает, то сразу используем, если нет, то создаем своеобразный полифил. Но этот вариант не спасает от случая, когда пользователь ткнул перед +7. Тогда он сможет удалить все.
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();
    
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };
    
        // Маска номера телефона (из проекта Picture)
        // this подчеркиваются, но Петриченко сказал, что это норм
        function createMask(event) {
            let matrix = '+1 (___) ___-____',
                i = 0,
                // вводим два значения: статичное и динамичное (на основе того, что ввел пользователь)
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');
    
            // отменяем возможность удалить +7 (т.е. когда количество введенных символов меньше количества начальных, в строку вставляется начальное значение)
            if (def.length >= val.length) {
                val = def;
            }
    
            // перебираем все символы и каждый заменяем на результат действия функции
            this.value = matrix.replace(/./g, function(a) {
                // если "_" или цифра, то подставляется то, что ввели, если нет, то подставляется либо пробел, либо (если i не соотв условию) скобка
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });
    
            // при отмене фокуса (т.е. если кликнули вне инпута), и в инпуте было только "+7", то инпут очищается
            if (event.type === 'blur') {
                if (this.value.length == 2) {
                    this.value = '';
                }
            // иначе курсор ставится в нужное место (в зависимости от того, сколько символов было введено)
            } else {
                setCursorPosition(this.value.length, this);
            }
        }
    
        let inputs = document.querySelectorAll('[name="phone"]');
    
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        });
    }

    async postData(url, data) {
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    }

    init() {

        this.checkMailInputs();

        this.initMask();

        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                let statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                    margin-top:15px;
                    font-size: 18px;
                    color: grey;
                `;
                form.parentNode.appendChild(statusMessage);

                statusMessage.textContent = this.message.loading;

                const formData = new FormData(form);

                this.postData(this.path, formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 6000);
                    });
            });
        });
    }
}