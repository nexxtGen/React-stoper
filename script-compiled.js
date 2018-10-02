"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// ---------- 10-01-2018--- Przećwiczyc na innych przykładach w ES6!!!!!!!!!!---------
//Zamienić wstawianie listy "na sztywno" w tablicę i z niej wyciągać dane!
// Zapamietać syntax ES6!!!!
// Destrukturyzacja w ES6!
// Jak się będzie czas to rozbić na osobne komponenty npm Stopwatch, time, list
function pad0(value) {
    var result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    function Stopwatch(props) {
        _classCallCheck(this, Stopwatch);

        var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props)); // Konstruktor pełni TERAZ rolę componentWillMount.


        _this.state = { // Zapamietać syntax
            running: false, // Pamietać o przecinkach
            resultList: [], //Dodaję tablicę w której będę przechowywał zapisane wyniki
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0 // za tym już nic nie dodaje do state, dlatego brak przecinka. 
            } };
        return _this;
    }

    //Metoda do resetu stanu komponentu. ------!!!!!! Przećwiczyć i dokładnie zapamiętać składnię ES6. Odzwyczaić się od poprzedniej!!!!--------


    _createClass(Stopwatch, [{
        key: "resetTimer",
        value: function resetTimer() {
            this.setState({
                times: {
                    minutes: 0,
                    seconds: 0,
                    miliseconds: 0 // Mogę jeszcze ustawić running: false by reset zatrzymywał stoper.
                } });
        }
        // Reset listy czasów

    }, {
        key: "addItem",
        value: function addItem() {
            var newItem = { //Tworzę nowy obiekt który dodam do tablicy z wynikami
                id: this.state.resultList.length, //Na podstawie ilosci ele w tablicy ustawiam id
                itemInArr: this.format()
            };
            this.setState({ resultList: [].concat(_toConsumableArray(this.state.resultList), [newItem]) }); // Nowy sposób na dodanie obiektu do istniejacej tablicy        
        }
    }, {
        key: "clearList",
        value: function clearList() {
            //wywołanie metody ustawi tablicę jako pustą.
            this.setState({ resultList: [] }); //Odzwyczaić się od starej składni i pisać tam gdzie to zalecane - jednolinijkowo !!!
        }

        //metoda do odp formatowania czasu, zwraca szablon.

    }, {
        key: "format",
        value: function format() {
            // Teraz wartości i klucze są przechowywane w state!
            //Destrukturyzacja tablicy z this.state.times
            var _state$times = this.state.times,
                minutes = _state$times.minutes,
                seconds = _state$times.seconds,
                miliseconds = _state$times.miliseconds; //w wyniku destruction uzyskam bezposredni dostęp do wartosci 
            //  zamiast pisać "let minutes = this.state.times.minutes;"  Skraca kod.

            return pad0(minutes) + ":" + pad0(seconds) + ":" + pad0(Math.floor(miliseconds)); //template literals -> 00:00:00 . Pamiętac o return
        }
        // Uruchomienie timera

    }, {
        key: "start",
        value: function start() {
            var _this2 = this;

            if (!this.state.running) {
                // Jeśli nie jest włączony to:
                this.setState({ running: true });
                this.watch = setInterval(function () {
                    return _this2.step();
                }, 10); //setInterval to wbudowana metoda
            }
        }
    }, {
        key: "step",
        value: function step() {
            if (!this.state.running) return;
            this.calculate();
        }
    }, {
        key: "stop",
        value: function stop() {
            this.setState({ running: false });
            clearInterval(this.watch);
        }
    }, {
        key: "calculate",
        value: function calculate() {
            this.setState({
                times: {
                    minutes: this.state.times.minutes,
                    seconds: this.state.times.seconds,
                    miliseconds: this.state.times.miliseconds + 1
                }
            });
            if (this.state.times.miliseconds >= 100) {
                this.setState({
                    times: {
                        minutes: this.state.times.minutes,
                        seconds: this.state.times.seconds + 1,
                        miliseconds: 0
                    }
                });
            };
            if (this.state.seconds >= 60) {
                this.setState({
                    times: {
                        minutes: this.state.times.minutes + 1,
                        seconds: 0,
                        miliseconds: this.state.times.miliseconds
                    }
                });
            };
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var arrayItems = this.state.resultList.map(function (element) {
                return React.createElement(
                    "li",
                    { key: element.id },
                    element.itemInArr
                );
            });

            return React.createElement(
                "div",
                { className: "container" },
                React.createElement(
                    "div",
                    { className: "stopwatch-container" },
                    React.createElement(
                        "h2",
                        { className: "title" },
                        "Stopwatch"
                    ),
                    React.createElement(
                        "div",
                        { className: "buttons-stopwatch" },
                        React.createElement(
                            "nav",
                            { className: "controls" },
                            React.createElement(
                                "a",
                                { href: "#", className: "button", onClick: function onClick() {
                                        return _this3.start();
                                    } },
                                "Start"
                            ),
                            React.createElement(
                                "a",
                                { href: "#", className: "button", onClick: function onClick() {
                                        return _this3.stop();
                                    } },
                                "Stop"
                            ),
                            React.createElement(
                                "a",
                                { href: "#", className: "button", onClick: function onClick() {
                                        return _this3.addItem();
                                    } },
                                "Save"
                            ),
                            React.createElement(
                                "a",
                                { href: "#", className: "button", onClick: function onClick() {
                                        return _this3.resetTimer();
                                    } },
                                "Reset"
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "stopwatch" },
                        this.format()
                    )
                ),
                React.createElement(
                    "div",
                    { className: "list-container" },
                    React.createElement(
                        "h3",
                        null,
                        "Timer list"
                    ),
                    React.createElement(
                        "a",
                        { href: "#", className: "button", onClick: function onClick() {
                                return _this3.clearList();
                            } },
                        "Reset List"
                    ),
                    React.createElement(
                        "div",
                        { className: "item-container" },
                        React.createElement(
                            "ol",
                            { className: "results", id: "timerList" },
                            arrayItems
                        )
                    )
                )
            );
        }
    }]);

    return Stopwatch;
}(React.Component);

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById('app'));
