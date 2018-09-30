"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stopwatch = function () {
    function Stopwatch(display) {
        _classCallCheck(this, Stopwatch);

        this.running = false;
        this.display = display;
        this.list = document.getElementById("timerList");
        this.reset(); // mEtody kt wykonają sie odrazu przy utw instancji obiektu
        this.print(this.times);
    }

    // metody które wykonują się poprzez odp na działanie uzytkownika.      
    // resetuje stopwatcha


    _createClass(Stopwatch, [{
        key: "resetTimer",
        value: function resetTimer() {
            this.times = {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            };
            this.print();
        }
        //reset listy z zapisanymi czasami

    }, {
        key: "resetList",
        value: function resetList() {
            this.list.innerHTML = '';
        }
        //metoda do umieszczania do tworzenia elementu listy w drzewie DOM

    }, {
        key: "printItem",
        value: function printItem(time) {
            var timerList = document.createElement("li");
            var item = document.createTextNode(time);
            timerList.appendChild(item);
            document.getElementById("timerList").appendChild(timerList);
        }
        // dodaje aktualny czas do listy

    }, {
        key: "addToList",
        value: function addToList() {
            var item = "" + this.format(this.times);
            this.printItem(item);
        }

        //Tworzę metody które wykonają się zaraz po stworzeniu nowej instancji Stopwatch (reset i print).

    }, {
        key: "reset",
        value: function reset() {
            // metoda reset
            this.times = {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            };
        }

        //Implementacja metody print. etoda ta ustawia wewnętrzny tekst elementu DOM, który znajduje się pod atrybutem display. 
        //Dzieje się to przy użyciu kolejnej, specjalnej metody format, która będzie zajmowała się przygotowaniem tekstu do wyświetlenia:

    }, {
        key: "print",
        value: function print() {
            this.display.innerText = this.format(this.times);
        }
        //Metoda format zwraca szablon (ang. template), który wykorzystuje obiekt (times) podany do metody. Korzystamy w tym miejscu ze znajomej konstrukcji ${nazwa_zmiennej}, która umożliwia nam przekazanie wyniku kolejnej funkcji (pad0) jako jeden z elementu szablonu.

    }, {
        key: "format",
        value: function format(times) {
            return pad0(times.minutes) + ":" + pad0(times.seconds) + ":" + pad0(Math.floor(times.miliseconds));
        }
    }, {
        key: "start",
        value: function start() {
            var _this = this;

            if (!this.running) {
                this.running = true;
                this.watch = setInterval(function () {
                    return _this.step();
                }, 10);
            }
        }
    }, {
        key: "step",
        value: function step() {
            if (!this.running) return;
            this.calculate();
            this.print();
        }
    }, {
        key: "stop",
        value: function stop() {
            /*
            let time = this.times;
            let test = this.format(time); 
            console.log("czas:", test);
            this.printItem(test); 
            */

            this.running = false;
            clearInterval(this.watch);
        }
        //Metoda ta ma na celu odpowiednie zerowanie wartości milisekund i sekund, jeśli te przekroczą pewną wartość i
        // odpowiednie zwiększanie sekund i minut. Zawiera ona jednak pewną sztuczkę. Ze względu to, że milisekund w sekundzie jest tysiąc,
        // a interwał wykonuje się co 10ms, należało podzielić 1000 przez 10 - stąd warunek this.times.miliseconds >= 100.

    }, {
        key: "calculate",
        value: function calculate() {
            this.times.miliseconds += 1;
            if (this.times.miliseconds >= 100) {
                this.times.seconds += 1;
                this.times.miliseconds = 0;
            }
            if (this.times.seconds >= 60) {
                this.times.minutes += 1;
                this.times.seconds = 0;
            }
        }
    }]);

    return Stopwatch;
}();
// Funkcja pad0 ma za zadanie dodać zero do liczb jednocyfrowych. Implementacja tej funkcji:


function pad0(value) {
    var result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}
//Funkcja pad0 przyjmuje na wejście wartość liczbową, przekształca ją na stringa, a następnie sprawdza
// czy długość tego przekształcenia jest mniejsza od 2 dodając tym samym zero przed tę liczbę.

var stopwatch = new Stopwatch(document.querySelector('.stopwatch')); // Tworzę instancje kl Stopwatch

//Rejestracja metod które będą się wykonywały po kliknięciu na odpowiednie przyciski.


var startButton = document.getElementById('start');
startButton.addEventListener('click', function () {
    return stopwatch.start();
});

var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', function () {
    return stopwatch.stop();
});

var saveButton = document.getElementById('save');
saveButton.addEventListener('click', function () {
    return stopwatch.addToList();
});

var resetButton = document.getElementById('reset');
resetButton.addEventListener('click', function () {
    return stopwatch.resetTimer();
});

var resetList = document.getElementById('resetList');
resetList.addEventListener('click', function () {
    return stopwatch.resetList();
});
