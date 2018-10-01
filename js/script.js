
// ---------- 10-01-2018--- Przećwiczyc na innych przykładach w ES6!!!!!!!!!!---------
//Zamienić wstawianie listy "na sztywno" w tablicę i z niej wyciągać dane!
// Zapamietać syntax ES6!!!!
// Destrukturyzacja w ES6!
// Jak się będzie czas to rozbić na osobne komponenty npm Stopwatch, time, list
//Kupić mechaniczną klawiaturę!

class Stopwatch extends React.Component.Component {

    constructor(props) { // Konstruktor pełni TERAZ rolę componentWillMount.
        super(props);
        this.state = { // Zapamietać syntax
            running: false, // Pamietać o przecinkach
            resultList: [], //Dodaję tablicę w której będę przechowywał zapisane wyniki
            times : {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            } // za tym już nic nie dodaje do state, dlatego brak przecinka. Tak samo jak w JSONie
        }
    } 
    
    pad0(value) {
        let result = value.toString();
        if (result.length < 2) {
            result = '0' + result;
        }
        return result;
    };

    //Metoda do resetu stanu komponentu. ------!!!!!! Przećwiczyć i dokładnie zapamiętać składnię ES6. Odzwyczaić się od poprzedniej!!!!--------
    resetTimer() {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            } // Mogę jeszcze ustawić running: false by reset zatrzymywał stoper.
        })
    } 
    // Reset listy czasów
    addItem(){
        let newItem = { //Tworzę nowy obiekt który dodam do tablicy z wynikami
			id: this.state.resultList.length, 
			record: this.format()
		};
        this.setState({ resultList: [...this.state.resultList, newItem]});        
    }
    clearList() {
        //wywołanie metody ustawi tablicę jako pustą.
        this.setState({ resultList: [] }); //Odzwyczaić się od starej składni i pisać tam gdzie to zalecane - jednolinijkowo !!!
    }
    //metoda do odp formatowania czasu
    format() {
        // Teraz wartości i klucze są przechowywane w state!
        //Destrukturyzacja tablicy z this.state.times
        let {minutes, seconds, miliseconds} = this.state.times; //w wyniku destruction uzyskam bezposredni dostęp do wartosci 
        //  zamiast pisać "let minutes = this.state.times.minutes;"  Skraca kod.
        return `${pad0(minutes)}:${pad0(seconds)}:${pad0(Match.floor(miliseconds))}`; //template literals -> 00:00:00 . Pamiętac o return
    }    

    start() {
        if (!this.state.running) { // Jeśli nie jest włączony to:
            this.setState({ //ustaw state na
                running: true,
                watch: setInterval(() => this.step(), 10) //Dodaje nowy state
            })
        }
    }
    step() {
        if (!this.state.running) return;
        this.calculate();
    }

    stop() {
        this.setState({running: false});
        clearInterval(this.state.watch);
    } 

    calculate() {
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
    
    render() {

        return (
            <div className="container">
                <div class="stopwatch-container">
                    <h2 className="title">Stopwatch</h2>
                    <div className="buttons-stopwatch">
                        <nav className="controls">
                            <a href="#" class="button" onCLick={() => this.start()}>Start</a>
                            <a href="#" class="button" onCLick={() => this.stop()}>Stop</a>
                            <a href="#" class="button" onCLick={() => this.addItem()}>Save</a>
                            <a href="#" class="button" onCLick={() => this.resetTimer()}>Reset</a>
                        </nav>
                    </div>
                    <div className="stopwatch"></div>
                </div>        
                <div className="list-container">
                    <h3>Timer list</h3>
                    <a href="#" className="button" onCLick={() => this.clearList()}>Reset List</a>
                    <div class="item-container">
                        <ol class="results" id="timerList" ></ol>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Stopwatch />, document.getElementById('app'));