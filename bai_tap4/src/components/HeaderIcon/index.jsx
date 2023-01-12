import React from "react";
class HeaderIcon extends React.Component {
   render() {
      return (
         <button className="cursor btn-bg margin5 font-sz20">{this.props.children}</button>
      )
   }
}
export default HeaderIcon