import KtaneModule from "./KtaneModule";
import React from "react";
import "../css/MorseCodeModule.css";

export default class MorseCodeModule extends KtaneModule {
  static getTitle() {
    return "Азбука Морзе";
  }

  constructor(props) {
    super(props);

    this.freqs = {
      пляшка: '3.505',
      ланка: '3.515',
      ракета: '3.522',
      карта: '3.532',
      ворон: '3.535',
      танок: '3.542',
      пакет: '3.545',
      фляжка: '3.552',
      баран: '3.555',
      плоди: '3.565',
      банка: '3.572',
      ранок: '3.575',
      карма: '3.582',
      плоть: '3.592',
      банан: '3.595',
      скраб: '3.600'
    };

    this.codes = {
      '.-':   'а',
      '-...': 'б',
      '.--': 'в',
      '....': 'г',
      '--.': 'ґ',
      '-..': 'д',
      '.': 'е',
      '..-..': 'є',
      '...-': 'ж',
      '--..': 'з',
      '-.--': 'и',
      '..': 'і',
      '.---.': 'ї',
      '.---': 'й',
      '-.-': 'к',
      '.-..': 'л',
      '--': 'м',
      '-.': 'н',
      '---': 'о',
      '.--.': 'п',
      '.-.': 'р',
      '...': 'с',
      '-': 'т',
      '..-': 'у',
      '..-.': 'ф',
      '----': 'х',
      '-.-.': 'ц',
      '---.': 'ч',
      '--.-': 'ш',
      '--.--': 'щ',
      '-..-': 'ь',
      '..--': 'ю',
      '.-.-': 'я'
    };
    this.codeRegex = new RegExp(
      ` *(?<![.-])(${Object.keys(this.codes).join('|').replace(/\./g, '\\.')})(?![.-]) *`,
      'g'
    );
    this.codeRegexReplacer = (_match, code) => this.codes[code];

    this.setInput = this.setInput.bind(this);
  }

  mainRender() {
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Слово</th>
              <th>Частота</th>
            </tr>
          </thead>
          <tbody>
            {
              Object.entries(this.freqs).map(([word, freq]) => {
                return (
                  <tr className={this.state.regexes.every(regex => regex.test(word)) ? "" : "inactive"} key={word}>
                    <td>{word}</td>
                    <td>{freq}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>

        <div>
          <label>
            <div>Morse code substrings</div>
            <div><textarea id="morseInput" rows="7" cols="40" onChange={this.setInput}></textarea></div>
          </label>
        </div>
      </>
    )
  }

  getInitialState() {
    return {
      input: '',
      regexes: []
    };
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
