import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: null,
      colorGuessed: null,
      colors: []
    };
  }

  // Todo list:
  // Split up components. One component to display
  // the choices available to the user.
  // Another to display the result.

  startGame() {
    const x = [
      "#000000",
      "#000000",
      "#000000",
      "#000000",
      "#000000",
      "#000000"
    ];

    for (var i = 0; i < x.length; i++) {
      x[i] = x[i].replace(/0/g, function() {
        return (~~(Math.random() * 16)).toString(16);
      });
    }

    this.setState({ colors: x });

    this.setState({ colorGuessed: null });
    const randomAnswer = x[Math.floor(Math.random() * x.length)];
    this.setState({ answer: randomAnswer });
  }

  renderChoices() {
    return this.state.colors.map((color, index) => (
      <button
        disabled={this.state.colorGuessed === this.state.answer}
        onClick={() => this.guessColor(color)}
        style={{ backgroundColor: color }}
        key={color}
        className={"colorSelector"}
      />
    ));
  }

  guessColor(color) {
    const isCorrect = color === this.state.answer;
    const colorIndex = this.state.colors.indexOf(color);

    this.setState(prev => {
      return {
        colorGuessed: color,
        colors: isCorrect
          ? prev.colors.slice(colorIndex, colorIndex + 1)
          : prev.colors.filter((c, i) => {
              if (colorIndex === i) return false;
              return true;
            })
      };
    });
  }

  calcResult() {
    if (this.state.answer === "") {
      return "";
    } else if (this.state.colorGuessed === this.state.answer) {
      return "Good job, you got it!";
    } else {
      return "Nice try, but that was " + this.state.colorGuessed;
    }
  }

  render() {
    return (
      <div itemID="content">
        <h3>Guess the color</h3>
        <button onClick={() => this.startGame()}>Start a New Game</button>
        <h1>{this.state.answer === null ? "" : this.state.answer}</h1>
        <div>{this.state.answer === null ? "" : this.renderChoices()}</div>
        <h3>{this.state.colorGuessed !== null && this.calcResult()}</h3>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Content Choices />, rootElement);
