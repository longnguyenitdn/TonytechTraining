import React from "react";
class LabelInNote extends React.Component {
  render() {
    const item = this.props.item;
    return (
      <div className="handle-label-row flex-row align-center cursor ">
        <input className="checkbox-label cursor" type="checkbox" id={item.id} />
        <label htmlFor={item.id} className="text-black cursor">
          {item.name}
        </label>
      </div>
    );
  }
}
export default LabelInNote;
