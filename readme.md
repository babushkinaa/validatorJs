# Validator JS


[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Class Validator - Валидатор форм на javascript

  - Позволяет валидировать неограниченное количество форм
  - Возможность добавлять свои методы валидации при помощи регулярных выражений
  - Блокировка кнопки submit до момента прохождения формой валидации

# Добавление в проект на страницу с формой
```sh
<script>
    const validator = new Validator({
        selector: '#myform', 
        pattern: {},
        method: {}
    });
    validator.init();
</script>
```

  - selector : id формы 
 ```sh
 selector: '.className', '#idName', 'tagName'; //селектор нашей формы
 ```
 - pattern: {} : объект с патернами проверки
```sh
# задать пользовательский патерны
pattern : {
    phone: /^\+?[78]([-()*\d]){10}$/;      // задать свой патерн проверки поля phone
    email: /^w+@w+\.\w{2,}$/;              // задать свой патерн проверки поля email 
}
```
```sh
# использовать дефолтные патерны
pattern : {
    phone,     
    email              
}
```
  - method: {} : объект с методами проверки
```sh
method: {
        'phone':[
            ['notEmpty'], 
            // метод проверяющий что бы поле не было пустым
            ['pattern', 'phone'] 
            // ['pattern', 'какое поле проверяем'], пример ['pattern', 'phone'] - телефон, ['pattern', 'email'] - email  
            ],
            'email':[
            ['notEmpty'], // метод проверяющий что бы поле не было пустым
            ['pattern', 'email'] // ['pattern', 'какое поле проверяем'], пример ['pattern', 'phone'] - телефон, ['pattern', 'email'] - email, ['pattern', 'zip'] - почтовый индекс   
            ]
        }
```
   
```sh 
validator.init(); - вызов объекта на странице
```

### Пример вызова и использования
форма для валидации:
```
<form id="form1" name="user_form" class="main-form">
		<div class="main-form-input container">
			<div class="row">
				<div class="col-12 col-lg-4">
					<input type="text" class="form-name" id="form1-name" name="user_name" placeholder="Ваше имя" required>
				</div>
				<div class="col-12 col-lg-4">
					<input type="email" class="form-email" id="form1-email" name="user_email" placeholder="E-mail" required>
				</div>
				<div class="col-12 col-lg-4">
					<input type="tel" class="form-phone" id="form1-phone" name="user_phone" placeholder="Номер телефона" required>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="row justify-content-center">
				<button class="btn form-btn" type="submit">Оставить заявку!</button>
			</div>
		</div>
	</form>
```
### Подключение и вызов скрипта validator.js
```
<script src="./js/validator/validator.js"></script>
	<script>
		const validator = new Validator({
			selector: '#form1', // что валидируем
			pattern: { 
				// phone: /^\d+$/,
				// email: /.+@.+\..+/i,
				// zip: /^\d{6}/
				youName: /[а-яА-Я]/
			},
			method: {
				'form1-phone':[ 
					['notEmpty'], 
					['pattern', 'phone'] 
				],
				'form1-email':[
					['notEmpty'], 
					['pattern', 'email'] 
				],
				'form1-name':[
					['notEmpty'], 
					['pattern', 'youName'] 
				]
			}
		});
		validator.init();

	</script>
	</body>
```
