import React from 'react';
import './App.css';
import {CleanButton, DialButton} from "./DialButton";

const Display = props => {
  return <div className="App-Display">{props.content}</div>
};

function App() {
  const [number1, setNumber1] = React.useState('');         //numero da esquerda do operador
  const [number2, setNumber2] = React.useState('');         //numero da direita do operador
  const [operation, setOperation] = React.useState('');     //operador
  const [result, setResult] = React.useState('');
  const addNumber = n => {
      if (operation) {
          setNumber2(number2 + '' + n);
      } else {
          setNumber1(number1 + '' + n);
      }
  }
  const cleanNumber = () => {
      if (number2) {
          setNumber2('');
      } else {
          if(operation) {
              setOperation('');
          } else {
              if (number1) {
                  setNumber1('');
              }
            }
        }
  };

  const solve=() => {
      setResult(eval(number1 + operation + number2));
    };

  return (
      <div className="Fondo">
        <div className="App">
          <CleanButton onClick={cleanNumber} />
          <Display content={number1 + operation + number2} />
          <Display content={result} />

          <DialButton value={7} onClick={addNumber} />
          <DialButton value={8} onClick={addNumber} />
          <DialButton value={9} onClick={addNumber} />
          <DialButton value="+" onClick={setOperation} />

          <DialButton value={4} onClick={addNumber} />
          <DialButton value={5} onClick={addNumber} />
          <DialButton value={6} onClick={addNumber} />
          <DialButton value="-" onClick={setOperation} />

          <DialButton value={1} onClick={addNumber} />
          <DialButton value={2} onClick={addNumber} />
          <DialButton value={3} onClick={addNumber} />
          <DialButton value="*" onClick={setOperation} />

          <DialButton value={0} onClick={addNumber} />
          <DialButton value="." onClick={addNumber} />
          <button onClick={solve}>=</button>
          <DialButton value="/" onClick={setOperation} />
        </div>
      </div>
  );
}

export default App;
