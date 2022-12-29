import logo from './logo.svg';
import './App.css';
import MyComponent from './example/MyComponent';
import Bt3Component from './example/Bt3Component';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Easy React Hello world!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <MyComponent />
        <Bt3Component />

      </header>
    </div>
  );
}

export default App;
