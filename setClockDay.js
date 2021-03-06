/* 
Модуль таймера обратного отсчета 
Для выставления таймера в UTC+0 необходимо передавать 
параметр endTime функции setClock  в коротком формате 'YYYY-MM-DD'
Для учета часового пояса пользователя параметр endTime
необходимо передавать в формате YYYY-MM-DDTHH:mm:ss.sss
Для корректировки часового пояса используйте полный формат даты
YYYY-MM-DDTHH:mm:ss.sssZ, где Z часовой пояс в формате +-hh:mm от UTC+0  
*/

//Получаем дни, часы, минуты и секунды как разницу текущего времени пользователя от endTime
const getTimer = endTime => {
    const deltaTime = Date.parse(endTime) - Date.now(),
        seconds = Math.floor( (deltaTime / 1000) % 60 ),
        minutes = Math.floor( (deltaTime / 1000 / 60) % 60),
        hours = Math.floor( (deltaTime / (1000 * 60 * 60)) % 24),
        day = Math.floor( (deltaTime / (1000 * 60 * 60 * 24)) );

    return {
        deltaTime,
        day,
        hours,
        minutes,
        seconds,
    }
};

/* Приводим индикатор времени к двухзначному формату, 
отрицательные значения меняем на 00 */
const addLeadZero = tempTime => {
    let clockLED;
    
    switch(true) {
        case tempTime < 0 :
            clockLED = '00';
            break;
        case tempTime <= 9 :
            clockLED = `0${tempTime.toString()}`;
            break;
        default :
            clockLED = tempTime.toString();
            break; 
    }

    return clockLED;
};

/* Вызываем обновление таймера каждую секунду, 
если текущее время превысило endTime, останавливаем таймер */
export function setClockDay(id, endTime) {
    const timer = document.querySelector(`#${id}`),
        day = document.querySelector('.day'),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds');
        
    const onTimer = setInterval( () => {
        const interimClock = getTimer(endTime);
                  
        if (interimClock.deltaTime <= 0) {
            clearInterval(onTimer);
        }

        day.textContent = addLeadZero(interimClock.day);
        hours.textContent = addLeadZero(interimClock.hours);
        minutes.textContent = addLeadZero(interimClock.minutes);
        seconds.textContent = addLeadZero(interimClock.seconds);
    }, 1000);
}

