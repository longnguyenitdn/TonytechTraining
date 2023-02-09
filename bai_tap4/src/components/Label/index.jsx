import React from "react";
import { BsFillTagsFill } from "react-icons/bs";
import { LabelContext } from "../../Contexts/LabelProvider";

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
                provider.state.activeId === String(label.id) ? "active" : ""
              }`}
              onClick={(e) => {
                provider.handleActiveSidebarMenu(e);
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
