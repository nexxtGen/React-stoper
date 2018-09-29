class Stopwatch {
    constructor(display) {
        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
    }
    //Tworzę metody które wykonają się zaraz po stworzeniu nowej instancji Stopwatch (reset i print).
    reset() { // metoda reset
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }
    //Implementacja metody print. etoda ta ustawia wewnętrzny tekst elementu DOM, który znajduje się pod atrybutem display. 
    //Dzieje się to przy użyciu kolejnej, specjalnej metody format, która będzie zajmowała się przygotowaniem tekstu do wyświetlenia:
    print() {
        this.display.innerText = this.format(this.times);
    }
    //Metoda format zwraca szablon (ang. template), który wykorzystuje obiekt (times) podany do metody. Korzystamy w tym miejscu ze znajomej konstrukcji ${nazwa_zmiennej}, która umożliwia nam przekazanie wyniku kolejnej funkcji (pad0) jako jeden z elementu szablonu.
    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }

    stop() {
        this.running = false;
        clearInterval(this.watch);
    }
    //Metoda ta ma na celu odpowiednie zerowanie wartości milisekund i sekund, jeśli te przekroczą pewną wartość i
    // odpowiednie zwiększanie sekund i minut. Zawiera ona jednak pewną sztuczkę. Ze względu to, że milisekund w sekundzie jest tysiąc,
    // a interwał wykonuje się co 10ms, należało podzielić 1000 przez 10 - stąd warunek this.times.miliseconds >= 100.
    calculate() {
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
}
// Funkcja pad0 ma za zadanie dodać zero do liczb jednocyfrowych. Implementacja tej funkcji:
function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;    
}
//Funkcja pad0 przyjmuje na wejście wartość liczbową, przekształca ją na stringa, a następnie sprawdza
// czy długość tego przekształcenia jest mniejsza od 2 dodając tym samym zero przed tę liczbę.

const stopwatch = new Stopwatch(document.querySelector('.stopwatch'));

//Rejestracja metod które będą się wykonywały po kliknięciu na odpowiednie przyciski.

let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());