# SetClock
Site сountdown timer

Небольшой модуль для таймера обратного отсчета на сайте.
Инициализируется при старте страницы. Отсчитывает часы, минуты и секунды.
Можно легко добавить в таймер дни.
Учитывает часовой пояс пользователя.

Буду рад замечаниям и предложениям по доработке модуля.

## Installation

Для установки скопируйте файл в каталог с проектом, например "./static/js/"
Для подключения к проекту используйте динамический импорт, например:

```js
    import('../js/setClock.js')
        .then(module => {
            module.setClock(timerId, deadLine);
        })
        .catch(err => {
            console.log(err.message);
    });
```

## Usage

1. Необходимо в верстке разместить блок таймера
```html
    <div class="className" id="timer">
	<span class="hours">00</span>
	<span>:</span>
	<span class="minutes">00</span>
	<span>:</span>
	<span class="seconds">00</span>
    </div>
```

2. Перед импортом модуля необходимо обеспечить формирование даты и времени точки отсчета (deadLine).
Для примера:
```js
    const dateEnd = '2020-01-01', //дата в формате YYYY-MM-DD
        timeEnd = '22:30:00', //Время в формате HH:mm:ss
        utcZ = '+03:00', //часовой пояс в формате +-hh:mm от UTC+0 (+03:00 время Московское)
        deadLine = `${dateEnd}T${timeEnd}.000${utcZ}`, //полный формат даты YYYY-MM-DDTHH:mm:ss.sss
        //deadLine = '2020-03-10', //короткий формат даты без учета UTC
        timerId = 'timer'; //id таймера в вёрстке
```
3. Для иниициализации таймера вызовите функцию 
```js
    setClock(timerId, deadLine);
```
4. Для использования несколько таймеров вызывайте функцию `setClock` с разными параметрами
`timerId` и `deadLine`

5. Для добавления дней в блок таймера добавьте в разметку 
```html
    <span class="day">00</span>
    <span>:</span>
```
 - в модуле в функции `getTimer` исправьте переменнную `hours` и добавьте переменную `day` 
следующим образом:
```js
    hours = Math.floor( (deltaTime / (1000 * 60 * 60)) % 24),
    day = Math.floor( (deltaTime / 1000 / 60 / 60) / 24);
```
 - в объект возвращаемый `return` добавьте свойство `day`
 - в функции `setClock` добавьте переменную
```js
    day = timer.querySelector('.day'),
```
 - и в блоке вывода данных таймера в вёрстку добавьте строку
```js
    day.textContent = addLeadZero(interimClock.day);
``` 
Пример модуля https://github.com/DEnFUrt/setClock/blob/master/setClockDay.js 

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

v. 1.0.0

## License

MIT
