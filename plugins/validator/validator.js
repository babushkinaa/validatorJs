class Validator{

    constructor({selector, pattern, method}){
        this.id = selector; // селектор нашей формы id class ...
        this.pattern = pattern; // кастомный паттерн для формы
        this.method = method; // настройки какие поля должны валидироваться и какие методы к ним будут применяться
    }
}