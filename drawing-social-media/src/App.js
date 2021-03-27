import './App.css';

const App = () => {
  return (
    <div className="App">
      <button onClick={sendRequest}> click </button>
    </div>
  );
}

const sendRequest = (e) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'aaaa' })
  };
  fetch('http://localhost:5000/', requestOptions)
    .then(response => response.json())
    .then(data => console.log(data));
}

export default App;
