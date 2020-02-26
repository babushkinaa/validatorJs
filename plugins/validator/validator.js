class Validator{

    constructor({selector, pattern ={}, method}){
        this.form = document.querySelector( selector ); // наша форма id class ...
        this.pattern = pattern; // кастомный паттерн для формы
        this.method = method; // настройки какие поля должны валидироваться и какие методы к ним будут применяться
        this.elementsForm = [...this.form.elements].filter(item => {
            // [...this.form.elements] так как это htmlcollection метод filter не работает  спред опреатором [...] переведем в массив
            return item.tagName.toLowerCase() !== 'button' && item.type.toLowerCase() !== 'button'; // вернем элементы формы за исключением кнопок item.type.toLowerCase() !== 'button'; если верстальщик зделал кнопку типом button
            });
        this.error = new Set();
    }
    // метод для запуска валидатора
    init(){
        console.log(this.error);
        this.applyStyle(); // создадим элемент для вставки стилий в HEAD
        this.elementsForm.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this))); // обязательно нужно bind иначе теряем контекст вызова
        this.setPattern();
        this.form.addEventListener('submit', event => {
            if (this.error.size) { // если size размер коллекции >0 то делаем event.preventDefault();
                event.preventDefault();
            }
        })
    }
    // метод валидации вводимых данных в input
    isValid(elem){
        // console.log('elem: ', elem.id);

        const validatorMethod = {
            notEmpty(elem) {
                if ( elem.value.trim() === '' ) {
                    return false;
                }
                return true;
            },
            pattern(elem, pattern){
                return pattern.test(elem.value);
            }
        };
        const method = this.method[elem.id]; // проверяем методы проверки
        console.log('this.method: ', this.method[elem.id]);
      
        if (method) { // если методы существуют 
           return method.every( item  => validatorMethod[item[0]](elem, this.pattern[item[1]]));
            // {
            // //    console.log('***',this.pattern[item[1]]);
            // //    console.log(validatorMethod[item[0]](elem, this.pattern[item[1]]));
            //    return validatorMethod[item[0]](elem, this.pattern[item[1]]);
            // })
        }
        return true;
    }
    // метод для проверки события change в input по патернам
    checkIt(event){
        const target = event.target;

        if ( this.isValid(target) ) {
            this.showSuccess(target);

            if (target.nextElementSibling.classList.contains('validator-error')) {
                this.error.remove(target);
            }
            
        } else {
            this.showError(target);
            this.error.add(target);
        }

    }
    // если ошибка
    showError(elem){
        elem.classList.remove('success'); // добавим класс success если валидации произошла
        elem.classList.add('error'); // добавим класс error если произошла ошибка валидации
        if (elem.nextElementSibling.classList.contains('validator-error')) { // если у элемента справа есть класс 'validator-error' ничего не делаем
            return
        }
        const errorDiv = document.createElement('div'); // добавим div для отображения под input текста ошибки
        errorDiv.textContent = 'Введенное значение не корректно'; // текст ошибки для div
        errorDiv.classList.add ('validator-error'); // добавим новому div новый class validator-error
        elem.insertAdjacentElement('afterend', errorDiv); // вставим созданный div после элемента elem

    }
    // если валидация прошла
    showSuccess(elem){
        elem.classList.remove('error');
        elem.classList.add('success'); // добавим класс success если валидации произошла
        if ( elem.nextElementSibling.classList.contains('validator-error') ){ // проверим есть ли class ==='validator-error' у элемента справа 
        // nextElementSibling - элемент справа от текущего. 
            elem.nextElementSibling.remove(); // удаляем элемент справа
        }
    }
    // новый элемент HTML в HEAD
    applyStyle(){
        const style = document.createElement('style'); // созданим новый элемент HTML style
        style.textContent = `
            input.success {
                border: 2px solid green
            }
            input.error {
                border: 2px solid red
            }
            .validator-error {
                font-size: 12px;
                color: red;
            }

        `;
        document.head.appendChild(style); // вставим новый элемент в head страницы
    }
    // задаем патерны по умолчанию для проверки
    setPattern(){
        if (!this.pattern.phone) {
            this.pattern.phone = /^\+?[78]([-()*\d]){10}$/;

        }
        if (!this.pattern.email) {
            
            this.pattern.email = /.+@.+\..+/i;
            // this.pattern.email = /^w+@w+\.\w{2,}$/;

        }
        console.log(this.pattern);
    }
}