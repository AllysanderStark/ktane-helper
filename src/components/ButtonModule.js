import ButtonModuleColourInput from "./ButtonModuleColourInput";
import ButtonModuleTextInput from "./ButtonModuleTextInput";
import KtaneModule from "./KtaneModule";
import React from "react";
import "../css/ButtonModule.css";

export default class ButtonModule extends KtaneModule {
  static getTitle() {
    return "Кнопка";
  }

  constructor(props) {
    super(props);

    this.colourBlue = "blue";
    this.colourWhite = "white";
    this.colourYellow = "yellow";
    this.colourRed = "red";
    this.allColours = [this.colourBlue, this.colourWhite, this.colourYellow, this.colourRed];

    this.textAbort = "Перервати";
    this.textDetonate = "Підірвати";
    this.textHold = "Тримати";
    this.textPress = "Натиснути";
    this.allText = [this.textAbort, this.textDetonate, this.textHold, this.textPress];

    this.setColour = this.setColour.bind(this);
    this.setText = this.setText.bind(this);
  }

  getInstruction() {
    if (this.state.text === this.textDetonate) {
      return <>Якщо 2+ 🔋, швидко натиснути.<br />Інакше, затиснути.</>;
    } else if (this.state.colour === this.colourWhite) {
      return <>
        Якщо <span className="litIndicator" title="Lit indicator">CAR</span>, затиснути.<br />
        В іншому разі, якщо 3+ 🔋 та <span className="litIndicator" title="Lit indicator">FRK</span>, швидко натиснути.<br />
        В іншому разі, затиснути.
      </>;
    } else if ((this.state.colour === this.colourBlue && this.state.text === this.textAbort) || this.state.colour === this.colourYellow) {
      return "Затиснути.";
    } else if (this.state.colour === this.colourRed && this.state.text === this.textHold) {
      return "Натиснути і відпустити.";
    } else {
      return <>
        Якщо 3+ 🔋 та <span className="litIndicator" title="Lit indicator">FRK</span>, швидко натиснути.
        <br />В іншому разі, затиснути.
      </>;
    }
  }

  mainRender() {
    return (
      <>
        <div className="bigButton" style={{backgroundColor: this.state.colour}}>
          <span style={{color: [this.colourWhite, this.colourYellow].includes(this.state.colour) ? "black" : "white"}}>
            {this.state.text}
          </span>
        </div>

        <div>
          Колір:
          {
            this.allColours.map(colour => (
              <ButtonModuleColourInput
                key={colour}
                onChange={this.setColour}
                stateValue={this.state.colour}
                value={colour}
              />
            ))
          }
        </div>

        <div>
          Текст:
          {
            this.allText.map(text => (
              <ButtonModuleTextInput
                key={text}
                onChange={this.setText}
                stateValue={this.state.text}
                value={text}
              />
            ))
          }
        </div>

        <div className="instruction">{this.getInstruction()}</div>

        <div>
          Якщо кнопка затиснута, відпустити, коли на таймері є цифра, що відповідає кольору смужки:
          <ul>
            <li><span className="button blue">Синя</span>: &nbsp; 4</li>
            <li><span className="button yellow">Жовта</span>: 5</li>
            <li><span className="button">Інше</span>: &nbsp;1</li>
          </ul>
        </div>
      </>
    )
  }

  getInitialState() {
    // @TODO Put string literals into constants
    return {
      colour: this.colourBlue,
      text: this.textAbort
    };
  }

  setColour(event) {
    this.setState({colour: event.target.value});
  }

  setText(event) {
    this.setState({text: event.target.value});
  }
}
