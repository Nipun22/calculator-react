import "./App.css";
import { Fragment } from "react";
import { useState } from "react";

export default function Calculator() {
  const [expression, setExpression] = useState("");

  function onButtonPress(text) {
    switch (text) {
      case "Del":
        if (expression.length > 0)
          setExpression(expression.slice(0, expression.length - 1));
        break;
      case "C":
        setExpression("");
        break;
      case "=":
        setExpression(solveExpression(expression));
        break;
      default:
        setExpression(expression + text);
        break;
    }
  }

  const buttonArrangement = [
    ["C", "7", "4", "1", "Del"],
    ["/", "8", "5", "2", "0"],
    ["*", "9", "6", "3", "."],
    ["(", ")", "-", "+", "="],
  ];

  const numberPad = buttonArrangement.map((column, index) => (
    <div key={index}>
      {column.map((text) => (
        <Fragment key={text}>
          <Button text={text} onClick={onButtonPress} />
          <br />
        </Fragment>
      ))}
    </div>
  ));

  return (
    <>
      <textarea readOnly rows="1" value={expression} />
      <textarea readOnly rows="1" value={solveExpression(expression)} />
      <div className="NumberPad">{numberPad}</div>
    </>
  );
}

function Button({ text, onClick }) {
  return <button onClick={() => onClick(text)}>{text}</button>;
}

function solveExpression(expression) {
  if (expression === "") return "";
  try {
    return eval(expression);
  } catch {
    return "";
  }
}
