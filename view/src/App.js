import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <form action="../../test" method="post" className="form">
                    <button type="submit">
                        Backend post Connection signal
                    </button>
                </form>
                <form action="../../weekly" method="post" className="form">
                    <button type="submit">API weekly recommended shows</button>
                </form>
            </header>
        </div>
    );
}

export default App;
