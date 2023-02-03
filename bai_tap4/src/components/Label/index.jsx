import React from "react";
import { BsFillTagsFill } from "react-icons/bs";

class Label extends React.Component {
  render() {
    const label = this.props.item;
    return (
      <div
        id={label.id}
        className={`flex-row sidebar-row sidebar-row-top align-center cursor active-menu ${
          this.props.activeId === String(label.id) ? "active" : ""
        }`}
        onClick={(e) => {
          this.props.handleActiveSidebarMenu(e);
        }}
      >
        <button className=" button-icon sidebar-btn cursor avoid-clicks">
          <BsFillTagsFill />
        </button>
        <p className="sidebar-text hiden avoid-clicks">{label.name}</p>
      </div>
    );
  }
}
export default Label;
