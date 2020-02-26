<script>
    const validator = new Validator({
        selector: '#myform', // что валидируем
        pattern: {},
        method: {}
    });
    validator.init();
</script>

selector: '.className', '#idName', 'tagName'; //селектор нашей формы

pattern : {
    phone: /^\+?[78]([-()*\d]){10}$/; // можно задать свой или использовать дефолтный
    email: /^w+@w+\.\w{2,}$/;
}

 method: {
            'phone':[
                ['notEmpty'], // метод проверяющий что бы поле не было пустым
                ['pattern', 'phone'] // ['pattern', 'какое поле проверяем'], пример ['pattern', 'phone'] - телефон, ['pattern', 'email'] - email, ['pattern', 'zip'] - почтовый индекс   
            ],
            'email':[
                ['notEmpty'], // метод проверяющий что бы поле не было пустым
                ['pattern', 'email'] // ['pattern', 'какое поле проверяем'], пример ['pattern', 'phone'] - телефон, ['pattern', 'email'] - email, ['pattern', 'zip'] - почтовый индекс   
            ]
        }