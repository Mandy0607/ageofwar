import React, { useState } from "react";
import ArmyInput from "./components/ArmyInput";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import './styles/App.css';


function App() {
  const [own, setOwn] = useState([]);
  const [opponent, setOpponent] = useState([]);
  const [result, setResult] = useState(null);
  const notify = (data) => toast.warn(`Not enough platoons from ${data} side`);

  const handleBattle = async () => {
    try {
      console.log('Lengthhh', own.length,opponent.length)
      if(own.length != 5 || opponent.length != 5){
        const side = (own.length == 5 && opponent.length != 5) ? 'Opponent' : ((own.length != 5 && opponent.length == 5) ? "Own" : "Both")
        notify(side)
      }
      else if(own.length == 5 || opponent.length == 5){
      const res = await axios.post("http://localhost:5000/api/battle", { own, opponent });
      setResult(res.data);  
      }
      
    } catch (err) {
      setResult({ message: "Error processing battle." });
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Age of War</h1>
      <ArmyInput label="Your Army" onChange={setOwn} />
      <ArmyInput label="Opponent Army" onChange={setOpponent} />
      <button onClick={handleBattle}>Simulate Battle</button>
      {result && (
        <div style={{ marginTop: 20 }}>
          {result.arrangement ? (
            <div>
              <h3>Winning Arrangement:</h3>
              <ul>
                {result.arrangement.map((unit, i) => (
                  <li key={i}>{unit.class}#{unit.count}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>{result.message}</p>
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
