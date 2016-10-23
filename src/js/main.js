let dataObj = {
    topic: 'Тест #15',
    data: [{
        question: 'В чем основное удобство работы с AJAX?',
        answers: ['Скорость работы',
            'Соответствие современным стандартам веб-разработки',
            'Простота написания кода',
            'Возможность обновить данные на странице не перезагружая ее'
        ],
        right: [4]
    }, {
        question: 'Экземпляр какого объекта используется для AJAX запроса в большинстве браузеров?',
        answers: ['AJAX', 'ActiveXObject', 'XMLHttpRequest', 'HttpRequest'],
        right: [3]
    }, {
        question: 'Экземпляр какого объекта используется для AJAX запроса в IE?',
        answers: ['ActiveXObject', 'XMLHttpRequest', 'HttpRequest', 'AJAX'],
        right: [1]
    }, {
        question: 'Чем отличается синхронный и асинхронный AJAX запросы?',
        answers: ['Синхронные запросы рекомендуются для GET запросов, асинхронные - при POST',
            'Синхронный запрос выполняется быстрее',
            'При синхронном запросе браузер “подвисает” до тех пор,' +
            'пока не прийдет ответ с сервера, при асинхронном -' +
            'браузер продолжает работать и ответ обрабатывается при помощи' +
            'специальной функции-слушателя',
            'Асинхронные запросы - новая технология,' +
            'которая не поддерживается в старых браузерах.'
        ],
        right: [3]
    }, {
        question: 'Какое поле объекта XMLHttpRequest используется' +
            'для обработки полученного от сервера ответа?',
        answers: ['onreadystatechange', 'success', 'onReadyStateChange', 'onstatechange'],
        right: [1]
    }, {
        question: 'Какое значение поля “readyState” сигнализирует нам об пришедшем от сервера ответе?',
        answers: ['4', '20', 'true', '1'],
        right: [1]
    }]
};

localStorage.setItem('test', JSON.stringify(dataObj));

$(() => {
    try {
        var test = localStorage.getItem('test');
        test = JSON.parse(test);
    } catch (e) {
        alert('DATA ERROR');
    }

    var resultsObj = {
        msg: '',
        answersLength: 0,
        right: 0,
        wrong: 0,
        error: false,
        errorMsg: ''
    };

    function createTest(id, obj, parent) {
        let tmpl = _.template($(id).html());
        let result = tmpl(obj);
        $(parent).append(result);
    }

    function startTest() {
        reload();
        createTest('#test', test, '#test-container');
        $('.checkRes').click(checkTest);
    }

    $('.start').click(function() {
        startTest();
        $(this).hide();
    });

    function reload() {
        resultsObj.msg = '';
        resultsObj.answersLenght = 0;
        resultsObj.right = 0;
        resultsObj.wrong = 0;
        resultsObj.error = false;
        resultsObj.errorMsg = '';
        $('#test-container').html('');
    }

    let rightAnswers = [];

    function getRightAnswers() {
        rightAnswers = [];
        for (let i = 0; i < test.data.length; i++) {
            let str;
            test.data[i].right.forEach(function(item) {
                str = (i + 1) + '-' + item;
                rightAnswers.push(str);
            });
        }
        resultsObj.answersLength = rightAnswers.length;
    }

    function checkTest() {
        getRightAnswers();
        if (checkEmptyAnswers()) {
            showModal(resultsObj);
            resultsObj.error = false;
            return;
        }

        let $userAnswers = $('input:checked');

        $userAnswers.each(function() {
            let id = $(this).attr('id');
            if (_.includes(rightAnswers, id)) {
                $(this).parent().addClass('right');
                resultsObj.right++;
            } else {
                $(this).parent().addClass('wrong');
                resultsObj.wrong++;
            }
        });

        if (resultsObj.wrong !== 0) {
            resultsObj.msg = 'You are failed';
        } else {
            resultsObj.msg = 'You are win';
        }
        showModal(resultsObj);
    }

    function checkEmptyAnswers() {
        let str = '';
        $('.question').each(function(index) {
            if ($(this).find('input:checked').length == +0) {
                str += (+index + 1) + '; ';
            }
        });
        if (str) {
            resultsObj.error = true;
            resultsObj.errorMsg = ('You didn`t answer the question: ' + str);
            return true;
        }
    }

    function showModal(msgObj) {
        createTest('#modal-result', msgObj, '#test-container');
        $('#OK').click(hideModal);
        $('#show-results').click(function() {
            hideModal();
            showResults();
        });
        $('#tryElse').click(startTest);
    }

    function hideModal() {
        $('#shadow').remove();
    }

    function showResults() {
        $('.right').css('background-color', 'blue');
        $('.wrong').css('background-color', 'tomato');
        $('.checkRes').toggle();
        $('.start').toggle();
    }

});
