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
  const [history, setHistory] = React.useState([]);

  const addOperation = op => {
      setResult('');
      setOperation(op);
  };
  const addNumber = n => {
      setResult('');
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
  const canSolve = number1 !== '' && number2 !== '' && operation !== '';

  const solve=() => {
      if (canSolve) {
          const thisResult = eval(number1 + operation + number2);
          setResult(thisResult);
          setNumber1('');   /* Limpar o primeiro número */
          setNumber2('');   /* Limpar o segundo número */
          setOperation(''); /* Limpar o operador */
          const newHistoryElement = {
              number1: number1,
              operation: operation,
              number2: number2,
              result: thisResult
          };
          setHistory([...history, newHistoryElement]);
      }
  };
  const handlehistoryClick = historyElement => {
      return () => {
          console.log(historyElement);
          setNumber1(historyElement.number1);
          setNumber2(historyElement.number2);
          setOperation(historyElement.operation);
          setResult('');
      };
  };

  return (
      <div className="Container">
          <div className="Fondo">
            <div className="App">
              <CleanButton onClick={cleanNumber} />
              <Display content={result ? result : number1 + operation + number2} />

              <DialButton value={7} onClick={addNumber} />
              <DialButton value={8} onClick={addNumber} />
              <DialButton value={9} onClick={addNumber} />
              <DialButton value="+" onClick={addOperation} />

              <DialButton value={4} onClick={addNumber} />
              <DialButton value={5} onClick={addNumber} />
              <DialButton value={6} onClick={addNumber} />
              <DialButton value="-" onClick={addOperation} />

              <DialButton value={1} onClick={addNumber} />
              <DialButton value={2} onClick={addNumber} />
              <DialButton value={3} onClick={addNumber} />
              <DialButton value="*" onClick={addOperation} />

              <DialButton value={0} onClick={addNumber} />
              <DialButton value="." onClick={addNumber} />
              <button disabled={!canSolve} onClick={solve}>=</button>
              <DialButton value="/" onClick={addOperation} />

            </div>
          </div>
          <div>{history.map(x => <div onClick={handlehistoryClick(x)}>{x.number1 + x.operation + x.number2 + "=" + x.result}</div>)}</div>
      </div>
  );
}

export default App;
