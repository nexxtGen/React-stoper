
// ---------- 10-01-2018--- Przećwiczyc na innych przykładach w ES6!!!!!!!!!!---------
//Zamienić wstawianie listy "na sztywno" w tablicę i z niej wyciągać dane!
// Zapamietać syntax ES6!!!!
// Destrukturyzacja w ES6!
// Jak się będzie czas to rozbić na osobne komponenty npm Stopwatch, time, list
function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}
class Stopwatch extends React.Component {

    constructor(props) { // Konstruktor pełni TERAZ rolę componentWillMount.
        super(props);
        this.state = { // Zapamietać syntax
            running: false, // Pamietać o przecinkach
            resultList: [], //Dodaję tablicę w której będę przechowywał zapisane wyniki
            times : {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            } // za tym już nic nie dodaje do state, dlatego brak przecinka. 
        }
    }   
    
    //Metoda do resetu stanu komponentu. ------!!!!!! Przećwiczyć i dokładnie zapamiętać składnię ES6. Odzwyczaić się od poprzedniej!!!!--------
    resetTimer(){
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
			id: this.state.resultList.length, //Na podstawie ilosci ele w tablicy ustawiam id
			itemInArr: this.format()
		};
        this.setState({ resultList: [...this.state.resultList, newItem]}); // Nowy sposób na dodanie obiektu do istniejacej tablicy        
    }
    clearList(){
        //wywołanie metody ustawi tablicę jako pustą.
        this.setState({ resultList: [] }); //Odzwyczaić się od starej składni i pisać tam gdzie to zalecane - jednolinijkowo !!!
    }

    //metoda do odp formatowania czasu, zwraca szablon.
    format() {
        // Teraz wartości i klucze są przechowywane w state!
        //Destrukturyzacja tablicy z this.state.times
        let {minutes, seconds, miliseconds} = this.state.times; //w wyniku destruction uzyskam bezposredni dostęp do wartosci 
        //  zamiast pisać "let minutes = this.state.times.minutes;"  Skraca kod.
        return `${pad0(minutes)}:${pad0(seconds)}:${pad0(Math.floor(miliseconds))}`; //template literals -> 00:00:00 . Pamiętac o return
    }    
    // Uruchomienie timera
    start() {
        if (!this.state.running) { // Jeśli nie jest włączony to:
            this.setState({ running: true })
            this.watch = setInterval(() => this.step(), 10) //setInterval to wbudowana metoda
        }
    }
    
    step() {
        if (!this.state.running) return;
        this.calculate();
    }

    stop() {
        this.setState({running: false});
        clearInterval(this.watch);
    } 
    
    calculate(){
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

        const arrayItems = this.state.resultList.map(element  => { 
            return <li key={element.id}>{element.itemInArr}</li> 
        });

        return (
            <div className="container">
                <div className="stopwatch-container">
                    <h2 className="title">Stopwatch</h2>
                    <div className="buttons-stopwatch">
                        <nav className="controls">
                            <a href="#" className="button" onClick={() => this.start()}>Start</a>
                            <a href="#" className="button" onClick={() => this.stop()}>Stop</a>
                            <a href="#" className="button" onClick={() => this.addItem()}>Save</a>
                            <a href="#" className="button" onClick={() => this.resetTimer()}>Reset</a>
                        </nav>
                    </div>
                    <div className="stopwatch">{this.format()}</div>
                </div>        
                <div className="list-container">
                    <h3>Timer list</h3>
                    <a href="#" className="button" onClick={() => this.clearList()}>Reset List</a>
                    <div className="item-container">
                        <ol className="results" id="timerList">{arrayItems}</ol>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Stopwatch />, document.getElementById('app'));