import React from "react";
import ButtonModuleTextInput from "./ButtonModuleTextInput";

export default class ButtonModuleColourInput extends ButtonModuleTextInput {
  getLabelContent() {
    let colorName = this.getColorName(this.props.value)
    return (
      <span className={`button ${this.props.value}`}>
        {colorName.charAt(0).toUpperCase() + colorName.slice(1)}
      </span>
    )
  }

  getColorName(color) {
    switch (color) {
      case "blue":
        return "синій";
      case "red":
        return "червоний";
      case "white":
        return "білий";
      case "black":
        return "чорний";
      case "yellow":
        return "жовтий";
      case "green":
        return "зелений";
      default: 
        break;
    }
  }
}
