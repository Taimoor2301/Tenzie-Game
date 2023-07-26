import { useEffect, useState } from "react";
import Die from "./components/die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  let [dice, setDice] = useState(rollDice());
  let [tenzies, setTenzies] = useState(false);
  let [steps, setSteps] = useState(0);
  let [highScore, setHighScore] = useState(
    localStorage.getItem("highScore") || Infinity
  );

  // --------------------------- win lose check method 1-------------------
  // useEffect(() => {
  //   let holdCheck = dice.filter((obj) => obj.isHeld === false);
  //   if (holdCheck.length === 0) {
  //     let init = dice[0].value;
  //     let valueCheck = dice.filter((obj) => obj.value !== init);
  //     if (valueCheck.length === 0) {
  //       console.log("you won");
  //     } else if (valueCheck.length > 0) {
  //       console.log("you lost");
  //     }
  //   }
  // }, [dice]);
  // ------------------------------ win lose check method 2--------------------

  useEffect(() => {
    const reference = dice[0].value;
    const isAllHeld = dice.every((item) => item.isHeld === true);
    const allSameValue = dice.every((item) => item.value === reference);

    if (isAllHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  // ------------------------------ win lose check End--------------------
  function rollDice() {
    let nums = [];
    for (let i = 0; i < 10; i++) {
      nums.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return nums;
  }

  function rollDiceAgain() {
    if (tenzies) {
      setDice(rollDice);
      setTenzies(false);
      if (steps < highScore) {
        setHighScore(steps);
      }
      setSteps(0);
    } else {
      let changed = dice.map((item) => {
        return item.isHeld
          ? item
          : { ...item, value: Math.ceil(Math.random() * 6) };
      });
      setDice(changed);
      setSteps((prev) => prev + 1);
    }
  }

  useEffect(() => {
    localStorage.setItem("highScore", highScore);
  }, [highScore]);

  function handleHeld(id) {
    let changed = dice.map((item) => {
      return item.id === id ? { ...item, isHeld: !item.isHeld } : item;
    });
    setDice(changed);
  }

  // ------------------------------------------------------- custom features

  // ------------------------------------------------------- custom features end

  return (
    <main>
      {tenzies && (
        <Confetti
          width={window.innerWidth - 50}
          height={window.innerHeight - 50}
        />
      )}
      <div className="score-container">
        <span>Steps : {steps}</span>
        <span>High Score : {highScore}</span>
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="die-container">
        {dice.map((obj) => {
          return (
            <Die
              key={obj.id}
              value={obj.value}
              isheld={obj.isHeld}
              id={obj.id}
              handleHeld={handleHeld}
            />
          );
        })}
      </div>
      <button className="roll-dice" onClick={rollDiceAgain}>
        {tenzies ? "Start New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
