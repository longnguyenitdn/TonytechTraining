import React from "react";
import { BsFillTagsFill } from "react-icons/bs";
import { LabelContext } from "../../contexts/LabelProvider";

class Label extends React.Component {
  render() {
    const label = this.props.item;

    return (
      <LabelContext.Consumer>
        {(provider) => {
          return (
            <div
              id={label.id}
              className={`flex-row sidebar-row sidebar-row-top align-center cursor active-menu ${
                provider.activeId === String(label.id) ? "active" : ""
              }`}
              onClick={(e) => {
                provider.setactiveId(e.target.id);
              }}
            >
              <button className=" button-icon sidebar-btn cursor avoid-clicks">
                <BsFillTagsFill />
              </button>
              <p className="sidebar-text hiden avoid-clicks">{label.name}</p>
            </div>
          );
        }}
      </LabelContext.Consumer>
    );
  }
}
export default Label;
