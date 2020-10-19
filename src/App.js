import React from "react";
import useToast from "./useToast";

const variants = `primary success danger warning info dark`.split(" ");

const words = `people history way art world information two family government
 health system computer meat year thanks music person reading method data food
 understanding theory law bird literature problem software control knowledge
 power ability economics love internet television monitor dogs`.split(" ");

const randomWord = () => words[Math.floor(Math.random() * words.length)];
const randomVariant = () =>
  variants[Math.floor(Math.random() * variants.length)];

function App() {
  const { addToast } = useToast();

  const handleClick = (diretion) => () => {
    addToast({ title: randomWord(), variant: randomVariant() }, diretion, 5000);
  };

  return (
    <div className="app">
      <div style={{ marginTop: "44vh" }}>
        <button onClick={handleClick("top")}>Top</button>
        <button onClick={handleClick("top-left")}>Top-Left</button>
        <button onClick={handleClick("top-right")}>Top-Right</button>
        <button onClick={handleClick("bottom")}>Bottom</button>
        <button onClick={handleClick("bottom-left")}>Bottom-Left</button>
        <button onClick={handleClick("bottom-right")}>Bottom-Right</button>
      </div>
    </div>
  );
}

export default App;
