import React from "react";
class SidebarIcon extends React.Component{
   render(){
      return(
         <button className="button-icon sidebar-btn cursor avoid-clicks">{this.props.children}</button>
      )
   }
}
export default SidebarIcon