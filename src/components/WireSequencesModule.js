import KtaneModule from "./KtaneModule";
import React from "react";
import "../css/WireSequencesModule.css";

export default class WireSequencesModule extends KtaneModule {
  static getTitle() {
    return "Послідовність дротів";
  }

  constructor(props) {
    super(props);

    this.cutList = {
      red: ['В', 'Б', 'А', 'АВ', 'Б', 'АВ', 'АБВ', 'АБ', 'Б'],
      blue: ['Б', 'АВ', 'Б', 'А', 'Б', 'БВ', 'В', 'АВ', 'А'],
      black: ['АБВ', 'АВ', 'Б', 'АВ', 'Б', 'БВ', 'АБ', 'В', 'В']
    };

    this.addWire = this.addWire.bind(this);
    this.removeWires = this.removeWires.bind(this);
  }

  addWire(event) {
    const colour = event.currentTarget.getAttribute('data-colour');
    const letter = event.currentTarget.getAttribute('data-letter');

    if (this.state.counts[colour] >= this.cutList[colour].length) {
      // You can't have that many wires of that colour in one module
      return;
    }

    this.setState(prevState => {
      const counts = {...prevState.counts};
      const wires = [
        ...prevState.wires,
        {colour, letter, shouldCut: this.cutList[colour][counts[colour]].includes(letter)}
      ];
      counts[colour]++;

      return {counts, wires};
    });
  }

  mainRender() {
    return (
      <>
        <ul id="sequenceOptions">
          {
            ['А', 'Б', 'В'].map(letter => (
              ['red', 'blue', 'black'].map(colour => (
                <li key={`${colour}-${letter}`}>
                  <button className={`button ${colour}`} data-colour={colour} data-letter={letter} onClick={this.addWire}>
                    {letter}
                  </button>
                </li>
              ))
            ))
          }
        </ul>

        <ol id="sequenceInstruction">
          {
            this.state.wires.map((wire, index) => (
              <li key={`wire-${index}`}>
                <button className={`button ${wire.colour}`} data-index={index} onClick={this.removeWires}>
                  {wire.letter}
                </button>
                {wire.shouldCut ? "Ріж" : "Не ріж"}
              </li>
            ))
          }
        </ol>
      </>
    )
  }

  getInitialState() {
    return {
      counts: {
        red: 0,
        blue: 0,
        black: 0
      },
      wires: []
    };
  }

  removeWires(event) {
    const index = parseInt(event.currentTarget.getAttribute('data-index'), 10);

    const wires = this.state.wires.slice(0, index);

    const counts = {...this.getInitialState().counts};
    wires.forEach(wire => counts[wire.colour]++);

    this.setState({counts, wires});
  }

  setInput(event) {
    const lines = event.currentTarget.value.split('\n');
    const regexes = lines.filter(Boolean).map(
      line => {
        const transformedRegex = line.replace(this.codeRegex, this.codeRegexReplacer).replace(/ /g, '');
        try {
          return new RegExp(transformedRegex);
        } catch (error) {
          console.log(`Morse module line "${line}" was transformed to the invalid regex: ${transformedRegex}`);
          return null;
        }
      }
    );

    this.setState({input: event.currentTarget.value, regexes: regexes.filter(Boolean)});
  }
}
