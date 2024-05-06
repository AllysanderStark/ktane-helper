import KtaneModule from "./KtaneModule";
import React from "react";
import "../css/SimonSaysModule.css";

export default class SimonSaysModule extends KtaneModule {
  static getTitle() {
    return "Саймон Каже (ромб на пам'ять)";
  }

  constructor(props) {
    super(props);

    this.arrowsWithoutVowel = [
      ["RB", "BY", "YR"],
      ["GY", "YG"],
      ["RY", "BG", "GB", "YR"],
    ];
    this.arrowsWithVowel = [
      ["RB", "BR", "GY", "YG"],
      ["RY", "BG", "GB", "YR"],
      ["RG", "BR", "GY", "YB"],
    ];

    this.allColours = ["red", "green", "yellow", "blue"];

    this.setStrikes = this.setStrikes.bind(this);
    this.toggleVowel = this.toggleVowel.bind(this);
    this.addColour = this.addColour.bind(this);
    this.deleteColours = this.deleteColours.bind(this);
  }

  computeArrowsShown(state) {
    return (state.hasVowel ? this.arrowsWithVowel : this.arrowsWithoutVowel)[this.state.strikes];
  }

  getCounterpart(colour) {
    // Table header order - Red, blue, green, yellow
    var index = 0;
    switch (colour) {
      case "red": 
        index = 0;
        break;
      case "blue": 
        index = 1;
        break;
      case "green": 
        index = 2;
        break;
      case "yellow": 
        index = 3;
        break;
      default: break;
    }
    let withVowel = [
      ["blue", "red", "yellow", "green"],
      ["yellow", "green", "blue", "red"],
      ["green", "red", "yellow", "blue"]
    ];
    let withoutVowel = [
      ["blue", "yellow", "green", "red"],
      ["red", "blue", "yellow", "green"],
      ["yellow", "green", "blue", "red"]
    ];
    return (this.state.hasVowel ? withVowel : withoutVowel)[this.state.strikes][index];
  }

  getInitialState() {
    return {
      hasVowel: false,
      strikes: 0,
      colours: []
    };
  }

  mainRender() {
    return (
      <>
        <div id="simonInputs">
          <label>
            <input type="checkbox" onChange={this.toggleVowel} /> Чи є голосна у серійнику?
          </label>

          <ul>
            <li key="0">
              <label>
                <input type="radio" checked={this.state.strikes === 0} onChange={this.setStrikes} value="0" />
                0 помилок
              </label>
            </li>
            <li key="1">
              <label>
                <input type="radio" checked={this.state.strikes === 1} onChange={this.setStrikes} value="1" />
                1 помилка
              </label>
            </li>
            <li key="2">
              <label>
                <input type="radio" checked={this.state.strikes === 2} onChange={this.setStrikes} value="2" />
                2 помилки
              </label>
            </li>
          </ul>
        </div>

        <div id="simonBoard">
          <div className="simonRow">
            <div className="simonBlue">&nbsp;</div>
            <div className="simonYellow">&nbsp;</div>
          </div>
          <div className="simonRow">
            <div className="simonRed">&nbsp;</div>
            <div className="simonGreen">&nbsp;</div>
          </div>
          {
            this.computeArrowsShown(this.state).map(arrow => (
              <div className="arrow" id={`arrow${arrow}`} key={arrow} />
            ))
          }
        </div>

        <div>
        <ul className="colourOptions">
          {
            this.allColours.map(colour => (
              <li className="colourOptions__item" key={`option_${colour}`}>
                <button
                  aria-label={colour}
                  className={`button ${colour}`}
                  data-colour={colour}
                  onClick={this.addColour}
                />
              </li>
            ))
          }
        </ul>

        <ol className="coloursList">
          {
            this.state.colours.map((colour, index) => (
              <li>
                <button
                  aria-label={colour}
                  className={`button ${colour}`}
                  data-index={index}
                  onClick={this.deleteColours}
                />
                 → 
                <button
                  aria-label={this.getCounterpart(colour)}
                  className={`button ${this.getCounterpart(colour)}`}
                  onClick={this.deleteColours}
                />
              </li>
            ))
          }
        </ol>
        </div>
      </>
    )
  }

  setStrikes(event) {
    this.setState({strikes: parseInt(event.currentTarget.value, 10)})
  }

  toggleVowel(event) {
    this.setState(state => ({hasVowel: !state.hasVowel}));
  }

  addColour(event) {
    const colour = event.target.dataset.colour;

    this.setState(state => ({colours: state.colours.concat(colour)}));
  }

  deleteColours(event) {
    this.setState({colours: []});
  }
}
