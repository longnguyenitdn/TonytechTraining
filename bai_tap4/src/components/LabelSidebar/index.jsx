import React from "react";
import Label from "../Label";
class LabelSidebar extends React.Component {
  render() {
    return (
      <>
        {this.props.labelList.map((item) => {
          return (
            <Label
              key={item.id}
              item={item}
              activeId={this.props.activeId}
              handleActiveSidebarMenu={this.props.handleActiveSidebarMenu}
            />
          );
        })}
      </>
    );
  }
}
export default LabelSidebar;
