
    // Структура розкладу для кожного дня
    const schedule = {
        1: [ // Понеділок
            { subject: "Землеробство: від насіння до врожаю", time: "8:30 - 9:50" },
            { subject: "Аеродинаміка в природі та техніці", time: "10:00 - 11:20" },
            { subject: "Основи ковальського мистецтва та ремесел", time: "12:00 - 13:20" },
            { subject: "Стратегія та тактика: грім як зброя", time: "13:30 - 14:50" }
        ],
        2: [ // Вівторок
            { subject: "Мистецтво блискавичної перемоги", time: "8:30 - 9:50" },
            { subject: "Збереження довкілля: екологія майбутнього", time: "10:00 - 11:20" },
            { subject: "Родинне щастя: як кувати гармонію у шлюбі", time: "12:00 - 13:20" }
        ],
        3: [ // Середа
            { subject: "Музичне мистецтво", time: "8:30 - 9:50" },
            { subject: "Жіноча енергія та її вплив", time: "10:00 - 11:20" },
            { subject: "Фізика повітряних явищ", time: "12:00 - 13:20" }
        ],
        4: [ // Четвер
            { subject: "Мистецтво святкування й об’єднання", time: "8:30 - 9:50" },
            { subject: "Основи поетичної майстерності", time: "10:00 - 11:20" }
        ],
        5: [
            { subject: "Теорія й практика розширення можливостей", time: "8:30 - 9:50" },
            { subject: "Мистецтво блискавичної перемоги", time: "10:00 - 11:20" },
            { subject: "Захист кордонів і командна робота", time: "12:00 - 13:20" },
            { subject: "Цикли природи та їх вплив на життя", time: "13:30 - 14:50" }
        ]
    };

    // Функція для відображення розкладу
    function displaySchedule(day) {
        const timetableDiv = document.getElementById('timetable');
        const today = new Date();
        const currentDay = today.getDay() || 7;  // Встановлюємо день тижня (1 - понеділок, 7 - неділя)
        const currentTime = today.getHours() * 60 + today.getMinutes(); // Поточний час у хвилинах

        // Виводимо таблицю лише для дня, який передано
        if (day < 1 || day > 5) return;

        let html = "<table>";

        // Пройдемо по кожному предмету для цього дня
        schedule[day].forEach((lesson, index) => {
            const lessonTime = lesson.time.split(' - ').map(time => {
                const [hours, minutes] = time.split(':').map(Number);
                return hours * 60 + minutes;
            });

            const isAfterClass = currentTime > lessonTime[1]; // Якщо час пари вже пройшов
            const isBeforeClass = currentTime < lessonTime[0]; // Якщо пара ще не почалась
            const isCurrentClass = currentTime >= lessonTime[0] && currentTime <= lessonTime[1]; // Якщо пара зараз

            let timeLeft = '';
            if (isBeforeClass) {
                const minutesToClass = lessonTime[0] - currentTime;
                const hoursLeft = Math.floor(minutesToClass / 60);
                const minutesLeft = minutesToClass % 60;
                timeLeft = `${hoursLeft} год ${minutesLeft} хв`;
            } else if (isCurrentClass) {
                timeLeft = "Пара проходить зараз";
            }

            if (isAfterClass || (currentDay !== day)) {
                timeLeft = ''; // Якщо пара вже пройшла або це не сьогоднішній день, то час не виводимо
            }

            // Створюємо рядок таблиці для цього предмету
            html += `
                <tr>
                    <td>${lesson.subject}</td>
                    <td><span class="dddddd">${lesson.time}</span><br><br>${timeLeft}</td>
                </tr>
            `;
        });

        html += "</table>";
        timetableDiv.innerHTML = html;
    }
    document.addEventListener("DOMContentLoaded", function() {
        displaySchedule(5);
    });

