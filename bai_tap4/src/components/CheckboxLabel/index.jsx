import React from "react";
class CheckboxLabel extends React.Component {
  render() {
    const label = this.props.item;
    return (
      <option id={label.id} value={label.id}>
        {label.name}
      </option>
    );
  }
}
export default CheckboxLabel;
